"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface NoiseGrainBGProps {
  /** 콘텐츠 위에 겹치는 노이즈 레이어의 불투명도(0~1)입니다. */
  opacity?: number;
  /** SVG 노이즈의 기본 주파수입니다. 값이 높을수록 입자가 촘촘해집니다. */
  baseFrequency?: number;
  /** SVG 노이즈를 합성할 옥타브 수입니다. 값이 높을수록 세부 무늬가 늘어납니다. */
  numOctaves?: number;
  /** 노이즈 시드를 주기적으로 바꿀지 설정합니다. */
  animate?: boolean;
  /** 애니메이션 중 초당 노이즈 시드를 갱신할 횟수입니다. 0보다 큰 값을 사용하세요. */
  speed?: number;
  /** 노이즈와 콘텐츠를 합성할 CSS mix-blend-mode 값입니다. */
  blendMode?: string;
  /** 노이즈와 콘텐츠를 감싸는 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 노이즈 아래에 표시할 React 콘텐츠입니다. */
  children?: React.ReactNode;
}

const NoiseGrainBG: React.FC<NoiseGrainBGProps> = ({
  opacity = 0.15,
  baseFrequency = 0.65,
  numOctaves = 4,
  animate = true,
  speed = 10,
  blendMode = "overlay",
  className = "",
  children,
}) => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number>(0);
  const seedRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const animateGrain = useCallback(
    (time: number) => {
      if (!turbulenceRef.current) return;

      const interval = 1000 / speed;
      if (time - lastFrameTimeRef.current >= interval) {
        seedRef.current = (seedRef.current + 1) % 100;
        turbulenceRef.current.setAttribute("seed", String(seedRef.current));
        lastFrameTimeRef.current = time;
      }

      rafRef.current = requestAnimationFrame(animateGrain);
    },
    [speed],
  );

  useEffect(() => {
    if (animate) {
      rafRef.current = requestAnimationFrame(animateGrain);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, animateGrain]);

  const filterId = `noise-grain-${React.useId().replace(/:/g, "")}`;

  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          opacity,
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              stitchTiles="stitch"
              seed="0"
            />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      </div>
    </div>
  );
};

export default NoiseGrainBG;
