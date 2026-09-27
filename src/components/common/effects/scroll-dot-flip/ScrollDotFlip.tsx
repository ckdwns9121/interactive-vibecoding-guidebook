"use client";

import { useEffect, useRef, useState } from "react";
import { coverCrop, createTileOrder, tileProgress } from "./tiles";

interface ScrollDotFlipProps {
  /** 변환할 사진 URL입니다. 다른 도메인의 이미지는 Canvas 읽기를 허용하는 CORS 설정이 필요합니다. */
  src: string;
  /** 사진을 설명하는 접근성 대체 텍스트입니다. */
  alt: string;
  /** 가로 타일 개수입니다. 8~72로 제한하며 값이 클수록 촘촘한 도트 사진이 됩니다. */
  columns?: number;
  /** 사진 영역의 가로/세로 비율입니다. 원본은 중앙을 기준으로 cover 크롭합니다. */
  aspectRatio?: number;
  /** 각 타일이 뒤집히고 점으로 변하는 시간(초)입니다. */
  duration?: number;
  /** 첫 타일부터 마지막 타일까지 랜덤하게 출발하는 시간 간격의 전체 범위(초)입니다. */
  stagger?: number;
  /** 각 셀에 대한 최종 점의 지름 비율입니다. 0.2~1 사이로 설정합니다. */
  dotSize?: number;
  /** 점 사이와 뒤집히는 타일 아래에 보이는 CSS 배경색입니다. */
  backgroundColor?: string;
  /** 화면 하단에서 이 비율만큼 올라오면 시작합니다. 0~0.4 사이로 설정합니다. */
  triggerOffset?: number;
  /** true면 한 번만 전환합니다. false면 영역을 벗어났다가 다시 들어올 때 원본부터 재생합니다. */
  once?: boolean;
  /** 타일 순서와 회전 방향을 결정하는 정수 시드입니다. */
  seed?: number;
  /** 이미지 영역에 추가할 CSS 클래스입니다. */
  className?: string;
}

type Phase = "loading" | "photo" | "flipping" | "dots" | "fallback";

export default function ScrollDotFlip({
  src,
  alt,
  columns = 36,
  aspectRatio = 1.5,
  duration = 0.9,
  stagger = 2.2,
  dotSize = 0.76,
  backgroundColor = "#15140e",
  triggerOffset = 0.12,
  once = true,
  seed = 17,
  className = "",
}: ScrollDotFlipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const ratio = Number.isFinite(aspectRatio) ? Math.max(0.5, Math.min(3, aspectRatio)) : 1.5;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;
    setPhase("loading");
    const cols = Number.isFinite(columns) ? Math.round(Math.max(8, Math.min(72, columns))) : 36;
    const rows = Math.max(1, Math.round(cols / ratio));
    const count = cols * rows;
    const ranks = createTileOrder(count, seed);
    const flipMs = (Number.isFinite(duration) ? Math.max(0.1, duration) : 0.9) * 1000;
    const scatterMs = (Number.isFinite(stagger) ? Math.max(0, stagger) : 2.2) * 1000;
    const diameter = Number.isFinite(dotSize) ? Math.max(0.2, Math.min(1, dotSize)) : 0.76;
    const offset = Number.isFinite(triggerOffset) ? Math.max(0, Math.min(0.4, triggerOffset)) : 0.12;
    const totalMs = flipMs + scatterMs;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const image = new Image();
    image.crossOrigin = "anonymous";
    let ready = false;
    let disposed = false;
    let near = false;
    let completed = false;
    let elapsed = 0;
    let previousTime: number | null = null;
    let frame: number | null = null;
    let width = 0;
    let height = 0;
    let colors: string[] = [];
    let crop = { x: 0, y: 0, width: 1, height: 1 };

    function draw() {
      if (!ready || !context || !width || !height) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
      if (elapsed === 0) {
        context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
        return;
      }
      const cellW = width / cols;
      const cellH = height / rows;
      for (let index = 0; index < count; index++) {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const progress = tileProgress(elapsed, ranks[index], count, flipMs, scatterMs);
        const turn = progress * progress * (3 - 2 * progress);
        const projection = Math.max(0.025, Math.abs(Math.cos(Math.PI * turn)));
        const lift = Math.sin(Math.PI * turn);
        const horizontal = (ranks[index] + index) % 2 === 0;
        context.save();
        context.translate((col + 0.5) * cellW, (row + 0.5) * cellH - lift * cellH * 0.1);
        context.scale(horizontal ? projection : 1, horizontal ? 1 : projection);
        if (turn < 0.5) {
          context.drawImage(
            image,
            crop.x + (col * crop.width) / cols,
            crop.y + (row * crop.height) / rows,
            crop.width / cols,
            crop.height / rows,
            -cellW / 2,
            -cellH / 2,
            cellW + 0.35,
            cellH + 0.35,
          );
          context.fillStyle = `rgba(0,0,0,${lift * 0.32})`;
          context.fillRect(-cellW / 2, -cellH / 2, cellW, cellH);
        } else {
          const morph = (turn - 0.5) * 2;
          const size = 1 - (1 - diameter) * morph;
          const tileW = cellW * size;
          const tileH = cellH * size;
          const radius = (Math.min(tileW, tileH) * morph) / 2;
          context.fillStyle = colors[index];
          context.beginPath();
          context.roundRect(-tileW / 2, -tileH / 2, tileW, tileH, radius);
          context.fill();
        }
        context.restore();
      }
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    }
    function tick(now: number) {
      if (disposed || !near || document.hidden) {
        stop();
        return;
      }
      if (previousTime !== null) elapsed = Math.min(totalMs, elapsed + now - previousTime);
      previousTime = now;
      draw();
      if (elapsed >= totalMs) {
        completed = true;
        setPhase("dots");
        stop();
      } else frame = requestAnimationFrame(tick);
    }
    function start() {
      if (!ready || !near || disposed || document.hidden || completed) return;
      if (motion.matches) {
        stop();
        elapsed = totalMs;
        completed = true;
        draw();
        setPhase("dots");
      } else if (frame === null) {
        setPhase("flipping");
        frame = requestAnimationFrame(tick);
      }
    }
    function resize() {
      width = container!.getBoundingClientRect().width;
      height = width / ratio;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();
    // Pixel margins ensure the trigger is relative to viewport height, even on wide screens.
    let observer: IntersectionObserver;
    function observe() {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          near = entry.isIntersecting;
          if (near) start();
          else {
            stop();
            if (!once && ready) {
              elapsed = 0;
              completed = false;
              draw();
              setPhase("photo");
            }
          }
        },
        { rootMargin: `0px 0px -${Math.round(window.innerHeight * offset)}px 0px`, threshold: 0 },
      );
      observer.observe(container!);
    }
    observe();
    const visibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const motionChange = () => {
      if (motion.matches && ready && near) {
        completed = false;
        start();
      }
    };
    window.addEventListener("resize", observe);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", motionChange);

    image.onload = () => {
      if (disposed) return;
      try {
        crop = coverCrop(image.naturalWidth, image.naturalHeight, ratio);
        const sampler = document.createElement("canvas");
        sampler.width = cols;
        sampler.height = rows;
        const sampleContext = sampler.getContext("2d", { willReadFrequently: true });
        if (!sampleContext) throw new Error("Canvas unavailable");
        sampleContext.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, cols, rows);
        const pixels = sampleContext.getImageData(0, 0, cols, rows).data;
        colors = Array.from(
          { length: count },
          (_, index) => `rgb(${pixels[index * 4]},${pixels[index * 4 + 1]},${pixels[index * 4 + 2]})`,
        );
        ready = true;
        setPhase("photo");
        resize();
        start();
      } catch {
        setPhase("fallback");
      }
    };
    image.onerror = () => {
      if (!disposed) setPhase("fallback");
    };
    image.src = src;
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", observe);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", motionChange);
      image.onload = null;
      image.onerror = null;
    };
  }, [src, columns, ratio, duration, stagger, dotSize, backgroundColor, triggerOffset, once, seed]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      data-dot-flip=""
      data-state={phase}
      className={className}
      style={{ position: "relative", width: "100%", aspectRatio: ratio, overflow: "hidden", backgroundColor }}
    >
      {/* The original remains visible if a remote image cannot be sampled because of CORS. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: phase === "loading" || phase === "fallback" ? 1 : 0,
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: phase === "loading" || phase === "fallback" ? 0 : 1,
        }}
      />
    </div>
  );
}
