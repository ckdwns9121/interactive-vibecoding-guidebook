"use client";
import React, { useRef, ReactNode } from "react";
import { useCursor } from "./CursorContext";

interface OverlayCursorProviderProps {
  /** 커서 모양을 바꿀 마우스 진입 영역의 콘텐츠입니다. 상위 CursorProvider와 GlobalCursor가 필요합니다. */
  children: ReactNode;
  /** 이 영역에 마우스를 올렸을 때 커서 안에 표시할 문자열입니다. */
  cursorText?: string;
  /** 이 영역에서 표시할 커서의 지름(px)입니다. */
  cursorSize?: number;
  /** 이 영역에서 표시할 커서의 CSS 배경색입니다. */
  cursorColor?: string;
  /** 마우스 진입·이탈을 감지하는 영역에 추가할 CSS 클래스입니다. */
  className?: string;
}

/**
 * OverlayCursorProvider
 * 특정 영역(children)에 마우스가 올라가면 핑크색 동그란 커서와 텍스트가 나타나는 컴포넌트입니다.
 * - cursorText: 커서 안에 들어갈 텍스트 (기본값: 'overlay')
 * - cursorSize: 커서 지름(px, 기본값: 80)
 * - cursorColor: 커서 배경색 (기본값: '#ff69b4')
 */
export default function OverlayCursorProvider({
  children,
  cursorText = "overlay",
  cursorSize = 80,
  cursorColor = "#ff69b4",
  className,
}: OverlayCursorProviderProps) {
  const { setCursor, resetCursor } = useCursor();
  const areaRef = useRef<HTMLDivElement>(null);

  // 커서 진입/이탈 핸들러
  const handleEnter = () => {
    setCursor({ cursorText, cursorSize, cursorColor });
  };
  const handleLeave = () => {
    resetCursor();
  };

  return (
    <div ref={areaRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  );
}
