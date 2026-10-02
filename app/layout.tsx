import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/src/providers/I18nProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Script from "next/script";
import { QueryProvider } from "@/src/providers/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://focus-fastestrepair.com"),
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
    url: "https://focus-fastestrepair.com",
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
    canonical: "https://focus-fastestrepair.com",
  },
  icons: {
    icon: "/logo1.jpeg",
    apple: "/logo1.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5VTRPS8J');`}
        </Script>

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
              url: "https://focus-fastestrepair.com",
              telephone: "+201009911934",
              email: "info@focus-fastestrepair.com",
              image: "https://focus-fastestrepair.com/logo1.jpeg",
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
                opens: "09:00",
                closes: "22:00",
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5VTRPS8J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AntdRegistry>
          <QueryProvider>
            <I18nProvider>{children}</I18nProvider>
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
