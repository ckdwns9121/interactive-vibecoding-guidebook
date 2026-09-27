"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { CardItem } from "@/types/card";
import Image from "next/image";

interface HorizontalScrollPortfolioCardsProps {
  /** 표시할 카드 배열입니다. 각 항목에 id, title, description, image를 지정합니다. */
  cards: CardItem[];
  /** 전체 스크롤 구간을 감싸는 바깥 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
}

/**
 * HorizontalScrollPortfolioCards
 * 세로 스크롤에 따라 포트폴리오 카드들이 가로로 스크롤되는 인터랙션 컴포넌트
 * - 스티키 섹션에서 세로 스크롤을 가로 이동으로 변환
 * - 가로 스크롤바는 숨김 처리
 * - 마지막 카드 도달 시 다음 섹션으로 자연스러운 전환
 * - 반응형 디자인 지원
 */
export default function HorizontalScrollPortfolioCards({
  cards,
  className = "",
}: HorizontalScrollPortfolioCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [cards]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 실제 트랙 길이를 사용해 마지막 카드까지 이동합니다.
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  useMotionValueEvent(scrollYProgress, "change", (value) => setProgress(Math.round(value * 100)));

  // 배경 dot 입체감 효과
  const dotScale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 고정된 스크롤 섹션 - 높이를 길게 설정하여 스크롤 공간 확보 */}
      <div className="h-[500vh] relative">
        <div
          ref={viewportRef}
          className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
        >
          {/* 배경 dot 패턴 */}
          <motion.div
            style={{
              scale: dotScale,
              opacity: dotOpacity,
              backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              backgroundPosition: "0 0",
            }}
            className="absolute inset-0 pointer-events-none"
          />

          {/* 가로 스크롤되는 카드 컨테이너 */}
          <div className="w-full h-full flex items-center justify-start overflow-hidden">
            <motion.div ref={trackRef} style={{ x }} className="flex items-center h-full w-max shrink-0">
              <div className="flex items-center gap-8 md:gap-12 pl-8 md:pl-16 pr-8 md:pr-16">
                {/* 제목 섹션 - 카드 왼쪽에 배치 */}
                <div className="flex-shrink-0 w-80 md:w-96 h-96 flex flex-col justify-center text-left">
                  <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-4 text-gray-900"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    PORTFOLIO
                    <span className="text-indigo-600">.</span>
                  </motion.h2>
                  <motion.p
                    className="text-lg max-w-md text-gray-600"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    스크롤하여 포트폴리오를 확인해보세요
                  </motion.p>

                  {/* 스크롤 진행 표시 */}
                  <div className="mt-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">진행률</span>
                      <span className="text-sm font-bold text-indigo-600">{progress}%</span>
                    </div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo-600 rounded-full origin-left"
                        style={{ scaleX: scrollYProgress }}
                      />
                    </div>
                  </div>
                </div>

                {/* 포트폴리오 카드들 */}
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="flex-shrink-0 w-80 md:w-96 h-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    {/* 카드 이미지 */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 768px) 384px, 320px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="text-xs font-bold text-white bg-indigo-600 px-2 py-1 rounded-full">
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* 카드 내용 */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{card.description}</p>

                      {/* 진행 표시 점들 */}
                      <div className="flex items-center gap-1 pt-2">
                        {cards.map((_, cardIndex) => (
                          <div
                            key={cardIndex}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              cardIndex <= index ? "bg-indigo-600 w-6" : "bg-gray-200 w-2"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* 마지막 완료 카드 */}
                <motion.div
                  className="flex-shrink-0 w-80 md:w-96 h-96 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">포트폴리오 완료</h3>
                    <p className="text-white/90 leading-relaxed">
                      모든 프로젝트를 확인하셨습니다. 더 자세한 내용이 궁금하시면 연락해주세요.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
