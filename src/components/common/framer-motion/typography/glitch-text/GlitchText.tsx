"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface GlitchTextProps {
  /** 글리치 레이어에 반복해서 표시할 문자열입니다. */
  children: string;
  /** 글리치 전환 시간의 배율입니다. 값이 클수록 한 번의 전환이 느려집니다. */
  speed?: number;
  /** 네 가지 색상의 글리치 레이어를 표시할지 설정합니다. */
  enableShadows?: boolean;
  /** true이면 마우스를 올린 동안만 글리치를 반복합니다. */
  enableOnHover?: boolean;
  /** 텍스트와 글리치 레이어를 감싸는 span에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 네 개 글리치 레이어에 순서대로 적용할 CSS 색상 배열입니다. 색상 네 개를 전달하세요. */
  glitchColors?: string[];
  /** 글리치 반복 사이의 기준 대기 시간(ms)입니다. 실제 간격은 무작위로 변합니다. */
  refreshDelay?: number;
}

// 강렬한 글리치 색상 (이미지 스타일)
const defaultGlitchColors = [
  "#ff0040", // 강렬한 빨강
  "#00ffff", // 시안
  "#ff0080", // 핑크
  "#0040ff", // 파랑
];

// 다양한 글리치 패턴 생성 함수들
function getRandomClip() {
  const patterns = [
    // 수평 슬라이스
    () => {
      const top = Math.random() * 80;
      const height = 5 + Math.random() * 20;
      return `inset(${top}% 0 ${100 - top - height}% 0)`;
    },
    // 대각선 슬라이스
    () => {
      const points = Array.from({ length: 4 }, () => Math.random() * 100);
      return `polygon(${points[0]}% ${points[1]}%, ${points[2]}% ${points[3]}%, ${100 - points[0]}% ${
        100 - points[1]
      }%, ${100 - points[2]}% ${100 - points[3]}%)`;
    },
    // 불규칙한 조각들
    () => {
      const x1 = Math.random() * 30;
      const x2 = 70 + Math.random() * 30;
      const y1 = Math.random() * 40;
      const y2 = 60 + Math.random() * 40;
      return `inset(${y1}% ${100 - x2}% ${100 - y2}% ${x1}%)`;
    },
  ];

  return patterns[Math.floor(Math.random() * patterns.length)]();
}

// 강렬한 변형 값들
function getRandomTransform() {
  return {
    x: (Math.random() - 0.5) * 20, // -10 ~ 10px
    y: (Math.random() - 0.5) * 8, // -4 ~ 4px
    skewX: (Math.random() - 0.5) * 10, // -5 ~ 5deg
    scale: 0.98 + Math.random() * 0.04, // 0.98 ~ 1.02
  };
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  glitchColors = defaultGlitchColors,
  refreshDelay = 100,
}) => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(!enableOnHover);

  // 강렬한 글리치 애니메이션
  const performIntenseGlitch = useCallback(async () => {
    try {
      const duration = 0.1 * speed;

      // 4개 레이어로 더 복잡한 글리치
      const promises = [
        // 레이어 1: 빨간색 큰 오프셋
        controls1.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, 15, -8, 0],
          color: enableShadows ? glitchColors[0] : "rgba(0,0,0,0)",
          opacity: [0.8, 1, 0.9, 0.8],
          transition: {
            duration: duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1],
          },
        }),

        // 레이어 2: 시안색 반대 방향
        controls2.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, -12, 6, 0],
          y: [0, 2, -1, 0],
          color: enableShadows ? glitchColors[1] : "rgba(0,0,0,0)",
          opacity: [0.7, 0.9, 1, 0.7],
          transition: {
            duration: duration * 1.2,
            ease: [0.55, 0.055, 0.675, 0.19],
            times: [0, 0.4, 0.6, 1],
          },
        }),

        // 레이어 3: 핑크색 스큐 효과
        controls3.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, 8, -15, 0],
          skewX: [0, 3, -2, 0],
          color: enableShadows ? glitchColors[2] : "rgba(0,0,0,0)",
          opacity: [0.6, 1, 0.8, 0.6],
          transition: {
            duration: duration * 0.8,
            ease: [0.175, 0.885, 0.32, 1.275],
            times: [0, 0.2, 0.8, 1],
          },
        }),

        // 레이어 4: 파란색 미세 진동
        controls4.start({
          clipPath: getRandomClip(),
          ...getRandomTransform(),
          x: [0, -5, 10, -3, 0],
          y: [0, 1, -2, 1, 0],
          color: enableShadows ? glitchColors[3] : "rgba(0,0,0,0)",
          opacity: [0.5, 0.8, 1, 0.7, 0.5],
          transition: {
            duration: duration * 1.5,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        }),
      ];

      await Promise.all(promises);

      // 모든 레이어 리셋
      [controls1, controls2, controls3, controls4].forEach((control) => {
        control.set({
          clipPath: "none",
          x: 0,
          y: 0,
          skewX: 0,
          scale: 1,
          color: "rgba(0,0,0,0)",
          opacity: 0,
        });
      });
    } catch (error) {
      console.error("글리치 애니메이션 에러:", error);
    }
  }, [controls1, controls2, controls3, controls4, speed, enableShadows, glitchColors]);

  // 애니메이션 루프
  useEffect(() => {
    if (!shouldAnimate) return;

    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const animationLoop = async () => {
      if (!isActive) return;

      await performIntenseGlitch();

      if (isActive) {
        // 랜덤한 간격으로 더 자연스러운 글리치
        const randomDelay = refreshDelay + (Math.random() - 0.5) * refreshDelay * 0.5;
        timeoutId = setTimeout(animationLoop, randomDelay);
      }
    };

    // 초기 지연
    timeoutId = setTimeout(animationLoop, 300);

    return () => {
      isActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldAnimate, performIntenseGlitch, refreshDelay]);

  // 호버 상태 관리
  useEffect(() => {
    if (enableOnHover) {
      setShouldAnimate(isHovered);
    } else {
      setShouldAnimate(true);
    }
  }, [enableOnHover, isHovered]);

  // 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    if (enableOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableOnHover) {
      setIsHovered(false);
      // 호버 종료시 모든 레이어 리셋
      [controls1, controls2, controls3, controls4].forEach((control) => {
        control.set({
          clipPath: "none",
          x: 0,
          y: 0,
          skewX: 0,
          scale: 1,
          color: "rgba(0,0,0,0)",
          opacity: 0,
        });
      });
    }
  };

  return (
    <span
      className={`${className} relative inline-block font-bold cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={children}
      style={{
        textShadow: shouldAnimate ? "0 0 10px rgba(255,255,255,0.1)" : "none",
      }}
    >
      {/* 메인 텍스트 */}
      <span className="relative z-10">{children}</span>

      {/* 글리치 레이어 1 - 빨간색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none font-bold"
        animate={controls1}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 2 - 시안색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] select-none font-bold"
        animate={controls2}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 3 - 핑크색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] select-none font-bold"
        animate={controls3}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>

      {/* 글리치 레이어 4 - 파란색 */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] select-none font-bold"
        animate={controls4}
        initial={{ clipPath: "none", x: 0, y: 0, skewX: 0, scale: 1, color: "rgba(0,0,0,0)", opacity: 0 }}
        style={{
          display: "block",
          overflow: "hidden",
          whiteSpace: "pre",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default GlitchText;
