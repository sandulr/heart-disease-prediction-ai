import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: "/heart.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Heart Disease Risk Predictor</title>

<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
  rel="stylesheet"
  precedence="default"
/>

<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" precedence="default"></link>

<link href="https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" precedence="default"></link>

<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" precedence="default" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
