"use client";

import styles from "./PaintFillText.module.css";

interface PaintFillTextProps {
  /** 외곽선과 물감 채우기 레이어에 함께 표시할 문자열입니다. */
  text: string;
  duration?: number; // 애니메이션 지속시간 (초)
  delay?: number; // 애니메이션 시작 지연시간 (초)
  textColor?: string; // 채워질 색상
  fontSize?: string; // 텍스트 크기 클래스
  fontWeight?: string; // 텍스트 굵기 클래스
  className?: string; // 추가 CSS 클래스
  trackingTight?: boolean; // 글자 간격 좁게
  leadingNone?: boolean; // 줄 간격 없애기
}

export default function PaintFillText({
  text,
  duration = 1.5,
  delay = 0.5,
  textColor = "rgba(255, 255, 255, 1)",
  fontSize = "text-6xl",
  fontWeight = "font-bold",
  className = "",
  trackingTight = true,
  leadingNone = true,
}: PaintFillTextProps) {
  const textClasses = [
    fontSize,
    fontWeight,
    trackingTight && "tracking-tight",
    leadingNone && "leading-none",
    "overflow-hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`relative ${textClasses}`}>
      {/* 외곽선 텍스트 (투명하게 처리) */}
      <div
        className={`relative ${styles.strokeOutline}`}
        style={
          {
            WebkitTextStroke: "3px transparent",
            WebkitTextFillColor: "transparent",
          } as React.CSSProperties
        }
      >
        {text}
      </div>

      {/* 물감 채우기 효과 텍스트 */}
      <div
        className={`absolute inset-0 ${styles.paintFill}`}
        style={
          {
            "--paint-duration": `${duration}s`,
            "--paint-delay": `${delay}s`,
            "--paint-color": textColor,
          } as React.CSSProperties
        }
      >
        {text}
      </div>
    </div>
  );
}
