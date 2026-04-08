import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mdub — Frontend Engineer",
    template: "%s | Mdub",
  },
  description:
    "Senior frontend engineer specializing in React, TypeScript, and design systems. Building fast, accessible interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <footer
          className="mt-24 border-t py-8 text-center text-sm"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            © {new Date().getFullYear()} Michael Warren (Mdub). Built with Next.js & Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}
