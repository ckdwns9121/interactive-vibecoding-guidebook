"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import { MagneticLetters } from "@/components/common/framer-motion/typography/MagneticLetters";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import {
  MAGNETIC_DEFAULTS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  SPACING_OPTIONS,
  COLOR_PRESETS,
} from "./constants";

export default function MagneticLettersPage() {
  const [text, setText] = useState(MAGNETIC_DEFAULTS.text);
  const [strength, setStrength] = useState(MAGNETIC_DEFAULTS.strength);
  const [threshold, setThreshold] = useState(MAGNETIC_DEFAULTS.threshold);
  const [stiffness, setStiffness] = useState(MAGNETIC_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(MAGNETIC_DEFAULTS.damping);
  const [textColor, setTextColor] = useState(MAGNETIC_DEFAULTS.textColor);
  const [fontSize, setFontSize] = useState(MAGNETIC_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MAGNETIC_DEFAULTS.fontWeight);
  const [spacing, setSpacing] = useState(MAGNETIC_DEFAULTS.spacing);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ControlField label="Text" description="마그네틱 효과를 적용할 텍스트">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="텍스트를 입력하세요"
          />
        </ControlField>
        <RangeWithNumber
          label="Strength"
          description="자석 끌림 강도"
          value={strength}
          onChange={setStrength}
          min={0}
          max={100}
        />
        <RangeWithNumber
          label="Threshold"
          description="영향 범위 배수"
          value={threshold}
          onChange={setThreshold}
          min={1}
          max={15}
          step={0.5}
        />
        <RangeWithNumber
          label="Stiffness"
          description="스프링 강성 (빠르기)"
          value={stiffness}
          onChange={setStiffness}
          min={50}
          max={1000}
        />
        <RangeWithNumber
          label="Damping"
          description="스프링 댐핑 (감속)"
          value={damping}
          onChange={setDamping}
          min={5}
          max={100}
        />
        <ColorField
          label="Text Color"
          description="텍스트 색상"
          value={textColor}
          onChange={setTextColor}
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
        <SelectField
          label="Letter Spacing"
          description="글자 간격"
          value={spacing}
          onChange={setSpacing}
          options={SPACING_OPTIONS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setText(MAGNETIC_DEFAULTS.text);
            setStrength(MAGNETIC_DEFAULTS.strength);
            setThreshold(MAGNETIC_DEFAULTS.threshold);
            setStiffness(MAGNETIC_DEFAULTS.stiffness);
            setDamping(MAGNETIC_DEFAULTS.damping);
            setTextColor(MAGNETIC_DEFAULTS.textColor);
            setFontSize(MAGNETIC_DEFAULTS.fontSize);
            setFontWeight(MAGNETIC_DEFAULTS.fontWeight);
            setSpacing(MAGNETIC_DEFAULTS.spacing);
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
      title="마그네틱 텍스트"
      description="마우스 커서에 반응하여 텍스트가 자석처럼 끌리는 효과를 적용합니다."
      preview={
        <div className="min-h-32 md:min-h-40 flex items-center justify-center">
          <MagneticLetters
            key={`${text}-${strength}-${threshold}-${stiffness}-${damping}-${textColor}`}
            text={text}
            strength={strength}
            threshold={threshold}
            stiffness={stiffness}
            damping={damping}
            textColor={textColor}
            className={`${fontSize} ${fontWeight} ${spacing}`}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "min-h-32 md:min-h-40 flex items-center justify-center" }, [
          usageElement("MagneticLetters", {
            text: text,
            strength: strength,
            threshold: threshold,
            stiffness: stiffness,
            damping: damping,
            textColor: textColor,
            className: `${fontSize} ${fontWeight} ${spacing}`,
          }),
        ]),
        ['import { MagneticLetters } from "@/components/common/framer-motion/typography/MagneticLetters";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "마우스가 텍스트 영역에 접근할 때",
        what: "텍스트의 각 글자를",
        how: "마우스 커서 위치에 따라 자석처럼 끌리는 애니메이션으로 표현",
      }}
      prompt="MagneticLetters 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서에 반응하여 텍스트가 자석처럼 끌리는 효과를 보여줍니다. text prop으로 마그네틱 효과를 적용할 텍스트를, strength prop으로 자석 끌림 강도를, threshold prop으로 영향 범위 배수를, stiffness와 damping prop으로 스프링 물리 속성을 설정할 수 있게 해주세요. textColor prop으로 텍스트 색상을, className prop으로 추가 스타일링을 지원해주세요. 각 글자가 개별적으로 마우스 위치에 반응하도록 구현해주세요."
    />
  );
}
