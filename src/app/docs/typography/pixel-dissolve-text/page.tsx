"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import PixelDissolveText from "@/components/common/framer-motion/typography/pixel-dissolve-text/PixelDissolveText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { PIXEL_DISSOLVE_DEFAULTS, FONT_SIZE_OPTIONS, FONT_WEIGHT_OPTIONS, COLOR_PRESETS } from "./constants";

export default function PixelDissolveTextPage() {
  const [text, setText] = useState(PIXEL_DISSOLVE_DEFAULTS.text);
  const [pixelSize, setPixelSize] = useState(PIXEL_DISSOLVE_DEFAULTS.pixelSize);
  const [baseFrequency, setBaseFrequency] = useState(PIXEL_DISSOLVE_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(PIXEL_DISSOLVE_DEFAULTS.numOctaves);
  const [duration, setDuration] = useState(PIXEL_DISSOLVE_DEFAULTS.duration);
  const [hoverTrigger, setHoverTrigger] = useState(PIXEL_DISSOLVE_DEFAULTS.hoverTrigger);
  const [color, setColor] = useState(PIXEL_DISSOLVE_DEFAULTS.color);
  const [fontSize, setFontSize] = useState(PIXEL_DISSOLVE_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(PIXEL_DISSOLVE_DEFAULTS.fontWeight);
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
            placeholder="PIXEL"
          />
        </ControlField>
        <RangeWithNumber
          label="Pixel Size"
          description="픽셀 블록 크기 (1~20)"
          value={pixelSize}
          onChange={setPixelSize}
          min={1}
          max={20}
          step={1}
        />
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
            setText(PIXEL_DISSOLVE_DEFAULTS.text);
            setPixelSize(PIXEL_DISSOLVE_DEFAULTS.pixelSize);
            setBaseFrequency(PIXEL_DISSOLVE_DEFAULTS.baseFrequency);
            setNumOctaves(PIXEL_DISSOLVE_DEFAULTS.numOctaves);
            setDuration(PIXEL_DISSOLVE_DEFAULTS.duration);
            setHoverTrigger(PIXEL_DISSOLVE_DEFAULTS.hoverTrigger);
            setColor(PIXEL_DISSOLVE_DEFAULTS.color);
            setFontSize(PIXEL_DISSOLVE_DEFAULTS.fontSize);
            setFontWeight(PIXEL_DISSOLVE_DEFAULTS.fontWeight);
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
      title="Pixel Dissolve Text."
      description="SVG feMorphology와 feConvolveMatrix로 텍스트를 픽셀화(모자이크)하고, feTurbulence 기반 디졸브 마스크와 결합하여 레트로 게임처럼 픽셀 단위로 흩어지며 사라지는 효과를 적용합니다. 텍스트 위에 마우스를 올려보세요."
      preview={
        <div className="h-48 flex items-center justify-center">
          <PixelDissolveText
            key={`${text}-${pixelSize}-${baseFrequency}-${numOctaves}-${color}-${hoverTrigger}`}
            text={text}
            pixelSize={pixelSize}
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
          usageElement("PixelDissolveText", {
            text: text,
            pixelSize: pixelSize,
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
          'import PixelDissolveText from "@/components/common/framer-motion/typography/pixel-dissolve-text/PixelDissolveText";',
        ],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 텍스트 위에 마우스를 올리거나, progress 값이 변경될 때",
        what: "텍스트의 각 픽셀 영역을",
        how: "SVG feMorphology(dilate)로 픽셀 블록을 확대하고 feConvolveMatrix 평균 필터로 모자이크 효과를 만든 뒤, feTurbulence 노이즈 기반 sigmoid 마스크와 feComposite로 합성하여 픽셀 단위로 점진적으로 흩어지는 레트로 디졸브 효과를 표현",
      }}
      prompt="PixelDissolveText 컴포넌트를 만들어주세요. SVG feMorphology로 텍스트를 픽셀 블록으로 확대하고 feConvolveMatrix 평균 필터로 모자이크 효과를 만듭니다. 동시에 feTurbulence로 fractal noise를 생성하고 feComponentTransfer의 sigmoid table로 디졸브 마스크를 만들어 feComposite로 합성합니다. progress가 증가하면 픽셀 블록이 커지면서 동시에 노이즈 패턴에 따라 부분적으로 사라지는 레트로 게임 스타일 효과를 구현합니다. requestAnimationFrame으로 60fps 부드러운 애니메이션을 지원하고, 호버 트리거와 외부 progress 제어를 모두 지원해주세요."
    />
  );
}
