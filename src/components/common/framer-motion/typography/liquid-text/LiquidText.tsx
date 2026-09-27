"use client";
import { useEffect, useRef } from "react";

interface LiquidTextProps {
  /** 액체 왜곡 필터를 적용할 문자열입니다. */
  text: string;
  /** 텍스트의 CSS 색상입니다. */
  color?: string;
  /** 왜곡 강도 (px) */
  scale?: number;
  /** 노이즈 주파수 (낮을수록 큰 물결) */
  baseFrequency?: number;
  /** 애니메이션 속도 */
  speed?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  /** 텍스트 영역의 글꼴 크기와 굵기 등을 설정할 CSS 클래스입니다. */
  className?: string;
}

/**
 * LiquidText
 * - SVG feTurbulence + feDisplacementMap 필터로 텍스트에 액체처럼 흐르는 왜곡 효과를 적용합니다.
 * - requestAnimationFrame으로 turbulence의 seed를 변경하여 실시간 애니메이션을 구현합니다.
 * - 예시: <LiquidText text="LIQUID" scale={12} speed={0.8} />
 */
const LiquidText: React.FC<LiquidTextProps> = ({
  text,
  color = "#ffffff",
  scale = 12,
  baseFrequency = 0.015,
  speed = 0.8,
  numOctaves = 3,
  className,
}) => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const animFrameRef = useRef<number>(0);
  const filterId = useRef(`liquid-${Math.random().toString(36).slice(2, 8)}`);

  useEffect(() => {
    const turbulence = turbulenceRef.current;
    if (!turbulence) return;

    let seed = 0;

    function animate() {
      seed += speed;
      turbulence!.setAttribute("seed", String(Math.floor(seed)));
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed]);

  return (
    <div className={`${className ?? ""} relative inline-block`}>
      {/* SVG 필터 정의 */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
            {/* 1) Perlin Noise 생성 */}
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="0"
              result="turbulence"
            />
            {/* 2) 노이즈 기반으로 원본 픽셀 위치를 왜곡 */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* 3) 원본과 왜곡본을 부드럽게 합성 */}
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 필터가 적용된 텍스트 */}
      <span
        className="select-none whitespace-nowrap"
        style={{
          color,
          filter: `url(#${filterId.current})`,
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default LiquidText;
