"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import DissolveText from "@/components/common/framer-motion/typography/dissolve-text/DissolveText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { DISSOLVE_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function DissolveTextPage() {
  const [text, setText] = useState(DISSOLVE_DEFAULTS.text);
  const [baseFrequency, setBaseFrequency] = useState(DISSOLVE_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(DISSOLVE_DEFAULTS.numOctaves);
  const [duration, setDuration] = useState(DISSOLVE_DEFAULTS.duration);
  const [hoverTrigger, setHoverTrigger] = useState(DISSOLVE_DEFAULTS.hoverTrigger);
  const [color, setColor] = useState(DISSOLVE_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(DISSOLVE_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(DISSOLVE_DEFAULTS.fontWeight);
  const [manualProgress, setManualProgress] = useState(0);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ControlField label="Text" description="표시할 텍스트">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="DISSOLVE"
          />
        </ControlField>
        <RangeWithNumber
          label="Base Frequency"
          description="노이즈 주파수 (낮을수록 큰 덩어리)"
          value={baseFrequency}
          onChange={setBaseFrequency}
          min={0.005}
          max={0.15}
          step={0.005}
        />
        <RangeWithNumber
          label="Num Octaves"
          description="노이즈 디테일 (1~8)"
          value={numOctaves}
          onChange={setNumOctaves}
          min={1}
          max={8}
          step={1}
        />
        <RangeWithNumber
          label="Duration"
          description="디졸브 애니메이션 시간 (ms)"
          value={duration}
          onChange={setDuration}
          min={200}
          max={3000}
          step={100}
        />
        <ControlField label="Hover Trigger" description="호버 시 자동 디졸브">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setHoverTrigger(!hoverTrigger)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                hoverTrigger ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  hoverTrigger ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-300">{hoverTrigger ? "ON" : "OFF"}</span>
          </div>
        </ControlField>
        {!hoverTrigger && (
          <RangeWithNumber
            label="Progress"
            description="디졸브 진행도 (0~1)"
            value={manualProgress}
            onChange={setManualProgress}
            min={0}
            max={1}
            step={0.01}
          />
        )}
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
            setText(DISSOLVE_DEFAULTS.text);
            setBaseFrequency(DISSOLVE_DEFAULTS.baseFrequency);
            setNumOctaves(DISSOLVE_DEFAULTS.numOctaves);
            setDuration(DISSOLVE_DEFAULTS.duration);
            setHoverTrigger(DISSOLVE_DEFAULTS.hoverTrigger);
            setColor(DISSOLVE_DEFAULTS.color);
            setFontSize(DISSOLVE_DEFAULTS.fontSize);
            setFontWeight(DISSOLVE_DEFAULTS.fontWeight);
            setManualProgress(0);
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
      title="Dissolve Text."
      description="SVG feTurbulence와 feComponentTransfer 필터를 활용하여 텍스트가 먼지처럼 흩어지며 사라지는 디졸브 효과를 적용합니다. 텍스트 위에 마우스를 올려보세요."
      preview={
        <div className="h-48 flex items-center justify-center">
          <DissolveText
            key={`${text}-${baseFrequency}-${numOctaves}-${color}-${hoverTrigger}`}
            text={text}
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            duration={duration}
            hoverTrigger={hoverTrigger}
            progress={hoverTrigger ? undefined : manualProgress}
            color={color}
            className={`${fontSize} ${fontWeight}`}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "h-48 flex items-center justify-center" }, [
          usageElement("DissolveText", {
            text: text,
            baseFrequency: baseFrequency,
            numOctaves: numOctaves,
            duration: duration,
            hoverTrigger: hoverTrigger,
            progress: hoverTrigger ? undefined : manualProgress,
            color: color,
            className: `${fontSize} ${fontWeight}`,
          }),
        ]),
        [
          'import DissolveText from "@/components/common/framer-motion/typography/dissolve-text/DissolveText";',
        ],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 텍스트 위에 마우스를 올리거나, progress 값이 변경될 때",
        what: "텍스트의 각 픽셀 영역을",
        how: "SVG feTurbulence로 fractal noise 패턴을 생성하고, feComponentTransfer의 discrete threshold로 노이즈를 이진 마스크로 변환한 뒤, feComposite로 원본과 합성하여 점진적으로 흩어지는 효과를 표현",
      }}
      prompt="DissolveText 컴포넌트를 만들어주세요. SVG feTurbulence로 fractal noise를 생성하고, feComponentTransfer의 discrete 함수로 노이즈를 이진 마스크(threshold)로 변환합니다. feComposite의 'in' 연산자로 마스크와 원본 텍스트를 합성하여 노이즈 패턴에 따라 텍스트가 부분적으로 사라지는 효과를 만듭니다. threshold 값을 0→1로 변경하면 점점 더 많은 영역이 사라집니다. 호버 트리거와 외부 progress 제어를 모두 지원해주세요."
    />
  );
}
