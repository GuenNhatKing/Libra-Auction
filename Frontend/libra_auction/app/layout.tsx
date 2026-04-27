import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Libra Auction",
  description: "An Online Auction System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body>{children}</body>
    </html>
  );
}
