import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "bootstrap/dist/css/bootstrap.min.css"
import "@/styles/globals.scss";
import ThemeProvider from "@/lib/ThemeProvider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ReduxProvider from "@/lib/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ponditi - Promoting Insight & Personal Excellence",
  description: "Ponditi - Promoting Insight & Personal Excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <ThemeProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
