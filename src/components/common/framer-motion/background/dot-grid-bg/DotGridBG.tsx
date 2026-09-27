"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface DotGridBGProps {
  /** 기본 점의 반지름(px)입니다. 마우스 주변에서는 확대 배율이 곱해집니다. */
  dotSize?: number;
  /** 점의 6자리 HEX 색상입니다. 예: #ffffff. */
  dotColor?: string;
  /** 점 사이의 가로·세로 간격(px)입니다. 0보다 큰 값을 사용하세요. */
  dotSpacing?: number;
  /** 마우스 위치를 중심으로 점이 반응하는 반경(px)입니다. */
  interactionRadius?: number;
  /** 마우스에 가장 가까운 점에 적용할 최대 크기 배율입니다. */
  maxDotScale?: number;
  /** 마우스 주변의 가까운 점들을 선으로 연결할지 설정합니다. */
  showLines?: boolean;
  /** 연결선의 6자리 HEX 색상입니다. 예: #ffffff. */
  lineColor?: string;
  /** 연결선 불투명도의 상한(0~1)입니다. 점 사이 거리가 멀수록 투명해집니다. */
  lineOpacity?: number;
  /** 캔버스와 콘텐츠를 감싸는 컨테이너의 CSS 클래스입니다. 높이를 확보하세요. */
  className?: string;
  /** 점 그리드 위에 표시할 콘텐츠입니다. 이 콘텐츠 영역은 마우스 이벤트를 통과시킵니다. */
  children?: React.ReactNode;
}

export default function DotGridBG({
  dotSize = 1,
  dotColor = "#ffffff",
  dotSpacing = 30,
  interactionRadius = 120,
  maxDotScale = 3,
  showLines = true,
  lineColor = "#ffffff",
  lineOpacity = 0.15,
  className = "",
  children,
}: DotGridBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number>(0);

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const mouse = mouseRef.current;
    const dotRgb = hexToRgb(dotColor);
    const lineRgb = hexToRgb(lineColor);
    const radiusSq = interactionRadius * interactionRadius;

    ctx.clearRect(0, 0, width, height);

    // Collect active dots for line drawing
    const activeDots: { x: number; y: number; scale: number }[] = [];

    for (let x = dotSpacing; x < width; x += dotSpacing) {
      for (let y = dotSpacing; y < height; y += dotSpacing) {
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;

        let scale = 1;
        let alpha = 0.3;

        if (mouse.active && distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / interactionRadius;
          scale = 1 + (maxDotScale - 1) * t;
          alpha = 0.3 + 0.7 * t;
          activeDots.push({ x, y, scale });
        }

        ctx.beginPath();
        ctx.arc(x, y, dotSize * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb.r}, ${dotRgb.g}, ${dotRgb.b}, ${alpha})`;
        ctx.fill();
      }
    }

    // Draw lines between nearby active dots
    if (showLines && activeDots.length > 1) {
      const maxLineDist = dotSpacing * 2;
      const maxLineDistSq = maxLineDist * maxLineDist;

      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const a = activeDots[i];
          const b = activeDots[j];
          const ldx = a.x - b.x;
          const ldy = a.y - b.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < maxLineDistSq) {
            const ldist = Math.sqrt(ldistSq);
            const lineAlpha = lineOpacity * (1 - ldist / maxLineDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
  }, [
    dotSize,
    dotColor,
    dotSpacing,
    interactionRadius,
    maxDotScale,
    showLines,
    lineColor,
    lineOpacity,
    hexToRgb,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" style={{ display: "block" }} />
      {children && <div className="relative z-10 pointer-events-none">{children}</div>}
    </div>
  );
}
