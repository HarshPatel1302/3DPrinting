import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CONTACT, SITE, getSiteUrl } from "@/lib/constants";
import { getLocalBusinessJsonLd } from "@/lib/business-json-ld";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE.title,
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: CONTACT.businessName }],
  creator: CONTACT.businessName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: CONTACT.businessName,
    title: SITE.title,
    description: SITE.description,
    // REPLACE: add /opengraph-image.png to public when you have branded art
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="focus-ring absolute left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-filament-cyan px-4 py-2 text-sm font-semibold text-carbon opacity-0 transition focus:translate-y-0 focus:opacity-100"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <div className="flex flex-1 flex-col pt-20 md:pt-24">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
