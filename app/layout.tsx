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
  title: {
    default: "새차만들기 | 부산 사상구 감전동 자동차 광택·스팀세차·유리막코팅 전문",
    template: "%s | 새차만들기 - 부산 사상 세차 전문",
  },
  description:
    "부산 사상구 감전동 자동차 광택·세차 전문점. 스팀세차 5만원부터, 실내클리닝, 유리막코팅, 프리미엄 외부광택. 엄궁동·하단동·학장동·명지동 근처. 051-326-9316",
  keywords: [
    "부산세차",
    "사상세차",
    "부산광택",
    "사상광택",
    "스팀세차",
    "실내클리닝",
    "유리막코팅",
    "자동차광택",
    "부산스팀세차",
    "새차만들기",
    "새차만들기부산",
    "새차만들기사상",
    "부산자동차광택",
    "감전동세차",
    "감전동광택",
    "엄궁동세차",
    "엄궁동광택",
    "하단동세차",
    "하단동광택",
    "학장동세차",
    "학장동광택",
    "명지동세차",
    "명지동광택",
    "사상구세차",
    "사상구광택",
    "자동차세차",
    "외부광택",
    "부산실내세차",
    "부산유리막코팅",
    "사상구스팀세차",
    "부산자동차코팅",
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
      "부산 사상구 감전동 광택·세차 전문점. 스팀세차·실내클리닝·유리막코팅. 꼼꼼한 작업으로 새 차처럼! 051-326-9316",
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "새차만들기",
  },
  twitter: {
    card: "summary_large_image",
    title: "새차만들기 | 부산 사상 자동차 광택·세차 전문",
    description:
      "부산 사상구 감전동 광택·세차 전문점. 스팀세차·실내클리닝·유리막코팅. 051-326-9316",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ko-KR": siteUrl,
    },
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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#organization`,
    name: "새차만들기",
    alternateName: ["make-new-car", "새차만들기 부산 사상", "새차만들기 감전동"],
    description:
      "부산 사상구 감전동 자동차 광택·세차 전문점. 스팀세차 5만원부터, 실내클리닝, 유리막코팅, 프리미엄 외부광택. 엄궁동·하단동·학장동·명지동 인근.",
    telephone: "+82-51-326-9316",
    address: {
      "@type": "PostalAddress",
      streetAddress: "낙동대로829",
      addressLocality: "사상구 감전동",
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
    currenciesAccepted: "KRW",
    paymentAccepted: "현금, 카드",
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/logo.png`,
    url: siteUrl,
    sameAs: [
      "https://map.naver.com/p/entry/place/2003734983",
      "https://blog.naver.com/make-new-car/",
    ],
    areaServed: [
      { "@type": "City", name: "부산광역시 사상구" },
      { "@type": "City", name: "부산광역시 사하구" },
      { "@type": "City", name: "부산광역시 강서구" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "세차·광택 서비스",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "스팀세차",
            description: "고온 스팀으로 차량 외부·내부 살균 세차. 경차 5만원부터.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "50000",
            priceCurrency: "KRW",
            minPrice: "50000",
            maxPrice: "80000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "실내클리닝",
            description: "시트·매트·천장 전체 클리닝. 경차 5만원부터.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "50000",
            priceCurrency: "KRW",
            minPrice: "50000",
            maxPrice: "80000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "프리미엄 외부광택",
            description: "컴파운드+폴리싱으로 잔기스 제거 및 광택 복원.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "유리막코팅",
            description: "프리미엄 유리막코팅. 발수·광택 장기 유지. 품질보증서 발급.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "새차만들기 스팀세차 가격은 얼마인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "스팀세차는 경차 5만원, 소형 6만원, 중형 7만원, 대형 8만원부터 시작합니다. 차량 상태에 따라 달라질 수 있으니 전화(051-326-9316)로 문의해주세요.",
        },
      },
      {
        "@type": "Question",
        name: "새차만들기는 어디에 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "부산광역시 사상구 낙동대로829(감전동)에 위치해 있습니다. 엄궁동, 하단동, 학장동, 명지동에서도 가까운 거리입니다.",
        },
      },
      {
        "@type": "Question",
        name: "유리막코팅 보증기간은 얼마나 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "유리막코팅 시공 후 품질보증서를 발급해드리며, 보증기간 중 도막의 열화 및 박리 현상이 인정되는 경우 무상 A/S를 제공합니다.",
        },
      },
      {
        "@type": "Question",
        name: "영업시간과 예약 방법은 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "평일 09:00~19:00 영업하며, 전화(051-326-9316)로 예약하시면 대기 없이 편리하게 이용하실 수 있습니다.",
        },
      },
    ],
  };

  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
