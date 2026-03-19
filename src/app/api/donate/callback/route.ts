import { NextResponse } from 'next/server';

// Paynow posts payment status updates here
export async function POST(request: Request) {
  try {
    const body = await request.text();
    console.log('[Paynow callback]', body);
    // In production: parse, verify, and update your DB order status here
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
