"use client";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * MagneticLetters
 * - 텍스트의 각 글자가 마우스 커서에 자석처럼 개별적으로 끌려오는 효과
 * - 마우스가 가까울수록 더 강하게, 멀수록 약하게 끌림
 * - framer-motion 기반, 반응형
 * - 예시: <MagneticLetters text="MAGNETIC TEXT" />
 */
interface MagneticLettersProps {
  /** 마우스에 반응하도록 글자 단위로 나눌 문자열입니다. */
  text: string;
  strength?: number; // 자석 강도 (기본 40)
  threshold?: number; // 영향 범위 배수 (기본 6)
  stiffness?: number; // 스프링 강성 (기본 400)
  damping?: number; // 스프링 댐핑 (기본 30)
  textColor?: string; // 텍스트 색상
  /** 글자들을 감싸는 inline-flex 요소에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 글자들을 감싸는 요소에 적용할 인라인 스타일입니다. */
  style?: React.CSSProperties;
}

interface MagneticLetterProps {
  char: string;
  strength: number;
  threshold: number;
  stiffness: number;
  damping: number;
  textColor: string;
}

function MagneticLetter({ char, strength, threshold, stiffness, damping, textColor }: MagneticLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const thresholdPx = rect.width * threshold;

      if (dist < thresholdPx) {
        const force = ((thresholdPx - dist) / thresholdPx) * strength;
        x.set((dx / thresholdPx) * force);
        y.set((dy / thresholdPx) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [strength, threshold, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{
        x: springX,
        y: springY,
        color: textColor,
      }}
      className="inline-block cursor-pointer select-none transition-colors duration-200"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function MagneticLetters({
  text,
  strength = 40,
  threshold = 6,
  stiffness = 400,
  damping = 30,
  textColor = "#007aff",
  className = "",
  style = {},
}: MagneticLettersProps) {
  return (
    <span className={`${className} inline-flex`} style={style}>
      {text.split("").map((char, i) => (
        <MagneticLetter
          key={i}
          char={char}
          strength={strength}
          threshold={threshold}
          stiffness={stiffness}
          damping={damping}
          textColor={textColor}
        />
      ))}
    </span>
  );
}
