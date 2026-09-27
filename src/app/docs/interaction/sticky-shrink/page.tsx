"use client";

import { useState } from "react";
import ComponentDocPage from "@/app/docs/components/ComponentDocPage";
import StickyShrinkSection from "@/components/common/framer-motion/StickyShrinkSection";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";

export default function StickyShrinkSectionPage() {
  const [finalScale, setFinalScale] = useState(0.6);
  const [finalOpacity, setFinalOpacity] = useState(0.3);
  const [scrollRange, setScrollRange] = useState(200);

  return (
    <ComponentDocPage
      title="Sticky Shrink"
      description="스크롤에 맞춰 고정된 섹션이 작아지고 서서히 사라집니다. 미리보기 영역을 따라 스크롤해 다음 장면으로 전환해 보세요."
      previewMode="scroll"
      preview={
        <div className="bg-[#101014]">
          <StickyShrinkSection
            finalScale={finalScale}
            finalOpacity={finalOpacity}
            scrollRange={scrollRange}
            backgroundColor="#6554df"
          >
            <div className="px-8 text-center text-white">
              <p className="mb-5 text-sm uppercase tracking-[0.3em]">Scroll to explore</p>
              <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Make room
                <br />
                for what’s next.
              </h2>
            </div>
          </StickyShrinkSection>
          <section className="flex h-screen items-center justify-center p-8 text-center text-white">
            <div>
              <p className="mb-4 text-sm text-violet-300">NEXT CHAPTER</p>
              <h2 className="text-4xl font-semibold">다음 이야기의 시작.</h2>
            </div>
          </section>
        </div>
      }
      usage={`import StickyShrinkSection from "@/components/common/framer-motion/StickyShrinkSection";

export default function Example() {
  return (
    <>
      <StickyShrinkSection
        finalScale={${finalScale}}
        finalOpacity={${finalOpacity}}
        scrollRange={${scrollRange}}
        backgroundColor="#6554df"
      >
        <h2 className="text-5xl font-bold text-white">Make room for what’s next.</h2>
      </StickyShrinkSection>
      <section className="h-screen">다음 이야기</section>
    </>
  );
}`}
      controls={
        <>
          <RangeWithNumber
            label="최종 크기"
            min={0.2}
            max={1}
            step={0.05}
            value={finalScale}
            onChange={setFinalScale}
          />
          <RangeWithNumber
            label="최종 불투명도"
            min={0}
            max={1}
            step={0.05}
            value={finalOpacity}
            onChange={setFinalOpacity}
          />
          <RangeWithNumber
            label="스크롤 길이 (vh)"
            min={150}
            max={400}
            step={25}
            value={scrollRange}
            onChange={setScrollRange}
          />
        </>
      }
      idea={{
        when: "제품 소개의 첫 화면에서 다음 내용으로 시선을 넘길 때",
        what: "화면에 고정된 콘텐츠를 스크롤 진행률에 따라 축소합니다.",
        how: "StickyShrinkSection 다음에 이어질 섹션을 두고 scrollRange로 전환 길이를 조절합니다.",
      }}
      prompt="React와 Framer Motion으로 스크롤 중 고정된 히어로 섹션이 축소되고 투명해지는 전환을 만들어줘. 축소 비율과 불투명도, 스크롤 길이를 props로 받고 다음 섹션으로 자연스럽게 이어지게 해줘."
    />
  );
}
