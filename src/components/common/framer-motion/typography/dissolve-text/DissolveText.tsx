"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface DissolveTextProps {
  /** 흩어지며 사라지는 필터를 적용할 문자열입니다. */
  text: string;
  /** 텍스트의 CSS 색상입니다. */
  color?: string;
  /** 디졸브 진행도 (0: 온전, 1: 완전히 흩어짐). 외부에서 제어할 때 사용 */
  progress?: number;
  /** 호버 시 디졸브 애니메이션 자동 실행 */
  hoverTrigger?: boolean;
  /** 노이즈 주파수 (낮을수록 큰 덩어리로 흩어짐) */
  baseFrequency?: number;
  /** 노이즈 디테일 레벨 */
  numOctaves?: number;
  /** 디졸브 애니메이션 시간 (ms) */
  duration?: number;
  /** 텍스트 영역의 글꼴 크기와 굵기 등을 설정할 CSS 클래스입니다. */
  className?: string;
}

/**
 * 부드러운 sigmoid 기반 tableValues 생성
 * progress에 따라 noise 밝기별 alpha를 부드럽게 전환
 *
 * tableValues의 각 항목 = 해당 밝기 구간의 출력 alpha
 * progress=0 → 전부 1(보임), progress=1 → 전부 0(사라짐)
 * 중간값에서는 sigmoid 곡선으로 부드럽게 전환
 */
function buildTableValues(progress: number, steps = 32): string {
  const values: number[] = [];
  for (let i = 0; i < steps; i++) {
    const x = i / (steps - 1); // 0~1: noise 밝기 구간
    // sigmoid: threshold(=progress) 근처에서 부드럽게 0→1 전환
    // sharpness가 높을수록 전환이 급격 (12~20이 적당)
    const sharpness = 16;
    const sigmoid = 1 / (1 + Math.exp(sharpness * (progress - x)));
    values.push(Math.max(0, Math.min(1, sigmoid)));
  }
  return values.map((v) => v.toFixed(3)).join(" ");
}

/**
 * DissolveText
 * - SVG feTurbulence + feComponentTransfer로 텍스트가 먼지처럼 흩어지며 사라지는 효과
 * - requestAnimationFrame으로 SVG attribute를 직접 업데이트 (React 리렌더 없음)
 * - sigmoid 기반 부드러운 threshold로 자연스러운 디졸브
 */
const DissolveText: React.FC<DissolveTextProps> = ({
  text,
  color = "#ffffff",
  progress: controlledProgress,
  hoverTrigger = true,
  baseFrequency = 0.04,
  numOctaves = 3,
  duration = 1200,
  className,
}) => {
  const filterId = useRef(`dissolve-${Math.random().toString(36).slice(2, 8)}`);
  const transferRef = useRef<SVGFEFuncAElement>(null);
  const animRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // SVG attribute 직접 업데이트 (리렌더 없이)
  const applyProgress = useCallback((p: number) => {
    const transfer = transferRef.current;
    if (!transfer) return;
    transfer.setAttribute("tableValues", buildTableValues(p));
  }, []);

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
      // easeInOutCubic
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
            {/* 1) Perlin Noise 생성 — 흩어지는 패턴 */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              seed="42"
              result="noise"
            />
            {/* 2) 노이즈 밝기를 기준으로 alpha를 sigmoid 곡선으로 부드럽게 전환 */}
            <feComponentTransfer in="noise" result="mask">
              <feFuncA
                ref={transferRef}
                type="table"
                tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"
              />
            </feComponentTransfer>
            {/* 3) 마스크와 원본을 합성 — alpha가 0인 영역이 사라짐 */}
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
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

export default DissolveText;
