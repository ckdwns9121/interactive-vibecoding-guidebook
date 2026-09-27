"use client";
import { useEffect, useId, useRef } from "react";

interface MorphingTextProps {
  /** 순서대로 모핑하며 반복할 문자열 배열입니다. 하나만 전달하면 정적으로 표시합니다. */
  texts: string[];
  morphTime?: number; // morph 애니메이션 시간(초)
  cooldownTime?: number; // 쿨다운 시간(초)
  /** 모핑하는 두 텍스트에 적용할 CSS 색상입니다. */
  color?: string;
  /** 모핑 영역의 글꼴 크기와 굵기 등을 설정할 CSS 클래스입니다. */
  className?: string;
}

/**
 * MorphingText
 * - 두 개의 텍스트를 겹쳐서 blur + threshold SVG 필터로 morphing 효과를 만듭니다.
 * - 반응형, 커스텀 텍스트, 폰트, 색상, 속도 props 지원
 * - 예시: <MorphingText texts={["Why", "is", "this", "cool?"]} />
 */
const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  color = "#222",
  className,
}) => {
  const filterId = useId().replace(/:/g, "");
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  // 내부 상태
  const textIndex = useRef(texts.length - 1);
  const time = useRef(new Date());
  const morph = useRef(0);
  const cooldown = useRef(cooldownTime);

  useEffect(() => {
    const elts = {
      text1: text1Ref.current!,
      text2: text2Ref.current!,
    };
    if (!elts.text1 || !elts.text2 || texts.length === 0) return;
    textIndex.current = texts.length - 1;
    time.current = new Date();
    morph.current = 0;
    cooldown.current = Math.max(cooldownTime, 0.01);
    let frame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || texts.length === 1) {
      elts.text1.textContent = texts[0];
      elts.text1.style.opacity = "1";
      elts.text1.style.filter = "";
      elts.text2.style.opacity = "0";
      return;
    }

    elts.text1.textContent = texts[textIndex.current % texts.length];
    elts.text2.textContent = texts[(textIndex.current + 1) % texts.length];

    function setMorph(fraction: number) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex.current % texts.length];
      elts.text2.textContent = texts[(textIndex.current + 1) % texts.length];
    }

    function doMorph() {
      morph.current -= cooldown.current;
      cooldown.current = 0;
      let fraction = morph.current / Math.max(morphTime, 0.01);
      if (fraction > 1) {
        cooldown.current = Math.max(cooldownTime, 0.01);
        fraction = 1;
      }
      setMorph(fraction);
    }

    function doCooldown() {
      morph.current = 0;
      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";
      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown.current > 0;
      const dt = (+newTime - +time.current) / 1000;
      time.current = newTime;
      cooldown.current -= dt;
      if (cooldown.current <= 0) {
        if (shouldIncrementIndex) textIndex.current++;
        doMorph();
      } else {
        doCooldown();
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div
      style={{
        filter: `url(#${filterId}) blur(0.6px)`,
      }}
      role="img"
      aria-label={texts.join(", ")}
      className={`${className} relative inline-block whitespace-nowrap`}
    >
      {/* SVG 필터 정의 */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <span
        ref={text1Ref}
        className="absolute inset-0 font-sans select-none"
        style={{
          color,
        }}
      />
      <span
        ref={text2Ref}
        className="absolute inset-0 font-sans select-none"
        style={{
          color,
        }}
      />
      {/* 숨겨진 더미 텍스트로 컨테이너 크기 설정 */}
      <span className="font-sans opacity-0 select-none" aria-hidden="true">
        {texts.reduce((longest, text) => (text.length > longest.length ? text : longest), "")}
      </span>
    </div>
  );
};

export default MorphingText;
