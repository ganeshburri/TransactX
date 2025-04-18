import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { AppbarClient } from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransactX",
  description: "Your Money, Your Way -TransactX.",
  icons: {
    icon: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <AppbarClient/>
          {children}
        </body>
      </Providers>
    </html>
  );
}
