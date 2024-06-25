import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CroTrends",
  description: "Insightful Graphs Exclusively For Croatia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="w-svw bg-black font-inter text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
