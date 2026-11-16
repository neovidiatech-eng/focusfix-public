import type { Metadata } from "next";
import type { Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import "./globals.css";
import { CustomCode } from "@/src/components/site/CustomCode";
import { SITE_URL } from "@/src/shared/utils/site";
import { getSiteSettings } from "@/src/shared/utils/settings";
import { SiteSettingsProvider } from "@/src/providers/SiteSettingsProvider";

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Focus Fix | أسرع خدمة صيانة آيفون في مصر - تصليح في المنزل خلال 30 دقيقة",
  description:
    "Focus Fix — أسرع خدمة صيانة آيفون في مصر. بنجيلك مكانك ونصلح شاشتك، بطاريتك، ظهرك، وكاميرتك في أقل من 30 دقيقة بقطع غيار أصلية وضمان سنة كاملة.",
  keywords: [
    "صيانة آيفون",
    "تصليح آيفون",
    "صيانة موبايل",
    "تصليح شاشة آيفون",
    "تغيير بطارية آيفون",
    "iPhone repair Egypt",
    "mobile repair Cairo",
    "Focus Fix",
    "فوكس فيكس",
    "تصليح في المنزل",
  ],
  openGraph: {
    title: "Focus Fix | أسرع خدمة صيانة آيفون في مصر",
    description:
      "بنجيلك مكانك ونصلح آيفونك في 30 دقيقة بقطع غيار أصلية وضمان سنة.",
    url: SITE_URL,
    siteName: "Focus Fix",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/logo1.jpeg",
        width: 1200,
        height: 630,
        alt: "Focus Fix - أسرع صيانة آيفون في مصر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Fix | أسرع خدمة صيانة آيفون في مصر",
    description:
      "بنجيلك مكانك ونصلح آيفونك في 30 دقيقة بقطع غيار أصلية وضمان سنة.",
    images: ["/logo1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/logo1.jpeg",
    apple: "/logo1.jpeg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <html lang="ar" dir="rtl" className={`${body.variable} ${display.variable}`}>
      <head>
        {/* Tracking code from Dashboard → أكواد التتبع (GTM, Meta, TikTok, Google Ads…) */}
        <CustomCode html={settings.code_head} place="head" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Focus Fix",
              alternateName: "فوكس فيكس",
              description:
                "أسرع خدمة صيانة آيفون في مصر - بنجيلك مكانك ونصلح موبايلك في 30 دقيقة",
              url: SITE_URL,
              telephone: settings.phone,
              email: settings.supportEmail,
              image: `${SITE_URL}/logo1.jpeg`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "عمارة 47 شارع الدقي ميدان الدقي",
                addressLocality: "الجيزة",
                addressCountry: "EG",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "30.0444",
                longitude: "31.2357",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: settings.working_hours_start,
                closes: settings.working_hours_end,
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "خدمات صيانة الآيفون",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تصليح شاشة الآيفون",
                      description:
                        "تغيير وإصلاح شاشة الآيفون المكسورة أو المشروخة",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تغيير بطارية الآيفون",
                      description:
                        "تغيير بطارية الآيفون بقطع غيار أصلية مع ضمان",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تصليح ظهر الآيفون",
                      description:
                        "تغيير الظهر المكسور بتقنية الليزر",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تصليح كاميرا الآيفون",
                      description:
                        "إصلاح وتغيير كاميرا الآيفون الخلفية والأمامية",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
              },
            }),
          }}
        />
      </head>
      <body>
        <CustomCode html={settings.code_body_open} place="body" />

        <SiteSettingsProvider settings={settings}>{children}</SiteSettingsProvider>
        <CustomCode html={settings.code_footer} place="body" />
      </body>
    </html>
  );
}
