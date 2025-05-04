// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers"; // 👈 ye import add karo

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Short Video App",
  description: "Watch and Earn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* 👈 wrap children inside Providers */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
