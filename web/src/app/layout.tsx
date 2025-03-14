import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import { getSiteTitle } from "@config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: getSiteTitle(),
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} antialiased no-scrollbar`}>
      {children}
    </html>
  );
}
