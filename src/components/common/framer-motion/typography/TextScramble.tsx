"use client";

import { useState, useEffect, useRef } from "react";

export interface TextScrambleProps {
  /** 무작위 문자가 바뀐 뒤 최종적으로 표시할 문자열입니다. */
  text: string;
  speed?: number; // 스크램블 속도 (밀리초)
  delay?: number; // 시작 지연 시간 (밀리초)
  /** 텍스트 컨테이너에 적용할 글꼴 크기, 굵기 등의 CSS 클래스입니다. */
  className?: string;
  onComplete?: () => void; // 스크램블 완료 시 콜백
  loop?: boolean; // 반복 여부
  pauseTime?: number; // 반복 시 일시정지 시간
  characters?: string; // 스크램블에 사용할 문자셋
  revealSpeed?: number; // 각 문자가 복원되는 속도
  trigger?: "auto" | "hover" | "manual"; // 트리거 방식
  onHover?: () => void; // 호버 시 콜백
}

const TextScramble = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
  loop = false,
  pauseTime = 1000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  revealSpeed = 100,
  trigger = "auto",
  onHover,
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const scrambleText = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    frameRef.current = 0;

    const animate = () => {
      const frame = frameRef.current;
      const revealIndex = Math.floor(frame / (revealSpeed / speed));

      let scrambledText = "";

      for (let i = 0; i < text.length; i++) {
        if (i < revealIndex) {
          // 이미 복원된 문자
          scrambledText += text[i];
        } else {
          // 아직 스크램블 중인 문자
          if (text[i] === " ") {
            scrambledText += " ";
          } else {
            scrambledText += getRandomChar();
          }
        }
      }

      setDisplayText(scrambledText);

      if (revealIndex >= text.length) {
        // 애니메이션 완료
        setDisplayText(text);
        setIsAnimating(false);
        onComplete?.();

        if (loop) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText("");
            frameRef.current = 0;
            scrambleText();
          }, pauseTime);
        }
      } else {
        frameRef.current++;
        intervalRef.current = setTimeout(animate, speed);
      }
    };

    animate();
  };

  const handleMouseEnter = () => {
    if (trigger === "hover" && !isAnimating) {
      onHover?.();
      scrambleText();
    }
  };

  useEffect(() => {
    // auto 모드에서만 자동 시작
    if (trigger === "auto") {
      const startTimeout = setTimeout(() => {
        scrambleText();
      }, delay);

      return () => {
        clearTimeout(startTimeout);
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, loop, pauseTime, characters, revealSpeed, trigger]);

  // text가 변경되면 애니메이션 재시작
  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayText("");
    setIsAnimating(false);
    frameRef.current = 0;

    const startTimeout = setTimeout(() => {
      scrambleText();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // hover 모드일 때 초기 텍스트를 표시
  const shouldShowInitialText = trigger === "hover" && !displayText && !isAnimating;

  return (
    <span
      className={`${className} ${trigger === "hover" ? "cursor-pointer select-none" : ""}`}
      onMouseEnter={trigger === "hover" ? handleMouseEnter : undefined}
    >
      {shouldShowInitialText
        ? text
        : displayText ||
          text.split("").map((char, i) => (
            <span key={i} className="opacity-0">
              {char}
            </span>
          ))}
    </span>
  );
};

export default TextScramble;
