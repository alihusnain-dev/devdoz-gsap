import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevDoz - Creative Studio",
  description: "DevDoz is a premium digital experience studio pushing the boundaries of design and interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
