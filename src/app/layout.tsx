import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import Preloader from "@/components/Preloader";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.brand} — Luxury car rental in ${site.city}`,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-bone antialiased">
        <Preloader />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
