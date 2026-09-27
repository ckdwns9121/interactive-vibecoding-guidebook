"use client";

import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingTextProps {
  /** 한 글자씩 표시할 원본 문자열입니다. */
  text: string;
  speed?: number; // 타이핑 속도 (밀리초)
  delay?: number; // 시작 지연 시간 (밀리초)
  /** 타이핑 텍스트와 커서를 감싸는 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
  onComplete?: () => void; // 타이핑 완료 시 콜백
  showCursor?: boolean; // 커서 표시 여부
  cursorChar?: string; // 커서 문자
  loop?: boolean; // 반복 여부
  pauseTime?: number; // 반복 시 일시정지 시간
  cursorClassName?: string; // 커서 스타일 커스터마이징
  textClassName?: string; // 텍스트 스타일 커스터마이징
  autoStart?: boolean; // 자동 시작 여부
  onStart?: () => void; // 타이핑 시작 시 콜백
  onPause?: () => void; // 일시정지 시 콜백
  onResume?: () => void; // 재개 시 콜백
}

// 외부에서 제어할 수 있는 메서드들을 위한 타입
export interface TypingTextRef {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
}

const TypingText = forwardRef<TypingTextRef, TypingTextProps>(
  (
    {
      text,
      speed = 100,
      delay = 0,
      className = "",
      onComplete,
      showCursor = true,
      cursorChar = "|",
      loop = false,
      pauseTime = 1000,
      cursorClassName = "",
      textClassName = "",
      autoStart = true,
      onStart,
      onPause,
      onResume,
    },
    ref,
  ) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

    // 타이머 정리 함수
    const clearAllTimeouts = useCallback(() => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    }, []);

    // 타이핑 시작
    const startTyping = useCallback(() => {
      setIsTyping(true);
      setIsPaused(false);
      setCurrentIndex(0);
      setDisplayText("");
      onStart?.();
    }, [onStart]);

    // 타이핑 일시정지
    const pauseTyping = useCallback(() => {
      setIsPaused(true);
      clearAllTimeouts();
      onPause?.();
    }, [clearAllTimeouts, onPause]);

    // 타이핑 재개
    const resumeTyping = useCallback(() => {
      if (isPaused && currentIndex < text.length) {
        setIsPaused(false);
        setIsTyping(true);
        onResume?.();
      }
    }, [isPaused, currentIndex, text.length, onResume]);

    // 타이핑 재시작
    const restartTyping = useCallback(() => {
      clearAllTimeouts();
      startTyping();
    }, [clearAllTimeouts, startTyping]);

    // 외부에서 제어할 수 있는 메서드들 노출
    useImperativeHandle(
      ref,
      () => ({
        start: startTyping,
        pause: pauseTyping,
        resume: resumeTyping,
        restart: restartTyping,
      }),
      [startTyping, pauseTyping, resumeTyping, restartTyping],
    );

    // 자동 시작 처리
    useEffect(() => {
      if (!autoStart) return;

      const startTypingWithDelay = () => {
        if (delay > 0) {
          const delayTimer = setTimeout(startTyping, delay);
          timeoutRefs.current.push(delayTimer);
        } else {
          startTyping();
        }
      };

      startTypingWithDelay();

      return clearAllTimeouts;
    }, [delay, text, autoStart, startTyping, clearAllTimeouts]);

    // 타이핑 로직
    useEffect(() => {
      if (!isTyping || isPaused || currentIndex >= text.length) {
        if (currentIndex >= text.length) {
          setIsTyping(false);
          onComplete?.();

          if (loop) {
            const loopTimer = setTimeout(() => {
              setCurrentIndex(0);
              setDisplayText("");
              setIsTyping(true);
            }, pauseTime);
            timeoutRefs.current.push(loopTimer);
          }
        }
        return;
      }

      const typingTimer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      timeoutRefs.current.push(typingTimer);

      return () => {
        clearTimeout(typingTimer);
        timeoutRefs.current = timeoutRefs.current.filter((timer) => timer !== typingTimer);
      };
    }, [currentIndex, isTyping, isPaused, text, speed, onComplete, loop, pauseTime]);

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
      return clearAllTimeouts;
    }, [clearAllTimeouts]);

    return (
      <motion.div
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className={`font-mono ${textClassName}`}>
          {displayText}
          <AnimatePresence>
            {showCursor && (
              <motion.span
                className={`inline-block ${cursorClassName}`}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {cursorChar}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.div>
    );
  },
);

TypingText.displayName = "TypingText";

export default TypingText;
