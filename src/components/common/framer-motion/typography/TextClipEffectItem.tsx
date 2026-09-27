"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextClipEffect.module.css";

gsap.registerPlugin(ScrollTrigger);

export type TextClipEffectItemProps = {
  /** 클립 효과 아래에 표시할 기본 문자열입니다. */
  main: string;
  /** 마우스를 올렸을 때 클립 영역에 표시할 React 콘텐츠입니다. */
  sub: React.ReactNode;
  /** 텍스트 h1 요소에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 마우스 호버 시 드러나는 보조 콘텐츠 영역의 CSS 배경색입니다. */
  clipColor?: string;
  /** GSAP ScrollTrigger의 시작·종료 위치 표시를 켭니다. */
  showMarkers?: boolean;
  /** 애니메이션 시작 위치를 정하는 GSAP ScrollTrigger 표현식입니다. */
  startPosition?: string;
  /** 애니메이션 종료 위치를 정하는 GSAP ScrollTrigger 표현식입니다. */
  endPosition?: string;
  /** true이면 배경 채우기 진행도를 스크롤 위치에 직접 연결합니다. */
  scrubEffect?: boolean;
};

export default function TextClipEffectItem({
  main,
  sub,
  className,
  clipColor = "#fff",
  showMarkers = false,
  startPosition = "center 80%",
  endPosition = "center 20%",
  scrubEffect = true,
}: TextClipEffectItemProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement) {
      // 기존 ScrollTrigger 제거
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textElement) {
          trigger.kill();
        }
      });

      gsap.to(textElement, {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: textElement,
          start: startPosition,
          end: endPosition,
          scrub: scrubEffect,
          markers: showMarkers,
        },
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 ScrollTrigger 정리
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === textElement) {
          trigger.kill();
        }
      });
    };
  }, [showMarkers, startPosition, endPosition, scrubEffect]);

  return (
    <h1 ref={textRef} className={`${styles.text} ${className}`}>
      {main}
      <span className={styles.span} style={{ backgroundColor: clipColor }}>
        {sub}
      </span>
    </h1>
  );
}
