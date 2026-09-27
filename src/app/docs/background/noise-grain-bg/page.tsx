"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import NoiseGrainBG from "@/components/common/framer-motion/background/noise-grain-bg/NoiseGrainBG";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { NOISE_GRAIN_DEFAULTS, BLEND_MODE_OPTIONS, BG_COLOR_PRESETS } from "./constants";

// Usage 예제 코드

export default function NoiseGrainBGPage() {
  // 컨트롤 상태
  const [opacity, setOpacity] = useState(NOISE_GRAIN_DEFAULTS.opacity);
  const [baseFrequency, setBaseFrequency] = useState(NOISE_GRAIN_DEFAULTS.baseFrequency);
  const [numOctaves, setNumOctaves] = useState(NOISE_GRAIN_DEFAULTS.numOctaves);
  const [animate, setAnimate] = useState(NOISE_GRAIN_DEFAULTS.animate);
  const [speed, setSpeed] = useState(NOISE_GRAIN_DEFAULTS.speed);
  const [blendMode, setBlendMode] = useState<string>(NOISE_GRAIN_DEFAULTS.blendMode);
  const [bgGradient, setBgGradient] = useState(BG_COLOR_PRESETS[0].value);

  // 리셋 핸들러
  const handleReset = () => {
    setOpacity(NOISE_GRAIN_DEFAULTS.opacity);
    setBaseFrequency(NOISE_GRAIN_DEFAULTS.baseFrequency);
    setNumOctaves(NOISE_GRAIN_DEFAULTS.numOctaves);
    setAnimate(NOISE_GRAIN_DEFAULTS.animate);
    setSpeed(NOISE_GRAIN_DEFAULTS.speed);
    setBlendMode(NOISE_GRAIN_DEFAULTS.blendMode);
    setBgGradient(BG_COLOR_PRESETS[0].value);
  };

  return (
    <ComponentDocPage
      title="Noise Grain Background."
      description="SVG feTurbulence 필터를 활용하여 필름 그레인 노이즈 오버레이를 생성합니다. requestAnimationFrame으로 매 프레임 seed 값을 변경해 자연스러운 깜박임 효과를 만들어냅니다."
      preview={
        <NoiseGrainBG
          key={`${opacity}-${baseFrequency}-${numOctaves}-${animate}-${speed}-${blendMode}`}
          opacity={opacity}
          baseFrequency={baseFrequency}
          numOctaves={numOctaves}
          animate={animate}
          speed={speed}
          blendMode={blendMode}
        >
          <div className={`h-64 bg-gradient-to-br ${bgGradient} flex items-center justify-center rounded-lg`}>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider select-none">
              NOISE GRAIN
            </h2>
          </div>
        </NoiseGrainBG>
      }
      usage={generateUsage(
        usageElement(
          "NoiseGrainBG",
          {
            opacity: opacity,
            baseFrequency: baseFrequency,
            numOctaves: numOctaves,
            animate: animate,
            speed: speed,
            blendMode: blendMode,
          },
          [
            usageElement(
              "div",
              {
                className: `h-64 bg-gradient-to-br ${bgGradient} flex items-center justify-center rounded-lg`,
              },
              [
                usageElement(
                  "h2",
                  { className: "text-white text-3xl md:text-5xl font-bold tracking-wider select-none" },
                  [usageText("NOISE GRAIN")],
                ),
              ],
            ),
          ],
        ),
        [
          'import NoiseGrainBG from "@/components/common/framer-motion/background/noise-grain-bg/NoiseGrainBG";',
        ],
      )}
      controls={
        <>
          <RangeWithNumber
            label="Opacity"
            description="노이즈 오버레이 불투명도"
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={0.5}
            step={0.01}
          />
          <RangeWithNumber
            label="Base Frequency"
            description="노이즈 기본 주파수 (높을수록 세밀)"
            value={baseFrequency}
            onChange={setBaseFrequency}
            min={0.1}
            max={2.0}
            step={0.05}
          />
          <RangeWithNumber
            label="Num Octaves"
            description="노이즈 디테일 수준 (옥타브)"
            value={numOctaves}
            onChange={setNumOctaves}
            min={1}
            max={8}
            step={1}
          />
          <ControlField label="Animate" description="그레인 애니메이션 활성화">
            <CheckboxField label="애니메이션 사용" checked={animate} onChange={setAnimate} />
          </ControlField>
          {animate && (
            <RangeWithNumber
              label="Speed"
              description="애니메이션 속도 (FPS)"
              value={speed}
              onChange={setSpeed}
              min={1}
              max={30}
              step={1}
            />
          )}
          <SelectField
            label="Blend Mode"
            description="배경과 합성 모드"
            value={blendMode}
            onChange={setBlendMode}
            options={BLEND_MODE_OPTIONS}
          />
          <SelectField
            label="Background"
            description="배경 그라디언트 프리셋"
            value={bgGradient}
            onChange={setBgGradient}
            options={BG_COLOR_PRESETS}
          />
          <div className="space-y-2 flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </>
      }
      idea={{
        when: "페이지가 로드되거나 배경 영역이 표시될 때",
        what: "배경 위에 필름 그레인 노이즈를",
        how: "SVG feTurbulence로 fractal noise를 생성하고, requestAnimationFrame으로 seed 값을 매 프레임 변경하여 깜박이는 필름 그레인 효과를 만든 뒤, mix-blend-mode로 배경과 자연스럽게 합성",
      }}
      prompt="NoiseGrainBG 컴포넌트를 만들어주세요. 이 컴포넌트는 SVG feTurbulence 필터를 사용하여 필름 그레인 노이즈 오버레이를 생성합니다. opacity prop으로 노이즈 불투명도를, baseFrequency prop으로 노이즈 기본 주파수를, numOctaves prop으로 디테일 수준을, animate prop으로 애니메이션 활성화 여부를, speed prop으로 애니메이션 속도를, blendMode prop으로 합성 모드를 설정할 수 있게 해주세요. children을 감싸고 그 위에 노이즈를 오버레이하되, pointer-events-none으로 하위 콘텐츠의 인터랙션을 방해하지 않도록 해주세요. requestAnimationFrame과 ref를 사용하여 React 리렌더 없이 SVG 속성을 직접 업데이트해주세요."
    />
  );
}
