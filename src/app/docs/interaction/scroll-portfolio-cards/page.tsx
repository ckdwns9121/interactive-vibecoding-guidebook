"use client";

import { useState } from "react";
import ComponentDocPage from "@/app/docs/components/ComponentDocPage";
import HorizontalScrollPortfolioCards from "@/components/common/framer-motion/HorizontalScrollPortfolioCards";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { sampleCards } from "@/data/sampleCards";

export default function ScrollPortfolioCardsPage() {
  const [count, setCount] = useState(3);
  const cards = sampleCards.slice(0, count);
  return (
    <ComponentDocPage
      title="Scroll Portfolio Cards"
      description="세로 스크롤을 가로 이동으로 바꿔 프로젝트 카드를 차례로 보여줍니다. 미리보기 영역을 따라 스크롤해 전체 카드를 살펴보세요."
      previewMode="scroll"
      preview={
        <div>
          <HorizontalScrollPortfolioCards cards={cards} />
          <section className="flex h-screen items-center justify-center bg-[#141418] text-white">
            <h2 className="text-4xl font-semibold">Keep creating.</h2>
          </section>
        </div>
      }
      usage={`import HorizontalScrollPortfolioCards from "@/components/common/framer-motion/HorizontalScrollPortfolioCards";

// image 경로는 프로젝트의 public 폴더에 있는 이미지로 바꿔주세요.
const cards = ${JSON.stringify(cards, null, 2)};

export default function Example() {
  return <HorizontalScrollPortfolioCards cards={cards} />;
}`}
      controls={<RangeWithNumber label="카드 수" min={2} max={5} value={count} onChange={setCount} />}
      idea={{
        when: "포트폴리오나 컬렉션을 한 흐름으로 소개할 때",
        what: "고정된 화면 안에서 카드가 가로로 이동합니다.",
        how: "cards에 id, title, description, image를 전달합니다. 로컬 이미지는 public 폴더에 배치하세요.",
      }}
      prompt="React와 Framer Motion으로 세로 스크롤에 따라 프로젝트 카드가 가로로 이동하는 포트폴리오 섹션을 만들어줘. 각 카드에는 이미지, 제목, 설명을 넣고 마지막 카드 이후에는 다음 섹션으로 이어지게 해줘."
    />
  );
}
