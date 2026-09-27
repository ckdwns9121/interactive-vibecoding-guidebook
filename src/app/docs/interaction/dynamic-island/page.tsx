"use client";

import { useState } from "react";
import ComponentDocPage from "@/app/docs/components/ComponentDocPage";
import DynamicIsland from "@/components/common/framer-motion/DynamicIsland";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ColorField } from "@/components/common/docs-controls/ColorField";

const contentOptions = [
  { value: "music", label: "음악 재생", collapsed: "♫", expanded: "지금 재생 중 · Midnight City" },
  { value: "upload", label: "업로드 상태", collapsed: "↑", expanded: "프로젝트 파일을 업로드하고 있어요" },
  { value: "timer", label: "집중 타이머", collapsed: "25:00", expanded: "집중할 시간 · 25분" },
];

export default function DynamicIslandDocsPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("music");
  const [collapsedWidth, setCollapsedWidth] = useState(120);
  const [expandedWidth, setExpandedWidth] = useState(300);
  const [expandedHeight, setExpandedHeight] = useState(80);
  const [animationDuration, setAnimationDuration] = useState(0.6);
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(30);
  const [backgroundColor, setBackgroundColor] = useState("#19191f");
  const [expandedBackgroundColor, setExpandedBackgroundColor] = useState("#5141ad");
  const [clickToToggle, setClickToToggle] = useState(true);
  const [hoverToExpand, setHoverToExpand] = useState(false);
  const [autoCollapse, setAutoCollapse] = useState(false);
  const selected = contentOptions.find((option) => option.value === content)!;
  const props = {
    collapsedWidth,
    expandedWidth,
    expandedHeight,
    animationDuration,
    backgroundColor,
    expandedBackgroundColor,
    clickToToggle,
    hoverToExpand,
    autoCollapse,
  };

  return (
    <ComponentDocPage
      title="Dynamic Island"
      description="작은 상태 표시를 클릭하거나 호버하면 자세한 정보로 펼쳐집니다. 크기, 스프링 반응, 콘텐츠를 조절해 앱에 맞는 피드백을 만들어 보세요."
      preview={
        <div className="flex min-h-72 w-full flex-col items-center justify-center gap-8">
          <DynamicIsland
            {...props}
            isExpanded={isExpanded}
            onToggle={setIsExpanded}
            springConfig={{ stiffness, damping }}
            collapsedContent={<span>{selected.collapsed}</span>}
            expandedContent={<span className="text-center text-sm">{selected.expanded}</span>}
          />
          <button
            type="button"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "접기" : "펼치기"}
          </button>
        </div>
      }
      usage={`"use client";

import { useState } from "react";
import DynamicIsland from "@/components/common/framer-motion/DynamicIsland";

export default function Example() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <DynamicIsland
      isExpanded={isExpanded}
      onToggle={setIsExpanded}
${Object.entries(props)
  .map(([key, value]) => `      ${key}={${JSON.stringify(value)}}`)
  .join("\n")}
      springConfig={{ stiffness: ${stiffness}, damping: ${damping} }}
      collapsedContent={<span>${selected.collapsed}</span>}
      expandedContent={<span>${selected.expanded}</span>}
    />
  );
}`}
      controls={
        <>
          <SelectField label="콘텐츠" value={content} onChange={setContent} options={contentOptions} />
          <RangeWithNumber
            label="접힌 너비 (px)"
            value={collapsedWidth}
            onChange={setCollapsedWidth}
            min={80}
            max={200}
            step={10}
          />
          <RangeWithNumber
            label="펼친 너비 (px)"
            value={expandedWidth}
            onChange={setExpandedWidth}
            min={240}
            max={420}
            step={10}
          />
          <RangeWithNumber
            label="펼친 높이 (px)"
            value={expandedHeight}
            onChange={setExpandedHeight}
            min={60}
            max={150}
            step={10}
          />
          <RangeWithNumber
            label="콘텐츠 전환 (초)"
            value={animationDuration}
            onChange={setAnimationDuration}
            min={0.1}
            max={2}
            step={0.1}
          />
          <RangeWithNumber
            label="스프링 강도"
            value={stiffness}
            onChange={setStiffness}
            min={100}
            max={600}
            step={25}
          />
          <RangeWithNumber
            label="스프링 감쇠"
            value={damping}
            onChange={setDamping}
            min={10}
            max={60}
            step={5}
          />
          <ColorField label="접힌 배경색" value={backgroundColor} onChange={setBackgroundColor} />
          <ColorField
            label="펼친 배경색"
            value={expandedBackgroundColor}
            onChange={setExpandedBackgroundColor}
          />
          <CheckboxField label="클릭으로 전환" checked={clickToToggle} onChange={setClickToToggle} />
          <CheckboxField label="호버로 펼치기" checked={hoverToExpand} onChange={setHoverToExpand} />
          <CheckboxField label="3초 뒤 자동 접기" checked={autoCollapse} onChange={setAutoCollapse} />
        </>
      }
      idea={{
        when: "음악 재생, 업로드, 타이머처럼 진행 중인 상태를 보여줄 때",
        what: "작은 알림 영역을 펼쳐 추가 정보를 제공합니다.",
        how: "isExpanded와 onToggle로 상태를 연결하고 collapsedContent와 expandedContent를 각각 구성합니다.",
      }}
      prompt="React와 Framer Motion으로 작은 캡슐이 상세 상태 패널로 부드럽게 펼쳐지는 Dynamic Island를 만들어줘. 클릭, 호버, 자동 접기를 지원하고 외부에서 확장 상태를 제어할 수 있게 해줘."
    />
  );
}
