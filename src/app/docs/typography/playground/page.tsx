"use client";

import { useMemo, useState } from "react";
import ComponentDocPage from "@/app/docs/components/ComponentDocPage";
import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";

export default function TypographyAnimationPage() {
  const [text, setText] = useState("Create.\nExplore.\nInspire.");
  const [morphTime, setMorphTime] = useState(1);
  const [cooldownTime, setCooldownTime] = useState(0.8);
  const [color, setColor] = useState("#c4b5fd");
  const texts = useMemo(
    () =>
      text
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    [text],
  );
  const safeTexts = texts.length ? texts : ["Create."];

  return (
    <ComponentDocPage
      title="Typography Playground"
      description="단어가 흐려졌다가 다음 단어로 합쳐지는 모핑 효과입니다. 한 줄에 단어 하나씩 입력하고 전환 속도와 대기 시간을 조절해 보세요."
      preview={
        <div className="flex min-h-72 w-full items-center justify-center overflow-hidden px-4">
          <MorphingText
            texts={safeTexts}
            morphTime={morphTime}
            cooldownTime={cooldownTime}
            color={color}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          />
        </div>
      }
      usage={`import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";

export default function Example() {
  return (
    <MorphingText
      texts={${JSON.stringify(safeTexts)}}
      morphTime={${morphTime}}
      cooldownTime={${cooldownTime}}
      color="${color}"
      className="text-4xl font-bold sm:text-6xl"
    />
  );
}`}
      controls={
        <>
          <TextAreaField
            label="단어 목록"
            description="줄바꿈으로 구분합니다."
            value={text}
            onChange={setText}
          />
          <RangeWithNumber
            label="전환 시간 (초)"
            value={morphTime}
            onChange={setMorphTime}
            min={0.2}
            max={3}
            step={0.1}
          />
          <RangeWithNumber
            label="대기 시간 (초)"
            value={cooldownTime}
            onChange={setCooldownTime}
            min={0.1}
            max={3}
            step={0.1}
          />
          <ColorField label="텍스트 색상" value={color} onChange={setColor} />
        </>
      }
      idea={{
        when: "짧은 키워드 여러 개를 하나의 헤드라인에서 순환시킬 때",
        what: "두 텍스트를 겹쳐 블러와 SVG 필터로 모핑합니다.",
        how: "MorphingText에 texts 배열을 전달하고 morphTime과 cooldownTime으로 읽는 속도를 맞춥니다.",
      }}
      prompt="React로 단어 목록을 순환하는 모핑 텍스트를 만들어줘. 두 텍스트를 겹치고 블러와 SVG 임계값 필터로 변형하며 전환 시간, 대기 시간, 색상을 조절할 수 있게 해줘. 컴포넌트를 제거할 때 애니메이션 프레임을 정리해줘."
    />
  );
}
