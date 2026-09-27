"use client";

import { useState } from "react";
import ComponentDocPage from "@/app/docs/components/ComponentDocPage";
import { StickyStackSections } from "@/components/common/framer-motion/StickyStackSections";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";

const examples = [
  {
    id: "discover",
    title: "Discover.",
    description: "작은 아이디어에서 시작합니다.",
    backgroundColor: "#5b4bcb",
    textColor: "#ffffff",
  },
  {
    id: "create",
    title: "Create.",
    description: "스크롤하며 다음 장면을 만나세요.",
    backgroundColor: "#be5168",
    textColor: "#ffffff",
  },
  {
    id: "refine",
    title: "Refine.",
    description: "겹쳐지는 장면으로 흐름을 만듭니다.",
    backgroundColor: "#246b65",
    textColor: "#ffffff",
  },
  {
    id: "ship",
    title: "Ship.",
    description: "이제 세상에 보여줄 시간입니다.",
    backgroundColor: "#dedad0",
    textColor: "#202020",
  },
];

export default function StickyStackSectionsPage() {
  const [count, setCount] = useState(3);
  const sections = examples.slice(0, count);

  return (
    <ComponentDocPage
      title="Sticky Stack"
      description="화면 크기의 장면을 차례로 쌓아 이야기의 흐름을 만듭니다. 미리보기 영역을 따라 아래로 스크롤해 전환을 확인하세요."
      previewMode="scroll"
      preview={<StickyStackSections sections={sections} />}
      usage={`import { StickyStackSections } from "@/components/common/framer-motion/StickyStackSections";

const sections = ${JSON.stringify(sections, null, 2)};

export default function Example() {
  return <StickyStackSections sections={sections} />;
}`}
      controls={<RangeWithNumber label="섹션 수" min={2} max={4} value={count} onChange={setCount} />}
      idea={{
        when: "브랜드 스토리나 프로젝트의 단계를 한 장면씩 보여줄 때",
        what: "각 섹션을 고정하고 다음 섹션이 앞에 쌓이도록 구성합니다.",
        how: "sections 배열에 고유 id, 제목, 설명, 배경색을 넣습니다. content로 추가 콘텐츠를 넣을 수 있습니다.",
      }}
      prompt="React에서 화면 높이의 섹션들이 스크롤에 따라 차례로 쌓이는 스토리텔링 화면을 만들어줘. 섹션 배열로 제목, 설명, 배경색을 받고 sticky 배치와 부드러운 진입 애니메이션을 적용해줘."
    />
  );
}
