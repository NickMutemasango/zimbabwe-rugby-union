import { NextResponse } from 'next/server';

// Paynow SDK — CommonJS module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Paynow = require('paynow');

const INTEGRATION_ID  = process.env.PAYNOW_INTEGRATION_ID  ?? '';
const INTEGRATION_KEY = process.env.PAYNOW_INTEGRATION_KEY ?? '';

// Mobile-money method identifiers accepted by Paynow
const MOBILE_METHODS = ['ecocash', 'onemoney', 'telecash'];

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      amount:  number;
      name:    string;
      email:   string;
      phone?:  string;
      method:  string; // 'ecocash' | 'onemoney' | 'telecash' | 'card'
    };

    const { amount, name, email, phone, method } = body;

    if (!amount || amount <= 0)  return NextResponse.json({ error: 'Invalid amount' },  { status: 400 });
    if (!name || !email)         return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    if (!INTEGRATION_ID || !INTEGRATION_KEY) {
      return NextResponse.json({ error: 'Paynow is not configured. Add PAYNOW_INTEGRATION_ID and PAYNOW_INTEGRATION_KEY to your environment variables.' }, { status: 503 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
    paynow.resultUrl = `${baseUrl}/api/donate/callback`;
    paynow.returnUrl = `${baseUrl}/donate/success`;

    const payment = paynow.createPayment(`ZRU-DONATION-${Date.now()}`, email);
    payment.add(`Donation to Zimbabwe Rugby Union from ${name}`, amount);

    const isMobile = MOBILE_METHODS.includes(method);

    if (isMobile) {
      if (!phone) return NextResponse.json({ error: 'Phone number is required for mobile payments' }, { status: 400 });
      const response = await paynow.sendMobile(payment, phone, method);

      if (!response.success) {
        return NextResponse.json({ error: response.error ?? 'Mobile payment initiation failed' }, { status: 502 });
      }

      return NextResponse.json({
        success:      true,
        type:         'mobile',
        pollUrl:      response.pollUrl,
        instructions: `A payment prompt has been sent to ${phone}. Please approve it on your phone.`,
      });
    } else {
      // Web / card payment
      const response = await paynow.send(payment);

      if (!response.success) {
        return NextResponse.json({ error: response.error ?? 'Payment initiation failed' }, { status: 502 });
      }

      return NextResponse.json({
        success:     true,
        type:        'web',
        redirectUrl: response.redirectUrl,
        pollUrl:     response.pollUrl,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('[API] POST /api/donate error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
