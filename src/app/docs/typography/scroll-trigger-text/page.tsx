"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";
import { useState } from "react";
import ScrollTriggerText from "@/components/common/framer-motion/typography/ScrollTriggerText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { SCROLL_TRIGGER_TEXT_DEFAULTS, FONT_SIZE_OPTIONS, COLOR_PRESETS } from "./constants";

export default function ScrollTriggerTextPage() {
  const [text, setText] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.text);
  const [fromColor, setFromColor] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.fromColor);
  const [toColor, setToColor] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.toColor);
  const [duration, setDuration] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.duration);
  const [fontSize, setFontSize] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.fontSize);
  const [initialScale, setInitialScale] = useState(SCROLL_TRIGGER_TEXT_DEFAULTS.initialScale);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <TextAreaField
            label="Text"
            description="표시할 텍스트"
            value={text}
            onChange={setText}
            rows={3}
            placeholder="텍스트를 입력하세요"
          />
        </div>
        <ColorField
          label="시작 색상"
          description="텍스트의 초기 색상"
          value={fromColor}
          onChange={setFromColor}
          presets={COLOR_PRESETS}
        />
        <ColorField
          label="끝 색상"
          description="스크롤 시 변할 색상"
          value={toColor}
          onChange={setToColor}
          presets={COLOR_PRESETS}
        />
        <RangeWithNumber
          label="애니메이션 시간"
          description="색상 변화 애니메이션 지속시간 (초)"
          value={duration}
          onChange={setDuration}
          min={0.1}
          max={3}
          step={0.1}
        />
        <SelectField
          label="폰트 크기"
          description="텍스트 크기"
          value={fontSize}
          onChange={setFontSize}
          options={FONT_SIZE_OPTIONS}
        />
        <RangeWithNumber
          label="초기 스케일"
          description="텍스트의 초기 크기 비율"
          value={initialScale}
          onChange={setInitialScale}
          min={0.1}
          max={1}
          step={0.1}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setText(SCROLL_TRIGGER_TEXT_DEFAULTS.text);
            setFromColor(SCROLL_TRIGGER_TEXT_DEFAULTS.fromColor);
            setToColor(SCROLL_TRIGGER_TEXT_DEFAULTS.toColor);
            setDuration(SCROLL_TRIGGER_TEXT_DEFAULTS.duration);
            setFontSize(SCROLL_TRIGGER_TEXT_DEFAULTS.fontSize);
            setInitialScale(SCROLL_TRIGGER_TEXT_DEFAULTS.initialScale);
          }}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          기본값으로 리셋
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-[200vh]">
      <ComponentDocPage
        title="Scroll Trigger Text."
        description="스크롤에 따라 텍스트의 각 글자가 순차적으로 색상과 크기가 변화하는 애니메이션 효과를 적용합니다."
        preview={
          <div className="min-h-[50vh] lg:min-h-[100vh]">
            <ScrollTriggerText
              key={`${text}-${fromColor}-${toColor}-${duration}-${fontSize}-${initialScale}`}
              text={text}
              fromColor={fromColor}
              toColor={toColor}
              duration={duration}
              fontSize={fontSize}
              initialScale={initialScale}
              className="font-bold"
            />
          </div>
        }
        usage={generateUsage(
          usageElement("div", { className: "min-h-[50vh] lg:min-h-[100vh]" }, [
            usageElement("ScrollTriggerText", {
              text: text,
              fromColor: fromColor,
              toColor: toColor,
              duration: duration,
              fontSize: fontSize,
              initialScale: initialScale,
              className: "font-bold",
            }),
          ]),
          ['import ScrollTriggerText from "@/components/common/framer-motion/typography/ScrollTriggerText";'],
        )}
        controlPanel={controlPanel}
        idea={{
          when: "사용자가 텍스트 영역을 스크롤할 때",
          what: "텍스트의 각 글자를",
          how: "순차적으로 색상 변화와 크기 변화 애니메이션으로 표현하여 스크롤 진행도에 따른 시각적 피드백 제공",
        }}
        prompt="ScrollTriggerText 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 텍스트의 각 글자가 순차적으로 색상과 크기가 변화하는 애니메이션을 보여줍니다. text prop으로 표시할 텍스트를, fromColor prop으로 초기 색상을, toColor prop으로 변화할 색상을, duration prop으로 애니메이션 지속시간을, fontSize prop으로 텍스트 크기를, initialScale prop으로 초기 크기 비율을 설정할 수 있게 해주세요. framer-motion의 useScroll과 useMotionValueEvent를 활용하여 스크롤 진행도를 감지하고, 각 글자별로 개별적인 애니메이션을 적용해주세요. 스크롤 진행도에 따라 opacity, scale, color가 순차적으로 변화하도록 구현해주세요."
      />
    </div>
  );
}
