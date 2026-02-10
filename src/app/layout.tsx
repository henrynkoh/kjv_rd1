import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KJV Rightly Dividing — Jesus & Paul's Grace",
  description:
    "Study the KJV with clear division: Moses' law vs Paul's grace gospel, Jesus's life-giving teaching, and traditions of men vs truth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
