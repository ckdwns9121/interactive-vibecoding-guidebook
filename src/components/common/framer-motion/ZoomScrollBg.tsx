"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ZoomScrollBgProps {
  /** 확대할 이미지의 URL 또는 public 폴더 기준 경로입니다. */
  imageSrc?: string;
  /** 이미지의 대체 텍스트입니다. */
  imageAlt?: string;
  /** 이미지 위에 표시할 제목입니다. */
  title?: string;
  /** 스크롤 구간 시작 시 이미지의 배율입니다. */
  minScale?: number;
  /** 스크롤 구간 끝에서 이미지가 도달할 배율입니다. */
  maxScale?: number;
  /** 확대 배율을 따라가는 스프링의 강성입니다. */
  stiffness?: number;
  /** 확대 스프링의 감쇠 계수입니다. 값이 클수록 진동이 빨리 줄어듭니다. */
  damping?: number;
  /** 확대 스프링에 적용할 질량입니다. */
  mass?: number;
  /** 컨테이너의 전체 CSS 클래스입니다. 기본 클래스를 대체하므로 위치·높이·overflow도 지정하세요. */
  className?: string;
  /** 이미지 위 제목 h2 요소에 적용할 CSS 클래스입니다. */
  titleClassName?: string;
}

/**
 * ZoomScrollBg
 * 스크롤에 따라 배경 이미지가 부드럽게 zoom in/out 되는 컴포넌트입니다.
 * - 스크롤을 내리면 zoom in, 올리면 zoom out
 * - framer-motion의 useScroll, useTransform 사용
 * - 반응형 웹 지원
 * - 커스터마이징 가능한 props 지원
 */
export default function ZoomScrollBg({
  imageSrc = "/1.avif",
  imageAlt = "Zoom Background",
  title = "Zoom Demo",
  minScale = 1,
  maxScale = 1.2,
  stiffness = 80,
  damping = 20,
  mass = 1,
  className = "relative h-96 w-full overflow-hidden rounded-lg",
  titleClassName = "mix-blend-difference text-4xl md:text-6xl font-bold text-white",
}: ZoomScrollBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  // 전체 페이지 스크롤 기준
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // 스크롤 진행도에 따라 scale 값을 변환
  const rawScale = useTransform(scrollYProgress, [0, 1], [minScale, maxScale]);
  // spring으로 부드럽게
  const scale = useSpring(rawScale, {
    stiffness,
    damping,
    mass,
  });

  return (
    <div ref={ref} className={className}>
      {/* 배경 이미지 */}
      <motion.img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          scale,
        }}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h2 className={titleClassName}>{title}</h2>
      </div>
    </div>
  );
}
