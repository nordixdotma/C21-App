import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Century 21 | Real Estate",
  description: "Find your dream property in Marrakech with our expert real estate services.",
  icons: {
    icon: "/C21 logo rbz.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
