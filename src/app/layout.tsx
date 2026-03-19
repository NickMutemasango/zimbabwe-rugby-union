import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CountdownModal from "@/components/modals/CountdownModal";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zimbabwe Rugby Union | Official Website",
  description: "Official website of the Zimbabwe Rugby Union — Home of the Sables",
  keywords: ["Zimbabwe Rugby", "ZRU", "Sables", "Rugby Union", "Zimbabwe"],
  openGraph: {
    title: "Zimbabwe Rugby Union",
    description: "Official website of the Zimbabwe Rugby Union — Home of the Sables",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={geist.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CountdownModal />
      </body>
    </html>
  );
}
