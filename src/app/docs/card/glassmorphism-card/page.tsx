"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import GlassmorphismCard from "@/components/common/framer-motion/card/glassmorphism-card/GlassmorphismCard";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { GLASS_CARD_DEFAULTS, BG_COLOR_PRESETS, BACKDROP_PRESETS } from "./constants";

export default function GlassmorphismCardPage() {
  const [blurAmount, setBlurAmount] = useState(GLASS_CARD_DEFAULTS.blurAmount);
  const [bgOpacity, setBgOpacity] = useState(GLASS_CARD_DEFAULTS.bgOpacity);
  const [bgColor, setBgColor] = useState(GLASS_CARD_DEFAULTS.bgColor);
  const [enableReflection, setEnableReflection] = useState(GLASS_CARD_DEFAULTS.enableReflection);
  const [reflectionSize, setReflectionSize] = useState(GLASS_CARD_DEFAULTS.reflectionSize);
  const [reflectionOpacity, setReflectionOpacity] = useState(GLASS_CARD_DEFAULTS.reflectionOpacity);
  const [enableTilt, setEnableTilt] = useState(GLASS_CARD_DEFAULTS.enableTilt);
  const [maxTilt, setMaxTilt] = useState(GLASS_CARD_DEFAULTS.maxTilt);
  const [edgeHighlight, setEdgeHighlight] = useState(GLASS_CARD_DEFAULTS.edgeHighlight);
  const [noiseOpacity, setNoiseOpacity] = useState(GLASS_CARD_DEFAULTS.noiseOpacity);
  const [innerShadow, setInnerShadow] = useState(GLASS_CARD_DEFAULTS.innerShadow);
  const [backdrop, setBackdrop] = useState(BACKDROP_PRESETS[0].value);

  const handleReset = () => {
    setBlurAmount(GLASS_CARD_DEFAULTS.blurAmount);
    setBgOpacity(GLASS_CARD_DEFAULTS.bgOpacity);
    setBgColor(GLASS_CARD_DEFAULTS.bgColor);
    setEnableReflection(GLASS_CARD_DEFAULTS.enableReflection);
    setReflectionSize(GLASS_CARD_DEFAULTS.reflectionSize);
    setReflectionOpacity(GLASS_CARD_DEFAULTS.reflectionOpacity);
    setEnableTilt(GLASS_CARD_DEFAULTS.enableTilt);
    setMaxTilt(GLASS_CARD_DEFAULTS.maxTilt);
    setEdgeHighlight(GLASS_CARD_DEFAULTS.edgeHighlight);
    setNoiseOpacity(GLASS_CARD_DEFAULTS.noiseOpacity);
    setInnerShadow(GLASS_CARD_DEFAULTS.innerShadow);
    setBackdrop(BACKDROP_PRESETS[0].value);
  };

  return (
    <ComponentDocPage
      title="Glassmorphism Card."
      description="진짜 유리처럼 보이는 글래스모피즘 카드입니다. 방향성 엣지 하이라이트, 이중 반사(diffuse + specular), 3D 틸트, 내부 그림자, 표면 노이즈로 사실적인 유리 질감을 구현합니다."
      preview={
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${backdrop}`}
          style={{ minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* 배경에 장식 요소 — 유리 효과가 잘 보이도록 */}
          <div className="absolute top-8 left-12 w-24 h-24 rounded-full bg-white/20 blur-sm" />
          <div className="absolute bottom-12 right-16 w-32 h-32 rounded-full bg-white/15 blur-sm" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-yellow-300/20 blur-sm" />

          <GlassmorphismCard
            blurAmount={blurAmount}
            bgOpacity={bgOpacity}
            bgColor={bgColor}
            enableReflection={enableReflection}
            reflectionSize={reflectionSize}
            reflectionOpacity={reflectionOpacity}
            enableTilt={enableTilt}
            maxTilt={maxTilt}
            edgeHighlight={edgeHighlight}
            noiseOpacity={noiseOpacity}
            innerShadow={innerShadow}
            width="w-80"
            height="h-52"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-white text-xl font-bold tracking-tight">Glassmorphism</h3>
                <p className="text-white/60 text-sm mt-1">Real glass effect</p>
              </div>
              <p className="text-white/40 text-xs">마우스를 움직여 반사와 틸트 효과를 확인하세요</p>
            </div>
          </GlassmorphismCard>
        </div>
      }
      usage={generateUsage(
        usageElement(
          "div",
          {
            className: `relative overflow-hidden rounded-xl bg-gradient-to-br ${backdrop}`,
            style: { minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" },
          },
          [
            usageElement("div", {
              className: "absolute top-8 left-12 w-24 h-24 rounded-full bg-white/20 blur-sm",
            }),
            usageElement("div", {
              className: "absolute bottom-12 right-16 w-32 h-32 rounded-full bg-white/15 blur-sm",
            }),
            usageElement("div", {
              className: "absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-yellow-300/20 blur-sm",
            }),
            usageElement(
              "GlassmorphismCard",
              {
                blurAmount: blurAmount,
                bgOpacity: bgOpacity,
                bgColor: bgColor,
                enableReflection: enableReflection,
                reflectionSize: reflectionSize,
                reflectionOpacity: reflectionOpacity,
                enableTilt: enableTilt,
                maxTilt: maxTilt,
                edgeHighlight: edgeHighlight,
                noiseOpacity: noiseOpacity,
                innerShadow: innerShadow,
                width: "w-80",
                height: "h-52",
              },
              [
                usageElement("div", { className: "flex flex-col justify-between h-full" }, [
                  usageElement("div", {}, [
                    usageElement("h3", { className: "text-white text-xl font-bold tracking-tight" }, [
                      usageText("Glassmorphism"),
                    ]),
                    usageElement("p", { className: "text-white/60 text-sm mt-1" }, [
                      usageText("Real glass effect"),
                    ]),
                  ]),
                  usageElement("p", { className: "text-white/40 text-xs" }, [
                    usageText("마우스를 움직여 반사와 틸트 효과를 확인하세요"),
                  ]),
                ]),
              ],
            ),
          ],
        ),
        [
          'import GlassmorphismCard from "@/components/common/framer-motion/card/glassmorphism-card/GlassmorphismCard";',
        ],
      )}
      controls={
        <>
          <RangeWithNumber
            label="Blur Amount"
            description="배경 블러 강도 (px)"
            value={blurAmount}
            onChange={setBlurAmount}
            min={0}
            max={40}
            step={1}
          />
          <RangeWithNumber
            label="BG Opacity"
            description="배경색 불투명도"
            value={bgOpacity}
            onChange={setBgOpacity}
            min={0}
            max={0.3}
            step={0.01}
          />
          <RangeWithNumber
            label="Edge Highlight"
            description="엣지 하이라이트 강도"
            value={edgeHighlight}
            onChange={setEdgeHighlight}
            min={0}
            max={1}
            step={0.05}
          />
          <RangeWithNumber
            label="Inner Shadow"
            description="내부 그림자 — 유리 두께감"
            value={innerShadow}
            onChange={setInnerShadow}
            min={0}
            max={0.8}
            step={0.05}
          />
          <RangeWithNumber
            label="Surface Noise"
            description="표면 미세 노이즈 (유리 질감)"
            value={noiseOpacity}
            onChange={setNoiseOpacity}
            min={0}
            max={0.1}
            step={0.005}
          />
          <ControlField label="BG Color" description="유리 틴트 색상">
            <div className="flex flex-wrap gap-2">
              {BG_COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setBgColor(preset.value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    bgColor === preset.value
                      ? "border-blue-400 bg-blue-400/20 text-blue-300"
                      : "border-gray-600 text-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: preset.value }}
                  />
                  {preset.label}
                </button>
              ))}
            </div>
          </ControlField>
          <SelectField
            label="Backdrop"
            description="카드 뒤 배경 그라디언트"
            value={backdrop}
            onChange={setBackdrop}
            options={BACKDROP_PRESETS}
          />
          <ControlField label="3D Tilt" description="마우스 따라가는 원근 변환">
            <CheckboxField label="3D 틸트 사용" checked={enableTilt} onChange={setEnableTilt} />
            {enableTilt && (
              <div className="flex items-center space-x-3 mt-2">
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={maxTilt}
                  onChange={(e) => setMaxTilt(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-xs text-gray-400 w-10 text-right">{maxTilt}°</span>
              </div>
            )}
          </ControlField>
          <ControlField label="Reflection" description="이중 반사 효과 (diffuse + specular)">
            <CheckboxField label="빛 반사 사용" checked={enableReflection} onChange={setEnableReflection} />
            {enableReflection && (
              <>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-xs text-gray-400 w-8">크기</span>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    step="25"
                    value={reflectionSize}
                    onChange={(e) => setReflectionSize(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="text-xs text-gray-400 w-10 text-right">{reflectionSize}px</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-400 w-8">강도</span>
                  <input
                    type="range"
                    min="0.05"
                    max="0.35"
                    step="0.05"
                    value={reflectionOpacity}
                    onChange={(e) => setReflectionOpacity(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="text-xs text-gray-400 w-10 text-right">{reflectionOpacity}</span>
                </div>
              </>
            )}
          </ControlField>
          <div className="space-y-2 flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              초기화
            </button>
          </div>
        </>
      }
      idea={{
        when: "카드가 렌더링되고 마우스가 카드 위를 움직일 때",
        what: "카드의 유리 질감과 빛 반사를",
        how: "backdrop-filter: blur() + saturate()로 뒤 배경을 흐리게 처리하고, 방향성 있는 gradient border(135° — 위/왼 밝고 아래/오른 어둡게)와 다중 inset box-shadow로 유리 두께감을 표현. 마우스 좌표를 rAF로 추적하여 diffuse(soft-light blend, 큰 반경) + specular(overlay blend, 작은 반경) 이중 반사 레이어를 렌더링하고, perspective(800px) 기반 3D 틸트로 원근감을 부여. SVG feTurbulence 표면 노이즈로 유리 불완전함을 더해 사실적으로 완성",
      }}
      prompt="GlassmorphismCard 컴포넌트를 진짜 유리처럼 만들어주세요. 단순한 backdrop-filter blur가 아니라, (1) 방향성 있는 엣지 하이라이트 — linear-gradient(135deg)로 위/왼쪽 밝고 아래/오른쪽 어둡게, (2) 다중 inset box-shadow — 상단 1px 하이라이트, 하단 그림자, 내부 깊은 그림자로 유리 두께감, (3) 이중 반사 레이어 — diffuse(soft-light blend mode, 큰 원) + specular(overlay blend mode, 작고 강한 원) 분리, (4) perspective(800px) 3D 틸트 — 마우스 위치에 따른 rotateX/Y, (5) SVG feTurbulence 표면 노이즈 — 유리 불완전함 표현, (6) saturate(1.2) — 색상 채도 살짝 높임. 모든 마우스 추적은 requestAnimationFrame으로 직접 DOM 조작하여 60fps 보장해주세요."
    />
  );
}
