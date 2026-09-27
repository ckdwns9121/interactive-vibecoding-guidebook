"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import RevealText from "@/components/common/framer-motion/typography/reveal-text/RevealText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import {
  REVEAL_TEXT_DEFAULTS,
  DIRECTION_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  COLOR_PRESETS,
} from "./constants";

export default function RevealTextDocsPage() {
  const [text, setText] = useState(REVEAL_TEXT_DEFAULTS.text);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    REVEAL_TEXT_DEFAULTS.direction,
  );
  const [delay, setDelay] = useState(REVEAL_TEXT_DEFAULTS.delay);
  const [duration, setDuration] = useState(REVEAL_TEXT_DEFAULTS.duration);
  const [stagger, setStagger] = useState(REVEAL_TEXT_DEFAULTS.stagger);
  const [byWord, setByWord] = useState(REVEAL_TEXT_DEFAULTS.byWord);
  const [fontSize, setFontSize] = useState(REVEAL_TEXT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(REVEAL_TEXT_DEFAULTS.fontWeight);
  const [textColor, setTextColor] = useState(REVEAL_TEXT_DEFAULTS.textColor);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TextAreaField
          label="Text"
          description="텍스트를 입력하세요"
          value={text}
          onChange={setText}
          rows={3}
          placeholder="Reveal할 텍스트를 입력하세요"
        />
        <SelectField
          label="Direction"
          description="애니메이션 방향"
          value={direction}
          onChange={(value) => setDirection(value as "up" | "down" | "left" | "right")}
          options={DIRECTION_OPTIONS}
        />
        <RangeWithNumber
          label="Start Delay"
          description="애니메이션 시작 지연 시간 (초)"
          value={delay}
          onChange={setDelay}
          min={0}
          max={3}
          step={0.1}
        />
        <RangeWithNumber
          label="Duration"
          description="각 글자/단어 애니메이션 시간 (초)"
          value={duration}
          onChange={setDuration}
          min={0.1}
          max={2}
          step={0.1}
        />
        <RangeWithNumber
          label="Stagger"
          description="각 글자/단어 사이 간격 (초)"
          value={stagger}
          onChange={setStagger}
          min={0}
          max={0.3}
          step={0.01}
        />
        <ControlField label="Animation Unit" description="애니메이션 단위">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="byWord"
                checked={!byWord}
                onChange={() => setByWord(false)}
                className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
              />
              <span className="text-sm text-gray-200">글자 단위</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="byWord"
                checked={byWord}
                onChange={() => setByWord(true)}
                className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
              />
              <span className="text-sm text-gray-200">단어 단위</span>
            </label>
          </div>
        </ControlField>
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
        <SelectField
          label="Text Color"
          description="텍스트 색상"
          value={textColor}
          onChange={setTextColor}
          options={COLOR_PRESETS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setText(REVEAL_TEXT_DEFAULTS.text);
            setDirection(REVEAL_TEXT_DEFAULTS.direction);
            setDelay(REVEAL_TEXT_DEFAULTS.delay);
            setDuration(REVEAL_TEXT_DEFAULTS.duration);
            setStagger(REVEAL_TEXT_DEFAULTS.stagger);
            setByWord(REVEAL_TEXT_DEFAULTS.byWord);
            setFontSize(REVEAL_TEXT_DEFAULTS.fontSize);
            setFontWeight(REVEAL_TEXT_DEFAULTS.fontWeight);
            setTextColor(REVEAL_TEXT_DEFAULTS.textColor);
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
      title="Reveal Text."
      description="텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 등장 애니메이션 효과를 적용합니다."
      preview={
        <div className={`${fontSize} ${fontWeight} ${textColor}`}>
          <RevealText
            key={`${text}-${direction}-${delay}-${duration}-${stagger}-${byWord}`}
            text={text}
            direction={direction}
            delay={delay}
            duration={duration}
            stagger={stagger}
            byWord={byWord}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: `${fontSize} ${fontWeight} ${textColor}` }, [
          usageElement("RevealText", {
            text: text,
            direction: direction,
            delay: delay,
            duration: duration,
            stagger: stagger,
            byWord: byWord,
          }),
        ]),
        ['import RevealText from "@/components/common/framer-motion/typography/reveal-text/RevealText";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "컴포넌트가 마운트되거나 텍스트가 변경될 때",
        what: "텍스트의 각 글자나 단어를",
        how: "지정된 방향에서 순차적으로 나타나는 애니메이션으로 표현",
      }}
      prompt="RevealText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 한 글자씩 또는 한 단어씩 자연스럽게 나타나는 등장 애니메이션을 보여줍니다. text prop으로 등장할 텍스트를, direction prop으로 애니메이션 방향(up, down, left, right)을, delay prop으로 시작 지연 시간을, duration prop으로 각 글자/단어 애니메이션 시간을, stagger prop으로 글자/단어 사이 간격을, byWord prop으로 글자 단위 또는 단어 단위 애니메이션을 설정할 수 있게 해주세요. className과 style prop으로 추가 스타일링을 지원해주세요. framer-motion의 motion.span을 활용하여 구현해주세요."
    />
  );
}
