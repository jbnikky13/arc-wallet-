import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARC Wallet",
  description: "Web3 Wallet for Arc / Circle Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#060810] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}