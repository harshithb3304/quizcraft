"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeSwitch from "./(components)/Theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>QuizCraft</title>
      <body className={inter.className}>
        <Providers>
          <div>
            <div className="p-4">
              <ThemeSwitch />
            </div>
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
