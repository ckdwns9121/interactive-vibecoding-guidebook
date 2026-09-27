"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { MORPHING_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

// 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
const textsToString = (texts: string[]) => texts.join("\n");
const stringToTexts = (str: string) => str.split("\n").filter((text) => text.trim() !== "");

export default function MorphingTextPage() {
  const [texts, setTexts] = useState(MORPHING_DEFAULTS.texts);
  const [morphTime, setMorphTime] = useState(MORPHING_DEFAULTS.morphTime);
  const [cooldownTime, setCooldownTime] = useState(MORPHING_DEFAULTS.cooldownTime);
  const [color, setColor] = useState(MORPHING_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(MORPHING_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MORPHING_DEFAULTS.fontWeight);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TextAreaField
          label="Texts"
          description="Morphing할 텍스트들 (줄바꿈으로 구분)"
          value={textsToString(texts)}
          onChange={(value) => setTexts(stringToTexts(value))}
          rows={4}
          placeholder="각 줄에 하나씩 텍스트를 입력하세요"
        />
        <RangeWithNumber
          label="Morph Time"
          description="변형 애니메이션 시간 (초)"
          value={morphTime}
          onChange={setMorphTime}
          min={0.3}
          max={3}
          step={0.1}
        />
        <RangeWithNumber
          label="Cooldown Time"
          description="다음 변형까지 대기 시간 (초)"
          value={cooldownTime}
          onChange={setCooldownTime}
          min={0.1}
          max={3}
          step={0.1}
        />
        <ColorField
          label="Text Color"
          description="텍스트 색상"
          value={color}
          onChange={setColor}
          presets={COLOR_PRESETS}
        />
        <SelectField
          label="Font Size"
          description="텍스트 크기"
          value={fontSize}
          onChange={setFontSize}
          options={FONT_SIZE_OPTIONS}
        />
        <SelectField
          label="Font Weight"
          description="글꼴 두께"
          value={fontWeight}
          onChange={setFontWeight}
          options={FONT_WEIGHT_OPTIONS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setTexts(MORPHING_DEFAULTS.texts);
            setMorphTime(MORPHING_DEFAULTS.morphTime);
            setCooldownTime(MORPHING_DEFAULTS.cooldownTime);
            setColor(MORPHING_DEFAULTS.color);
            setFontSize(MORPHING_DEFAULTS.fontSize);
            setFontWeight(MORPHING_DEFAULTS.fontWeight);
          }}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          기본값으로 리셋
        </button>
      </div>
    </>
  );

  return (
    <ComponentDocPage
      title="Morphing Text."
      description="텍스트가 자연스럽게 변형되면서 다른 텍스트로 모핑되는 애니메이션 효과를 적용합니다."
      preview={
        <div className="h-48 flex items-center justify-center">
          <MorphingText
            key={`${texts.join("-")}-${morphTime}-${cooldownTime}-${color}`}
            texts={texts}
            morphTime={morphTime}
            cooldownTime={cooldownTime}
            color={color}
            className={`${fontSize} ${fontWeight}`}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "h-48 flex items-center justify-center" }, [
          usageElement("MorphingText", {
            texts: texts,
            morphTime: morphTime,
            cooldownTime: cooldownTime,
            color: color,
            className: `${fontSize} ${fontWeight}`,
          }),
        ]),
        [
          'import MorphingText from "@/components/common/framer-motion/typography/morphing-text/MorphingText";',
        ],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "컴포넌트가 마운트되거나 텍스트 배열이 변경될 때",
        what: "텍스트 배열의 각 요소를",
        how: "blur와 threshold SVG 필터를 사용하여 자연스럽게 변형되는 모핑 애니메이션으로 표현",
      }}
      prompt="MorphingText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 자연스럽게 변형되면서 다른 텍스트로 모핑되는 애니메이션을 보여줍니다. texts prop으로 모핑할 텍스트 배열을, morphTime prop으로 변형 애니메이션 시간을, cooldownTime prop으로 다음 변형까지 대기 시간을, color prop으로 텍스트 색상을 설정할 수 있게 해주세요. 두 개의 텍스트를 겹쳐서 blur와 threshold SVG 필터를 사용하여 모핑 효과를 구현해주세요. requestAnimationFrame을 활용하여 부드러운 애니메이션을 구현해주세요."
    />
  );
}
