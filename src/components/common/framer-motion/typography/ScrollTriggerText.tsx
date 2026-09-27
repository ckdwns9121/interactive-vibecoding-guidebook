"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

interface ScrollTriggerTextProps {
  /** 글자의 활성 스크롤 구간 밖에서 사용하는 CSS 색상입니다. */
  fromColor?: string;
  /** 각 글자의 활성 스크롤 구간에서 사용하는 CSS 색상입니다. */
  toColor?: string;
  /** 글자 색상이 바뀌는 CSS 전환 시간(초)입니다. */
  duration?: number;
  /** 스크롤 진행도에 따라 글자별로 표시할 문자열입니다. */
  text?: string;
  /** 텍스트의 CSS 글꼴 크기입니다. 단위를 포함한 문자열을 전달하세요. */
  fontSize?: string;
  /** 타입에 선언되어 있지만 현재 구현에서 사용하지 않습니다. */
  initialX?: number;
  /** 타입에 선언되어 있지만 현재 구현에서 사용하지 않습니다. */
  finalX?: number;
  /** 각 글자의 등장 시작 배율입니다. 진행도에 따라 1까지 커집니다. */
  initialScale?: number;
  /** 타입에 선언되어 있지만 현재 구현에서 사용하지 않습니다. */
  finalScale?: number;
  /** 텍스트를 표시하는 h1 요소에 추가할 CSS 클래스입니다. */
  className?: string;
}

export default function ScrollTriggerText({
  fromColor = "#888",
  toColor = "#FFD600",
  duration = 0.8,
  text = "Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text Scroll Trigger Text",
  fontSize = "5vw",
  className,
  initialScale = 0.8,
}: ScrollTriggerTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const chars = Array.from(text);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // 글자별 스타일 계산 함수
  function getCharStyle(i: number) {
    const spread = 0.5;
    const base = 0.2;
    const step = spread / Math.max(chars.length - 1, 1);
    const start = base + i * step;
    const end = start + 0.18;

    // opacity 계산
    let opacity = 0;
    if (progress >= start && progress <= end) {
      opacity = (progress - start) / (end - start);
    } else if (progress > end && progress < 1) {
      opacity = 1;
    }
    // scale 계산
    let scale = initialScale;
    if (progress >= start && progress <= end) {
      scale = initialScale + ((1 - initialScale) * (progress - start)) / (end - start);
    } else if (progress > end && progress < 1) {
      scale = 1;
    }
    // color 계산 (간단히 fromColor/toColor 중간값, 실제로는 보간 필요)
    const color = progress >= start && progress <= end ? toColor : fromColor;

    return {
      opacity,
      scale,
      color,
      transition: `color ${duration}s ease`,
      whiteSpace: chars[i] === " " ? "pre" : undefined,
      display: "inline-block",
    };
  }

  return (
    <div ref={containerRef}>
      <motion.h1
        style={{
          fontSize,
          transition: `color ${duration}s ease`,
        }}
        className={className}
      >
        {chars.map((char, i) => (
          <span key={i} style={getCharStyle(i)}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
