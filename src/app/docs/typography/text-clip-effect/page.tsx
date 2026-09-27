"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";
import { useState } from "react";
import TextClipEffectItem from "@/components/common/framer-motion/typography/TextClipEffectItem";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";

const TEXT_CLIP_EFFECT_DEFAULTS = {
  items: [
    { main: "Hello", sub: "Hello" },
    { main: "javascript", sub: "javascript" },
    { main: "typescript", sub: "typescript" },
  ],
  clipColor: "#ff6b6b",
  fontSize: "text-4xl",
  fontWeight: "font-bold",
  showMarkers: false,
  startPosition: "top center",
  endPosition: "bottom center",
  scrubEffect: false,
};

const FONT_SIZE_OPTIONS = [
  { value: "text-2xl", label: "2XL" },
  { value: "text-3xl", label: "3XL" },
  { value: "text-4xl", label: "4XL" },
  { value: "text-5xl", label: "5XL" },
  { value: "text-6xl", label: "6XL" },
];

const FONT_WEIGHT_OPTIONS = [
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semibold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-black", label: "Black" },
];

const COLOR_PRESETS = [
  { value: "#ff6b6b", label: "Red" },
  { value: "#4ecdc4", label: "Teal" },
  { value: "#45b7d1", label: "Blue" },
  { value: "#96ceb4", label: "Green" },
  { value: "#ffeaa7", label: "Yellow" },
  { value: "#dfe6e9", label: "Gray" },
  { value: "#a29bfe", label: "Purple" },
  { value: "#fd79a8", label: "Pink" },
];

const SCROLL_TRIGGER_POSITIONS = [
  { value: "top bottom", label: "Top Bottom" },
  { value: "top center", label: "Top Center" },
  { value: "top top", label: "Top Top" },
  { value: "center bottom", label: "Center Bottom" },
  { value: "center center", label: "Center Center" },
  { value: "center top", label: "Center Top" },
];

const END_POSITIONS = [
  { value: "bottom bottom", label: "Bottom Bottom" },
  { value: "bottom center", label: "Bottom Center" },
  { value: "bottom top", label: "Bottom Top" },
  { value: "center bottom", label: "Center Bottom" },
  { value: "center center", label: "Center Center" },
  { value: "center top", label: "Center Top" },
];

// 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
const itemsToString = (items: typeof TEXT_CLIP_EFFECT_DEFAULTS.items) =>
  items.map((item) => `${item.main}|${item.sub}`).join("\n");

const stringToItems = (str: string) =>
  str
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [main, sub] = line.split("|");
      return { main: main || "", sub: sub || main || "" };
    });

export default function TextClipEffectPage() {
  const [items, setItems] = useState(TEXT_CLIP_EFFECT_DEFAULTS.items);
  const [clipColor, setClipColor] = useState(TEXT_CLIP_EFFECT_DEFAULTS.clipColor);
  const [fontSize, setFontSize] = useState(TEXT_CLIP_EFFECT_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(TEXT_CLIP_EFFECT_DEFAULTS.fontWeight);
  const [showMarkers, setShowMarkers] = useState(TEXT_CLIP_EFFECT_DEFAULTS.showMarkers);
  const [startPosition, setStartPosition] = useState(TEXT_CLIP_EFFECT_DEFAULTS.startPosition);
  const [endPosition, setEndPosition] = useState(TEXT_CLIP_EFFECT_DEFAULTS.endPosition);
  const [scrubEffect, setScrubEffect] = useState(TEXT_CLIP_EFFECT_DEFAULTS.scrubEffect);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <TextAreaField
            label="Text Items"
            description="텍스트 항목들 (main|sub 형식으로 줄바꿈으로 구분)"
            value={itemsToString(items)}
            onChange={(value) => setItems(stringToItems(value))}
            rows={4}
            placeholder={"Hello|Hello\njavascript|javascript\ntypescript|typescript"}
          />
        </div>
        <ColorField
          label="Clip Color"
          description="클립 배경 색상"
          value={clipColor}
          onChange={setClipColor}
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
          label="Start Position"
          description="애니메이션 시작 위치"
          value={startPosition}
          onChange={setStartPosition}
          options={SCROLL_TRIGGER_POSITIONS}
        />
        <SelectField
          label="End Position"
          description="애니메이션 끝 위치"
          value={endPosition}
          onChange={setEndPosition}
          options={END_POSITIONS}
        />
        <ControlField label="Options" description="애니메이션 옵션">
          <div className="space-y-3">
            <CheckboxField label="Show Markers" checked={showMarkers} onChange={setShowMarkers} />
            <CheckboxField label="Scrub Effect" checked={scrubEffect} onChange={setScrubEffect} />
          </div>
        </ControlField>
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setItems(TEXT_CLIP_EFFECT_DEFAULTS.items);
            setClipColor(TEXT_CLIP_EFFECT_DEFAULTS.clipColor);
            setFontSize(TEXT_CLIP_EFFECT_DEFAULTS.fontSize);
            setFontWeight(TEXT_CLIP_EFFECT_DEFAULTS.fontWeight);
            setShowMarkers(TEXT_CLIP_EFFECT_DEFAULTS.showMarkers);
            setStartPosition(TEXT_CLIP_EFFECT_DEFAULTS.startPosition);
            setEndPosition(TEXT_CLIP_EFFECT_DEFAULTS.endPosition);
            setScrubEffect(TEXT_CLIP_EFFECT_DEFAULTS.scrubEffect);
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
      title="Text Clip."
      description="스크롤에 따라 텍스트가 클립되는 효과를 적용합니다. 스크롤 진행도에 따라 텍스트가 위에서 아래로 색상이 채워지는 시각적 효과를 구현하며, 메인 텍스트와 서브 텍스트 간의 전환 애니메이션을 제공합니다."
      preview={
        <div className="p-8 md:p-16 min-h-[60vh]">
          <div className={`flex flex-col gap-8 ${fontWeight}`}>
            {items.map((item, index) => (
              <TextClipEffectItem
                key={`${item.main}-${index}-${clipColor}-${showMarkers}-${startPosition}-${endPosition}-${scrubEffect}`}
                main={item.main}
                sub={item.sub}
                className={fontSize}
                clipColor={clipColor}
                showMarkers={showMarkers}
                startPosition={startPosition}
                endPosition={endPosition}
                scrubEffect={scrubEffect}
              />
            ))}
          </div>
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "p-8 md:p-16 min-h-[60vh]" }, [
          usageElement("div", { className: `flex flex-col gap-8 ${fontWeight}` }, [
            items.map((item) =>
              usageElement("TextClipEffectItem", {
                main: item.main,
                sub: item.sub,
                className: fontSize,
                clipColor: clipColor,
                showMarkers: showMarkers,
                startPosition: startPosition,
                endPosition: endPosition,
                scrubEffect: scrubEffect,
              }),
            ),
          ]),
        ]),
        ['import TextClipEffectItem from "@/components/common/framer-motion/typography/TextClipEffectItem";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 텍스트 영역을 스크롤할 때",
        what: "텍스트를",
        how: "스크롤 진행도에 따라 클립 마스크를 적용하여 위에서 아래로 색상이 채워지는 효과로 표현하고, 메인과 서브 텍스트 간의 부드러운 전환 애니메이션 구현",
      }}
      prompt="TextClipEffectItem 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 텍스트가 클립되는 효과를 보여줍니다. main과 sub prop으로 메인 텍스트와 서브 텍스트를, className prop으로 스타일링을, clipColor prop으로 클립 색상을 설정할 수 있게 해주세요. showMarkers prop으로 마커 표시 여부를, startPosition과 endPosition prop으로 애니메이션 시작/끝 위치를, scrubEffect prop으로 스크럽 효과를 설정할 수 있게 해주세요. framer-motion의 useScroll과 useTransform을 활용하여 스크롤 진행도를 감지하고, clipPath를 사용하여 텍스트 클립 효과를 구현해주세요. 메인 텍스트와 서브 텍스트 간의 opacity 전환 애니메이션도 추가해주세요."
    />
  );
}
