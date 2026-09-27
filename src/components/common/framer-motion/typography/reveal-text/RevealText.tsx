"use client";
import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  /** 등장 애니메이션을 적용할 문자열입니다. */
  text: string;
  /** 텍스트 바깥 span에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 텍스트 바깥 span에 적용할 인라인 스타일입니다. */
  style?: React.CSSProperties;
  /**
   * 애니메이션 방향: up, down, left, right
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * 전체 애니메이션 시작 딜레이 (초)
   */
  delay?: number;
  /**
   * 각 글자/단어 애니메이션 지속시간 (초)
   */
  duration?: number;
  /**
   * 각 글자/단어 사이의 애니메이션 간격 (초)
   */
  stagger?: number;
  /**
   * 단어 단위로 애니메이션 적용 여부 (기본: false, 글자 단위)
   */
  byWord?: boolean;
}

/**
 * RevealText
 * - 텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 Reveal Animation
 * - direction, delay, duration, stagger 등 커스텀 prop 지원
 * - framer-motion의 motion.span 활용
 * - 반응형 및 접근성 고려
 */
const RevealText: React.FC<RevealTextProps> = ({
  text,
  className,
  style,
  direction = "up",
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  byWord = false,
}) => {
  // direction에 따라 초기 위치 설정
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: "100%", opacity: 0 };
      case "down":
        return { y: "-100%", opacity: 0 };
      case "left":
        return { x: "-100%", opacity: 0 };
      case "right":
        return { x: "100%", opacity: 0 };
      default:
        return { y: "100%", opacity: 0 };
    }
  };

  // 텍스트를 글자 또는 단어 단위로 분리
  const units = byWord ? text.split(" ") : Array.from(text);

  return (
    <span className={`${className} inline-block overflow-hidden`} style={style} aria-label={text} role="text">
      {units.map((unit, i) => (
        <React.Fragment key={i}>
          <motion.span
            initial={getInitial()}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {unit === " " ? "\u00A0" : unit}
          </motion.span>
          {byWord && i < units.length - 1 && <span className="inline-block">\u00A0</span>}
        </React.Fragment>
      ))}
    </span>
  );
};

export default RevealText;
