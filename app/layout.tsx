import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const siteUrl = "https://newcar.subad.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "새차만들기 | 부산 사상 자동차 광택·세차 전문 - 스팀세차·유리막코팅",
  description:
    "부산 사상구 자동차 광택·세차 전문점. 스팀세차·실내세차·유리막코팅·외부광택. 꼼꼼한 작업으로 새 차처럼! 051-326-9316",
  keywords: [
    "부산세차",
    "사상세차",
    "부산광택",
    "사상광택",
    "스팀세차",
    "실내세차",
    "유리막코팅",
    "자동차광택",
    "부산스팀세차",
    "새차만들기",
    "새차만들기부산",
    "새차만들기사상",
    "부산자동차광택",
    "감전세차",
    "자동차세차",
    "외부광택",
  ],
  authors: [{ name: "새차만들기" }],
  creator: "새차만들기",
  publisher: "새차만들기",
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
  openGraph: {
    title: "새차만들기 | 부산 사상 자동차 광택·세차 전문",
    description:
      "부산 사상구 자동차 광택·세차 전문점. 스팀세차·실내세차·유리막코팅. 꼼꼼한 작업으로 새 차처럼!",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "새차만들기",
  },
  twitter: {
    card: "summary_large_image",
    title: "새차만들기 | 부산 사상 자동차 광택·세차 전문",
    description:
      "부산 사상구 자동차 광택·세차 전문점. 스팀세차·실내세차·유리막코팅.",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    other: {
      "naver-site-verification": "422762e390ad6695dd59fa32d95587f2f433666e",
    },
  },
  category: "business",
  classification: "Car Wash & Detailing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "새차만들기",
    alternateName: "make-new-car",
    description:
      "부산 사상구 자동차 광택·세차 전문점. 스팀세차, 실내세차, 유리막코팅, 외부광택 전문. 꼼꼼한 작업으로 새 차처럼 만들어드립니다.",
    telephone: "051-326-9316",
    address: {
      "@type": "PostalAddress",
      addressLocality: "사상구",
      addressRegion: "부산광역시",
      addressCountry: "KR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "35.1523",
      longitude: "128.9808",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/logo.png`,
    url: siteUrl,
    sameAs: [
      "https://map.naver.com/p/entry/place/2003734983",
      "https://blog.naver.com/make-new-car/",
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "35.1523",
        longitude: "128.9808",
      },
      geoRadius: "30000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "세차·광택 서비스",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "외부 광택" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "스팀세차" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "실내세차" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "유리막코팅" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansKR.variable} antialiased`}>
        {children}

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZTBL18N0CZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZTBL18N0CZ');
          `}
        </Script>
      </body>
    </html>
  );
}
