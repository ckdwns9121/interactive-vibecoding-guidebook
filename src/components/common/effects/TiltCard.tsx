"use client";
import { ReactNode, useRef, useState, useEffect, createContext, useContext } from "react";
import { motion, useSpring, MotionValue, useTransform } from "framer-motion";

interface TiltCardProps {
  /** 회전하는 카드 안에 표시할 React 콘텐츠입니다. */
  children: ReactNode;
  /** 원근감을 적용하는 바깥 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 카드 바깥 컨테이너의 너비·높이 등을 설정할 인라인 스타일입니다. */
  style?: React.CSSProperties;
  maxTilt?: number; // 최대 기울기 각도 (deg)
  parallaxFactor?: number; // parallax 깊이 기본값
}

// Parallax context: 자식에서 depth를 지정해 parallax 효과를 받을 수 있게 함
const ParallaxContext = createContext<{
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
  parallaxFactor: number;
} | null>(null);

export function useParallax(depth = 1) {
  const ctx = useContext(ParallaxContext);
  // 항상 useTransform을 호출해야 하므로, context가 없으면 0을 반환하는 motion value를 생성
  const dummy = useSpring(0);
  const x = useTransform(ctx ? ctx.tiltY : dummy, (v: number) => (ctx ? v * ctx.parallaxFactor * depth : 0));
  const y = useTransform(ctx ? ctx.tiltX : dummy, (v: number) => (ctx ? v * ctx.parallaxFactor * depth : 0));
  return { x, y };
}

/**
 * TiltCard
 * - 마우스 위치에 따라 3D tilt + 내부 요소 parallax depth 효과
 * - 모바일에서는 효과 비활성화
 * - 자식에서 useParallax(depth)로 개별 parallax 적용 가능
 */
export default function TiltCard({
  children,
  className,
  style,
  maxTilt = 18,
  parallaxFactor = 0.25,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // tilt 각도 (framer-motion spring)
  const tiltX = useSpring(0, { stiffness: 180, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 18 });

  // 모바일 감지
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 마우스 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 2 - 1; // -1 ~ 1
    const percentY = (y / rect.height) * 2 - 1; // -1 ~ 1
    tiltY.set(percentX * maxTilt);
    tiltX.set(-percentY * maxTilt);
  };
  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <ParallaxContext.Provider value={{ tiltX, tiltY, parallaxFactor }}>
      <motion.div
        ref={ref}
        className={`${className} perspective-[1000px] preserve-3d`}
        style={style}
        animate={isMobile ? { rotateX: 0, rotateY: 0 } : undefined}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
          }}
          className={`will-change-transform rounded-2xl bg-white transition-shadow duration-200 ${
            isMobile ? "shadow-md" : "shadow-2xl"
          }`}
        >
          {children}
        </motion.div>
      </motion.div>
    </ParallaxContext.Provider>
  );
}
