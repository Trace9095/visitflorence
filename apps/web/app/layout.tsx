import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Visit Florence, CO — Antique Capital of Colorado",
    template: "%s | Visit Florence, CO",
  },
  description:
    "Discover Florence, Colorado — the Antique Capital of Colorado. Explore 100+ antique shops, craft breweries, local dining, and outdoor adventures just minutes from the Royal Gorge.",
  metadataBase: new URL("https://visitflorence.co"),
  openGraph: {
    siteName: "Visit Florence, CO",
    locale: "en_US",
    type: "website",
    url: "https://visitflorence.co",
    title: "Visit Florence, CO — Antique Capital of Colorado",
    description: "Discover Florence, Colorado — the Antique Capital of Colorado. Explore 100+ antique shops, craft breweries, local dining, and outdoor adventures just minutes from the Royal Gorge.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Visit Florence, CO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Florence, CO — Antique Capital of Colorado",
    description: "Discover Florence, Colorado — 100+ antique shops, craft breweries, local dining, minutes from the Royal Gorge.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://visitflorence.co",
              "name": "Visit Florence",
              "description": "Explore Florence, Colorado — the Antique Capital of Colorado with unique shops, dining, and history."
            })
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
// GA4 + GSC v3 - 2026-03-24
