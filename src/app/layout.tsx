import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import MobileActionBar from "@/components/MobileActionBar";
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

const defaultTitle = `${site.brand} — Luxury car rental in ${site.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: defaultTitle, template: `%s — ${site.brand}` },
  description: site.tagline,
  openGraph: {
    title: defaultTitle,
    description: site.tagline,
    siteName: site.brand,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.tagline },
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#fffdf7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-canvas pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-bone antialiased md:pb-0">
        <Preloader />
        <SiteHeader />
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
