import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "인터랙티브 바이브 코딩 가이드북",
  description:
    "React 인터랙션 컴포넌트를 미리 보고 설정을 조절하세요. 소스 코드, Props, 설치 방법과 AI 프롬프트를 제공하는 가이드북입니다.",
  keywords: [
    "React 컴포넌트",
    "스마트 포트폴리오",
    "반응형 웹",
    "차별화된 웹",
    "인터랙션 가이드북",
    "웹디자인",
    "웹퍼블리싱",
    "인터랙션",
    "프레이머모션",
    "GSAP",
  ],
  openGraph: {
    title: "인터랙티브 바이브 코딩 가이드북",
    description: "인터랙션 바이브코딩 가이드북입니다.",
    siteName: "바이브 인터랙션 가이드북",
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "인터랙티브 바이브 코딩 가이드북",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "인터랙티브 바이브 코딩 가이드북",
    description: "인터랙션 바이브코딩 가이드북입니다.",
    images: ["/main.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
