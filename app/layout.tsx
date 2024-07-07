import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CroTrends",
  description: "Insightful Graphs Exclusively For Croatia",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-svw flex-col bg-black font-inter text-white">
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
