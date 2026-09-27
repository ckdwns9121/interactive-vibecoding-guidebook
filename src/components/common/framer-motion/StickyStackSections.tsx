"use client";

import React from "react";
import { motion } from "framer-motion";
import { StickyStackSectionsProps } from "@/types/section";

export const StickyStackSections: React.FC<StickyStackSectionsProps> = ({ sections, className = "" }) => {
  return (
    <div className={`${className} relative`} style={{ height: `${sections.length * 100}vh` }}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="sticky top-0 h-screen"
          style={{
            zIndex: index + 1, // 나중 섹션이 앞에 오도록
          }}
        >
          <motion.section
            className="h-full flex items-center justify-center overflow-hidden relative"
            style={{
              background: section.backgroundColor,
            }}
            initial={{ scale: 1 }}
            whileInView={{
              scale: index === 0 ? 1 : [0.98, 1],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* 그라데이션 오버레이 효과 */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)",
              }}
            />

            {/* 스택 효과를 위한 이전 섹션들의 그림자 */}
            {index > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)`,
                  zIndex: -1,
                }}
              />
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <motion.h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                  style={{ color: section.textColor || "#ffffff" }}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {section.title}
                </motion.h2>

                <motion.p
                  className="text-xl sm:text-2xl lg:text-3xl mb-8 leading-relaxed max-w-3xl mx-auto"
                  style={{ color: section.textColor || "#ffffff", opacity: 0.9 }}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {section.description}
                </motion.p>

                {section.content && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {section.content}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* 섹션 번호 인디케이터 */}
            <motion.div
              className="absolute bottom-8 right-8 text-2xl font-bold z-10"
              style={{ color: section.textColor || "#ffffff", opacity: 0.5 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>

            {/* 스크롤 힌트 (첫 번째 섹션에서만 표시) */}
            {index === 0 && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div
                  className="w-6 h-10 border-2 rounded-full flex justify-center"
                  style={{ borderColor: section.textColor || "#ffffff" }}
                >
                  <motion.div
                    className="w-1 h-3 rounded-full mt-2"
                    style={{ backgroundColor: section.textColor || "#ffffff" }}
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}
          </motion.section>
        </div>
      ))}
    </div>
  );
};
