"use client";

import { useScroll, useTransform, motion, MotionStyle } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StickyShrinkSectionProps {
  /** 스크롤하면서 축소되는 고정 영역 안에 표시할 React 콘텐츠입니다. */
  children: ReactNode;
  /**
   * 최종 축소 비율 (기본값: 0.8)
   */
  finalScale?: number;
  /**
   * 최종 투명도 (기본값: 0.5)
   */
  finalOpacity?: number;
  /**
   * 배경색 (Tailwind CSS 클래스 또는 hex 코드)
   */
  backgroundColor?: string;
  /**
   * 배경 이미지 URL
   */
  backgroundImage?: string;
  /**
   * 스크롤 애니메이션이 진행될 높이 (vh 단위, 기본값: 200)
   */
  scrollRange?: number;
}

/**
 * 스크롤 시 축소되는 고정 섹션 컴포넌트
 * @param children - 섹션 내부에 표시될 콘텐츠
 * @param finalScale - 최종 축소 비율 (기본값: 0.8)
 * @param finalOpacity - 최종 투명도 (기본값: 0.5)
 * @param backgroundColor - 배경색 (Tailwind CSS 클래스 또는 hex 코드)
 * @param backgroundImage - 배경 이미지 URL
 * @param scrollRange - 스크롤 애니메이션이 진행될 높이 (vh 단위, 기본값: 200)
 */
export default function StickyShrinkSection({
  children,
  finalScale = 0.8,
  finalOpacity = 0.5,
  backgroundColor = "bg-neutral-900",
  backgroundImage,
  scrollRange = 200,
}: StickyShrinkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, finalScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, finalOpacity]);

  const motionStyle: MotionStyle = {
    scale: scale,
    opacity: opacity,
    originX: "50%",
    originY: "50%",
  };

  if (backgroundImage) {
    motionStyle.backgroundImage = `url(${backgroundImage})`;
    motionStyle.backgroundSize = "cover";
    motionStyle.backgroundPosition = "center";
  }

  const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(backgroundColor);

  return (
    <div ref={containerRef} style={{ height: `${scrollRange}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={motionStyle}
          className={`h-full w-full ${!backgroundImage && !isHexColor ? backgroundColor : ""}`}
          {...(isHexColor && { style: { ...motionStyle, backgroundColor } })}
        >
          <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
