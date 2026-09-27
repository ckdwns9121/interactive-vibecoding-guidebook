"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import PaintFillText from "@/components/common/framer-motion/typography/paint-fill-text/PaintFillText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { PAINT_FILL_TEXT_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function PaintFillTextPage() {
  const [text, setText] = useState(PAINT_FILL_TEXT_DEFAULTS.text);
  const [duration, setDuration] = useState(PAINT_FILL_TEXT_DEFAULTS.duration);
  const [delay, setDelay] = useState(PAINT_FILL_TEXT_DEFAULTS.delay);
  const [textColor, setTextColor] = useState(PAINT_FILL_TEXT_DEFAULTS.textColor);
  const [fontSize, setFontSize] = useState(PAINT_FILL_TEXT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(PAINT_FILL_TEXT_DEFAULTS.fontWeight);
  const [trackingTight, setTrackingTight] = useState(PAINT_FILL_TEXT_DEFAULTS.trackingTight);
  const [leadingNone, setLeadingNone] = useState(PAINT_FILL_TEXT_DEFAULTS.leadingNone);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ControlField label="Text" description="표시할 텍스트">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="Paint Fill Text"
          />
        </ControlField>
        <RangeWithNumber
          label="Duration"
          description="애니메이션 지속 시간 (초)"
          value={duration}
          onChange={setDuration}
          min={0.5}
          max={5}
          step={0.1}
        />
        <RangeWithNumber
          label="Delay"
          description="애니메이션 시작 지연 시간 (초)"
          value={delay}
          onChange={setDelay}
          min={0}
          max={3}
          step={0.1}
        />
        {/* rgba 값 처리 때문에 ColorField 대신 인라인 유지 */}
        <ControlField label="Text Color" description="채워질 텍스트 색상">
          <div className="flex items-center space-x-3 mb-2">
            <input
              type="color"
              value={textColor.includes("rgba") ? "#ffffff" : textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="rgba(255, 255, 255, 1)"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setTextColor(preset.value)}
                className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: preset.value }}
                title={preset.label}
              />
            ))}
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
        <div className="md:col-span-2 lg:col-span-3">
          <ControlField label="Typography Options" description="텍스트 스타일 옵션">
            <div className="flex items-center space-x-6">
              <CheckboxField label="Tracking Tight" checked={trackingTight} onChange={setTrackingTight} />
              <CheckboxField label="Leading None" checked={leadingNone} onChange={setLeadingNone} />
            </div>
          </ControlField>
        </div>
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setText(PAINT_FILL_TEXT_DEFAULTS.text);
            setDuration(PAINT_FILL_TEXT_DEFAULTS.duration);
            setDelay(PAINT_FILL_TEXT_DEFAULTS.delay);
            setTextColor(PAINT_FILL_TEXT_DEFAULTS.textColor);
            setFontSize(PAINT_FILL_TEXT_DEFAULTS.fontSize);
            setFontWeight(PAINT_FILL_TEXT_DEFAULTS.fontWeight);
            setTrackingTight(PAINT_FILL_TEXT_DEFAULTS.trackingTight);
            setLeadingNone(PAINT_FILL_TEXT_DEFAULTS.leadingNone);
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
      title="Paint Fill Text."
      description="텍스트가 물감이 채워지는 듯한 애니메이션 효과를 적용하여 위에서 아래로 색상이 채워지는 시각적 효과를 구현합니다."
      preview={
        <div className="flex items-center justify-center min-h-[200px] p-8 md:p-16">
          <PaintFillText
            key={`${text}-${duration}-${delay}-${textColor}-${fontSize}-${fontWeight}-${trackingTight}-${leadingNone}`}
            text={text}
            duration={duration}
            delay={delay}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            trackingTight={trackingTight}
            leadingNone={leadingNone}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "flex items-center justify-center min-h-[200px] p-8 md:p-16" }, [
          usageElement("PaintFillText", {
            text: text,
            duration: duration,
            delay: delay,
            textColor: textColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            trackingTight: trackingTight,
            leadingNone: leadingNone,
          }),
        ]),
        [
          'import PaintFillText from "@/components/common/framer-motion/typography/paint-fill-text/PaintFillText";',
        ],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "컴포넌트가 마운트되거나 애니메이션이 시작될 때",
        what: "텍스트를",
        how: "CSS clip-path와 background-clip을 활용하여 물감이 채워지는 듯한 애니메이션으로 표현하고, 외곽선과 채워진 텍스트를 겹쳐서 입체감 구현",
      }}
      prompt="PaintFillText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 물감이 채워지는 듯한 애니메이션 효과를 보여줍니다. text prop으로 표시할 텍스트를, duration prop으로 애니메이션 지속시간을, delay prop으로 시작 지연시간을, textColor prop으로 채워질 색상을, fontSize prop으로 텍스트 크기를, fontWeight prop으로 글꼴 두께를 설정할 수 있게 해주세요. CSS 모듈을 사용하여 clip-path와 background-clip을 활용한 물감 채우기 애니메이션을 구현하고, 외곽선 텍스트와 채워진 텍스트를 겹쳐서 입체감을 표현해주세요. trackingTight와 leadingNone 옵션으로 텍스트 스타일을 조정할 수 있게 해주세요."
    />
  );
}
