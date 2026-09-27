"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface PixelDissolveTextProps {
  /** 픽셀화와 디졸브 필터를 적용할 문자열입니다. */
  text: string;
  /** 텍스트의 CSS 색상입니다. */
  color?: string;
  /** 디졸브 진행도 (0: 온전, 1: 완전히 사라짐). 외부에서 제어할 때 사용 */
  progress?: number;
  /** 호버 시 디졸브 애니메이션 자동 실행 */
  hoverTrigger?: boolean;
  /** 픽셀 크기 (클수록 큰 모자이크) */
  pixelSize?: number;
  /** 노이즈 주파수 (흩어지는 패턴) */
  baseFrequency?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  /** 디졸브 애니메이션 시간 (ms) */
  duration?: number;
  /** 텍스트 영역의 글꼴 크기와 굵기 등을 설정할 CSS 클래스입니다. */
  className?: string;
}

/**
 * sigmoid 기반 tableValues 생성
 * progress에 따라 noise 밝기별 alpha를 부드럽게 전환
 */
function buildTableValues(progress: number, steps = 32): string {
  const values: number[] = [];
  for (let i = 0; i < steps; i++) {
    const x = i / (steps - 1);
    const sharpness = 14;
    const sigmoid = 1 / (1 + Math.exp(sharpness * (progress - x)));
    values.push(Math.max(0, Math.min(1, sigmoid)));
  }
  return values.map((v) => v.toFixed(3)).join(" ");
}

/**
 * PixelDissolveText
 * - feConvolveMatrix로 픽셀화(모자이크) + feTurbulence/feComponentTransfer로 디졸브
 * - progress에 따라 픽셀화 강도와 디졸브가 동시에 진행
 * - rAF 기반 직접 SVG attribute 업데이트 (React 리렌더 없음)
 */
const PixelDissolveText: React.FC<PixelDissolveTextProps> = ({
  text,
  color = "#ffffff",
  progress: controlledProgress,
  hoverTrigger = true,
  pixelSize = 8,
  baseFrequency = 0.04,
  numOctaves = 3,
  duration = 1200,
  className,
}) => {
  const filterId = useRef(`pixel-dissolve-${Math.random().toString(36).slice(2, 8)}`);
  const transferRef = useRef<SVGFEFuncAElement>(null);
  const scaleRef = useRef<SVGFEMorphologyElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // 픽셀화를 위한 convolve matrix 생성 (n×n 평균 필터)
  const matrixSize = pixelSize;
  const kernelSize = Math.max(1, Math.min(matrixSize, 20));
  const kernelCount = kernelSize * kernelSize;
  const kernelMatrix = new Array(kernelCount).fill((1 / kernelCount).toFixed(6)).join(" ");

  const applyProgress = useCallback(
    (p: number) => {
      // 디졸브 마스크 업데이트
      const transfer = transferRef.current;
      if (transfer) {
        transfer.setAttribute("tableValues", buildTableValues(p));
      }

      // 픽셀화 스케일 업데이트: progress에 따라 convolve 필터의 영향도 증가
      // morphology radius를 progress에 따라 키워서 픽셀 블록 느낌 강화
      const scale = scaleRef.current;
      if (scale) {
        const radius = Math.round(p * pixelSize);
        scale.setAttribute("radius", `${radius}`);
      }
    },
    [pixelSize],
  );

  // 호버 트리거: rAF로 SVG 직접 구동
  useEffect(() => {
    if (controlledProgress !== undefined) return;
    if (!hoverTrigger) return;

    targetRef.current = isHovered ? 1 : 0;
    startRef.current = progressRef.current;
    startTimeRef.current = performance.now();

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startRef.current + (targetRef.current - startRef.current) * ease;

      progressRef.current = current;
      applyProgress(current);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered, hoverTrigger, controlledProgress, duration, applyProgress]);

  // 외부 progress 제어
  useEffect(() => {
    if (controlledProgress === undefined) return;
    progressRef.current = controlledProgress;
    applyProgress(controlledProgress);
  }, [controlledProgress, applyProgress]);

  // 마운트 시 초기 필터 적용 (1회만 실행)
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    applyProgress(controlledProgress ?? 0);
  }, [controlledProgress, applyProgress]);

  return (
    <div
      className={`${className ?? ""} relative inline-block cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={filterId.current} x="-10%" y="-10%" width="120%" height="120%">
            {/* 1) 픽셀화: feMorphology erode로 축소 → dilate로 확대하면 블록 느낌 */}
            <feMorphology ref={scaleRef} in="SourceGraphic" operator="dilate" radius="0" result="pixelated" />

            {/* 2) 픽셀화된 결과를 평균 필터로 블러 처리해 모자이크 효과 강화 */}
            <feConvolveMatrix
              in="pixelated"
              order={`${kernelSize}`}
              kernelMatrix={kernelMatrix}
              divisor="1"
              edgeMode="duplicate"
              result="mosaic"
            />

            {/* 3) Perlin Noise 생성 — 흩어지는 패턴 */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="77"
              result="noise"
            />

            {/* 4) 노이즈 → sigmoid 기반 alpha 마스크 */}
            <feComponentTransfer in="noise" result="mask">
              <feFuncA
                ref={transferRef}
                type="table"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
              />
            </feComponentTransfer>

            {/* 5) 모자이크 + 디졸브 마스크 합성 */}
            <feComposite in="mosaic" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

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

export default PixelDissolveText;
