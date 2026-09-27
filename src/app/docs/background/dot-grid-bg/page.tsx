"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import DotGridBG from "@/components/common/framer-motion/background/dot-grid-bg/DotGridBG";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";
import { DOT_GRID_DEFAULTS, COLOR_PRESETS, BG_COLOR_PRESETS } from "./constants";

export default function DotGridBGPage() {
  const [dotSize, setDotSize] = useState(DOT_GRID_DEFAULTS.dotSize);
  const [dotSpacing, setDotSpacing] = useState(DOT_GRID_DEFAULTS.dotSpacing);
  const [interactionRadius, setInteractionRadius] = useState(DOT_GRID_DEFAULTS.interactionRadius);
  const [maxDotScale, setMaxDotScale] = useState(DOT_GRID_DEFAULTS.maxDotScale);
  const [showLines, setShowLines] = useState(DOT_GRID_DEFAULTS.showLines);
  const [lineOpacity, setLineOpacity] = useState(DOT_GRID_DEFAULTS.lineOpacity);
  const [dotColor, setDotColor] = useState(DOT_GRID_DEFAULTS.dotColor);
  const [bgGradient, setBgGradient] = useState(BG_COLOR_PRESETS[0].value);

  const handleReset = () => {
    setDotSize(DOT_GRID_DEFAULTS.dotSize);
    setDotSpacing(DOT_GRID_DEFAULTS.dotSpacing);
    setInteractionRadius(DOT_GRID_DEFAULTS.interactionRadius);
    setMaxDotScale(DOT_GRID_DEFAULTS.maxDotScale);
    setShowLines(DOT_GRID_DEFAULTS.showLines);
    setLineOpacity(DOT_GRID_DEFAULTS.lineOpacity);
    setDotColor(DOT_GRID_DEFAULTS.dotColor);
    setBgGradient(BG_COLOR_PRESETS[0].value);
  };

  return (
    <ComponentDocPage
      title="Dot Grid Background"
      description="HTML5 Canvas 기반의 인터랙티브 도트 그리드 배경입니다. 마우스 커서 근처의 점들이 커지고 연결선이 나타나며 네트워크 효과를 만들어냅니다."
      preview={
        <div className={`relative h-64 rounded-lg overflow-hidden bg-gradient-to-b ${bgGradient}`}>
          <DotGridBG
            key={`${dotSize}-${dotSpacing}-${interactionRadius}-${maxDotScale}-${showLines}-${lineOpacity}-${dotColor}`}
            dotSize={dotSize}
            dotColor={dotColor}
            dotSpacing={dotSpacing}
            interactionRadius={interactionRadius}
            maxDotScale={maxDotScale}
            showLines={showLines}
            lineColor={dotColor}
            lineOpacity={lineOpacity}
            className="w-full h-full"
          >
            <div className="flex items-center justify-center h-64">
              <p className="text-white/60 text-lg font-medium tracking-widest uppercase select-none">
                Move your mouse
              </p>
            </div>
          </DotGridBG>
        </div>
      }
      usage={generateUsage(
        usageElement(
          "div",
          { className: `relative h-64 rounded-lg overflow-hidden bg-gradient-to-b ${bgGradient}` },
          [
            usageElement(
              "DotGridBG",
              {
                dotSize: dotSize,
                dotColor: dotColor,
                dotSpacing: dotSpacing,
                interactionRadius: interactionRadius,
                maxDotScale: maxDotScale,
                showLines: showLines,
                lineColor: dotColor,
                lineOpacity: lineOpacity,
                className: "w-full h-full",
              },
              [
                usageElement("div", { className: "flex items-center justify-center h-64" }, [
                  usageElement(
                    "p",
                    { className: "text-white/60 text-lg font-medium tracking-widest uppercase select-none" },
                    [usageText("Move your mouse")],
                  ),
                ]),
              ],
            ),
          ],
        ),
        ['import DotGridBG from "@/components/common/framer-motion/background/dot-grid-bg/DotGridBG";'],
      )}
      controls={
        <>
          <RangeWithNumber
            label="Dot Size"
            description="점의 기본 크기"
            value={dotSize}
            onChange={setDotSize}
            min={0.5}
            max={3}
            step={0.5}
          />
          <RangeWithNumber
            label="Dot Spacing"
            description="점 사이 간격 (px)"
            value={dotSpacing}
            onChange={setDotSpacing}
            min={15}
            max={60}
            step={5}
          />
          <RangeWithNumber
            label="Interaction Radius"
            description="마우스 반응 반경 (px)"
            value={interactionRadius}
            onChange={setInteractionRadius}
            min={50}
            max={250}
            step={10}
          />
          <RangeWithNumber
            label="Max Dot Scale"
            description="점의 최대 확대 배율"
            value={maxDotScale}
            onChange={setMaxDotScale}
            min={1.5}
            max={6}
            step={0.5}
          />
          <ControlField label="Show Lines" description="활성화된 점 사이 연결선 표시">
            <CheckboxField label="연결선 표시" checked={showLines} onChange={setShowLines} />
          </ControlField>
          {showLines && (
            <RangeWithNumber
              label="Line Opacity"
              description="연결선 투명도"
              value={lineOpacity}
              onChange={setLineOpacity}
              min={0.05}
              max={0.4}
              step={0.05}
            />
          )}
          <ControlField label="Dot Color" description="점 색상 프리셋">
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setDotColor(preset.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    dotColor === preset.value
                      ? "border-white scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </ControlField>
          <SelectField
            label="Background"
            description="배경 그라디언트"
            value={bgGradient}
            onChange={setBgGradient}
            options={BG_COLOR_PRESETS}
          />
          <div className="space-y-2 flex items-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              초기화
            </button>
          </div>
        </>
      }
      idea={{
        when: "마우스가 배경 위를 움직일 때",
        what: "그리드의 각 점들을",
        how: "HTML5 Canvas에 일정 간격의 점 그리드를 그리고, 마우스 위치와 각 점의 거리를 계산하여 반경 내의 점은 크기와 투명도를 증가시키고, 인접한 활성화된 점들 사이에 연결선을 그려 인터랙티브 네트워크 효과를 표현",
      }}
      prompt="DotGridBG 컴포넌트를 만들어주세요. HTML5 Canvas를 사용하여 일정 간격의 도트 그리드를 그리고, 마우스 커서 근처의 점들이 크기와 투명도가 증가하며, 활성화된 점들 사이에 연결선이 나타나는 인터랙티브 배경을 구현해주세요. dotSize, dotColor, dotSpacing, interactionRadius, maxDotScale, showLines, lineColor, lineOpacity props로 커스터마이즈할 수 있고, children을 받아 콘텐츠를 캔버스 위에 렌더링할 수 있게 해주세요. requestAnimationFrame을 사용하여 부드러운 애니메이션을 구현하고, ResizeObserver로 반응형 크기 조절을 지원해주세요."
    />
  );
}
