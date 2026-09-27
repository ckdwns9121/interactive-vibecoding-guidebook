"use client";

import { useRef, useCallback, ReactNode } from "react";

interface GlassmorphismCardProps {
  /** 배경 블러 강도 (px) */
  blurAmount?: number;
  /** 배경색 불투명도 */
  bgOpacity?: number;
  /** 배경 틴트 색상 */
  bgColor?: string;
  /** 빛 반사 효과 사용 여부 */
  enableReflection?: boolean;
  /** 빛 반사 크기 (px) */
  reflectionSize?: number;
  /** 빛 반사 불투명도 */
  reflectionOpacity?: number;
  /** 3D 틸트 효과 사용 */
  enableTilt?: boolean;
  /** 최대 틸트 각도 (deg) */
  maxTilt?: number;
  /** 엣지 하이라이트 불투명도 */
  edgeHighlight?: number;
  /** 표면 노이즈 불투명도 */
  noiseOpacity?: number;
  /** 내부 그림자 강도 */
  innerShadow?: number;
  /** 너비 (Tailwind 클래스) */
  width?: string;
  /** 높이 (Tailwind 클래스) */
  height?: string;
  /** 유리 카드 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 유리 카드 내부에 표시할 React 콘텐츠입니다. */
  children?: ReactNode;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

export default function GlassmorphismCard({
  blurAmount = 16,
  bgOpacity = 0.08,
  bgColor = "#ffffff",
  enableReflection = true,
  reflectionSize = 250,
  reflectionOpacity = 0.15,
  enableTilt = true,
  maxTilt = 8,
  edgeHighlight = 0.4,
  noiseOpacity = 0.03,
  innerShadow = 0.3,
  width = "w-80",
  height = "h-52",
  className = "",
  children,
}: GlassmorphismCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const normalX = (x - centerX) / centerX; // -1 ~ 1
        const normalY = (y - centerY) / centerY; // -1 ~ 1

        // 3D tilt
        if (enableTilt) {
          const rotateX = -normalY * maxTilt;
          const rotateY = normalX * maxTilt;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }

        // Diffuse reflection (큰 부드러운 빛)
        if (enableReflection && reflectionRef.current) {
          reflectionRef.current.style.background = `radial-gradient(${reflectionSize}px circle at ${x}px ${y}px, rgba(255, 255, 255, ${reflectionOpacity}), transparent 70%)`;
          reflectionRef.current.style.opacity = "1";
        }

        // Specular highlight (작고 강한 하이라이트)
        if (enableReflection && specularRef.current) {
          const specSize = reflectionSize * 0.35;
          specularRef.current.style.background = `radial-gradient(${specSize}px circle at ${x}px ${y}px, rgba(255, 255, 255, ${reflectionOpacity * 2}), transparent 50%)`;
          specularRef.current.style.opacity = "1";
        }
      });
    },
    [enableReflection, enableTilt, maxTilt, reflectionSize, reflectionOpacity],
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card && enableTilt) {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = "0";
    }
    if (specularRef.current) {
      specularRef.current.style.opacity = "0";
    }
  }, [enableTilt]);

  const rgb = hexToRgb(bgColor);

  return (
    <div
      ref={cardRef}
      className={`${width} ${height} relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backdropFilter: `blur(${blurAmount}px) saturate(1.2)`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(1.2)`,
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
        boxShadow: [
          // 외부 그림자 — 유리가 뜬 느낌
          `0 8px 32px rgba(0, 0, 0, 0.2)`,
          `0 2px 8px rgba(0, 0, 0, 0.1)`,
          // 내부 그림자 — 유리 두께감
          `inset 0 1px 0 rgba(255, 255, 255, ${edgeHighlight})`,
          `inset 0 -1px 0 rgba(0, 0, 0, ${innerShadow * 0.3})`,
          `inset 1px 0 0 rgba(255, 255, 255, ${edgeHighlight * 0.5})`,
          `inset -1px 0 0 rgba(0, 0, 0, ${innerShadow * 0.15})`,
          // 내부 깊은 그림자 — 두께 표현
          `inset 0 4px 12px rgba(0, 0, 0, ${innerShadow * 0.15})`,
          `inset 0 -2px 8px rgba(0, 0, 0, ${innerShadow * 0.1})`,
        ].join(", "),
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* 1) Top/Left edge highlight — 방향성 있는 빛 */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, ${edgeHighlight * 0.3}) 0%, transparent 40%, transparent 60%, rgba(0, 0, 0, ${edgeHighlight * 0.15}) 100%)`,
        }}
      />

      {/* 2) Border gradient — 위/왼쪽 밝고 아래/오른쪽 어둡게 */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-2xl"
        style={{
          border: "1px solid transparent",
          borderImage: `linear-gradient(135deg, rgba(255,255,255,${edgeHighlight * 0.8}), rgba(255,255,255,${edgeHighlight * 0.2}) 50%, rgba(255,255,255,${edgeHighlight * 0.05})) 1`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      {/* 실제 테두리 — 그라디언트 보더 */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,${edgeHighlight * 0.6}), rgba(255,255,255,${edgeHighlight * 0.1}) 50%, rgba(255,255,255,0.02))`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "1rem",
        }}
      />

      {/* 3) Surface noise — 유리 표면 미세 불규칙 */}
      {noiseOpacity > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-[3] h-full w-full rounded-2xl"
          style={{ opacity: noiseOpacity }}
        >
          <filter id="glass-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#glass-noise)" />
        </svg>
      )}

      {/* 4) Diffuse reflection — 큰 부드러운 반사 */}
      {enableReflection && (
        <div
          ref={reflectionRef}
          className="pointer-events-none absolute inset-0 z-[4] rounded-2xl"
          style={{
            opacity: 0,
            transition: "opacity 0.4s ease-out",
            mixBlendMode: "soft-light",
          }}
        />
      )}

      {/* 5) Specular highlight — 작고 강한 하이라이트 */}
      {enableReflection && (
        <div
          ref={specularRef}
          className="pointer-events-none absolute inset-0 z-[5] rounded-2xl"
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease-out",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* 6) Bottom frosted edge — 아래쪽 서리 효과 */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[6] h-1/3 rounded-b-2xl"
        style={{
          background: `linear-gradient(to top, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity * 1.5}), transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-[10] h-full w-full p-6">{children}</div>
    </div>
  );
}
