"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import ScrollMarqueeText from "@/components/common/framer-motion/typography/ScrollMarqueeText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { ControlField } from "@/components/common/docs-controls/ControlField";

const FONT_SIZE_OPTIONS = [
  { value: "clamp(1rem, 2vw, 2rem)", label: "Small (clamp(1rem, 2vw, 2rem))" },
  { value: "clamp(1.5rem, 3vw, 3rem)", label: "Medium (clamp(1.5rem, 3vw, 3rem))" },
  { value: "clamp(2.5rem, 5vw, 5rem)", label: "Large (clamp(2.5rem, 5vw, 5rem))" },
  { value: "clamp(3rem, 8vw, 8rem)", label: "Extra Large (clamp(3rem, 8vw, 8rem))" },
  { value: "2rem", label: "Fixed 2rem" },
  { value: "4rem", label: "Fixed 4rem" },
  { value: "6rem", label: "Fixed 6rem" },
];

const BACKGROUND_COLOR_OPTIONS = [
  { value: "transparent", label: "Transparent" },
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
  { value: "#ef4444", label: "Red" },
  { value: "#f97316", label: "Orange" },
  { value: "#eab308", label: "Yellow" },
  { value: "#22c55e", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#8b5cf6", label: "Purple" },
];

// 텍스트 배열을 문자열로 변환/파싱하는 헬퍼 함수
const textsToString = (texts: string[]) => texts.join("\n");
const stringToTexts = (str: string) => str.split("\n").filter((text) => text.trim() !== "");

export default function ScrollMarqueePage() {
  const [texts, setTexts] = useState([
    "Let's Dive Into This Tutorial",
    "Take It Easy!",
    "Don't Worry Let's Code",
    "Happy Coding",
  ]);
  const [baseSpeed, setBaseSpeed] = useState(50);
  const [fontSize, setFontSize] = useState("clamp(2.5rem, 5vw, 5rem)");
  const [color, setColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [direction, setDirection] = useState(false);

  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TextAreaField
          label="Texts"
          description="마키에 표시될 텍스트 (줄바꿈으로 구분)"
          value={textsToString(texts)}
          onChange={(value) => setTexts(stringToTexts(value))}
          rows={4}
          placeholder="각 줄에 하나씩 텍스트를 입력하세요"
        />
        <RangeWithNumber
          label="Base Speed"
          description="기본 스크롤 속도"
          value={baseSpeed}
          onChange={setBaseSpeed}
          min={10}
          max={200}
        />
        <SelectField
          label="Font Size"
          description="텍스트 크기 (CSS 단위)"
          value={fontSize}
          onChange={setFontSize}
          options={FONT_SIZE_OPTIONS}
        />
        <ColorField label="Text Color" description="텍스트 색상" value={color} onChange={setColor} />
        <SelectField
          label="Background Color"
          description="배경 색상"
          value={backgroundColor}
          onChange={setBackgroundColor}
          options={BACKGROUND_COLOR_OPTIONS}
        />
        <ControlField label="Direction" description="스크롤 방향">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="direction"
                checked={!direction}
                onChange={() => setDirection(false)}
                className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
              />
              <span className="text-sm text-gray-200">← 왼쪽</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="direction"
                checked={direction}
                onChange={() => setDirection(true)}
                className="w-4 h-4 text-blue-600 border-gray-600 focus:ring-blue-500 focus:ring-2 bg-black/20"
              />
              <span className="text-sm text-gray-200">오른쪽 →</span>
            </label>
          </div>
        </ControlField>
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => {
            setTexts([
              "Let's Dive Into This Tutorial",
              "Take It Easy!",
              "Don't Worry Let's Code",
              "Happy Coding",
            ]);
            setBaseSpeed(50);
            setFontSize("clamp(2.5rem, 5vw, 5rem)");
            setColor("#ffffff");
            setBackgroundColor("transparent");
            setDirection(false);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
        >
          Reset to Default
        </button>
      </div>
    </>
  );

  return (
    <>
      <ComponentDocPage
        title="마퀴 텍스트"
        description="텍스트가 무한히 스크롤되는 마퀴 효과를 적용하며, 페이지 스크롤에 따라 속도가 동적으로 변화합니다."
        preview={
          <div className="relative h-[60vh] border-none bg-gradient-to-b from-gray-900 to-gray-800 bg-cover bg-center no-repeat shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto px-4">
                <ScrollMarqueeText
                  key={`${texts.join("-")}-${baseSpeed}-${fontSize}-${color}-${backgroundColor}-${direction}`}
                  texts={texts}
                  baseSpeed={baseSpeed}
                  fontSize={fontSize}
                  color={color}
                  backgroundColor={backgroundColor}
                  direction={direction}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        }
        usage={generateUsage(
          usageElement(
            "div",
            {
              className:
                "relative h-[60vh] border-none bg-gradient-to-b from-gray-900 to-gray-800 bg-cover bg-center no-repeat shadow-lg overflow-hidden",
            },
            [
              usageElement("div", { className: "w-full h-full flex items-center justify-center" }, [
                usageElement("div", { className: "w-full max-w-4xl mx-auto px-4" }, [
                  usageElement("ScrollMarqueeText", {
                    texts: texts,
                    baseSpeed: baseSpeed,
                    fontSize: fontSize,
                    color: color,
                    backgroundColor: backgroundColor,
                    direction: direction,
                    className: "w-full",
                  }),
                ]),
              ]),
            ],
          ),
          ['import ScrollMarqueeText from "@/components/common/framer-motion/typography/ScrollMarqueeText";'],
        )}
        controlPanel={controlPanel}
        idea={{
          when: "컴포넌트가 마운트되거나 스크롤 이벤트가 발생할 때",
          what: "텍스트 배열을",
          how: "무한 스크롤 애니메이션으로 표현하고, 페이지 스크롤 속도에 따라 마퀴 속도를 동적으로 조절",
        }}
        prompt="ScrollMarqueeText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 무한히 스크롤되는 마퀴 효과를 보여줍니다. texts prop으로 마퀴할 텍스트 배열을, baseSpeed prop으로 기본 스크롤 속도를, fontSize prop으로 텍스트 크기를, color prop으로 텍스트 색상을, backgroundColor prop으로 배경 색상을, direction prop으로 스크롤 방향을 설정할 수 있게 해주세요. 텍스트 배열을 2배로 복제하여 무한 스크롤을 구현하고, 페이지 스크롤 이벤트를 감지하여 마퀴 속도를 동적으로 조절해주세요. framer-motion의 useAnimationControls와 requestAnimationFrame을 활용하여 부드러운 애니메이션을 구현해주세요."
      />

      {/* 응용 예제 섹션 */}
      <section className="mb-8 mt-12">
        <h2 className="mb-4 text-xl md:text-2xl font-medium text-white">응용 예제</h2>
        <div className="relative h-[60vh] border-none bg-gradient-to-b from-gray-900 to-gray-800 bg-cover bg-center no-repeat shadow-lg overflow-hidden">
          <div>
            <div className="relative rotate-5 transform bg-red-500">
              <ScrollMarqueeText
                texts={[
                  "Let's Dive Into This Tutorial",
                  "Take It Easy!",
                  "Don't Worry Let's Code",
                  "Happy Coding",
                ]}
                baseSpeed={50}
                fontSize="clamp(2.5rem, 5vw, 5rem)"
                color="#fff"
                className="rounded-md bg-red-500 p-4 font-bold tracking-tighter"
              />
            </div>
            <div className="relative rotate-5 transform bg-orange-500">
              <ScrollMarqueeText
                texts={[
                  "Let's Dive Into This Tutorial",
                  "Take It Easy!",
                  "Don't Worry Let's Code",
                  "Happy Coding",
                ]}
                baseSpeed={50}
                fontSize="clamp(2.5rem, 5vw, 5rem)"
                color="#fff"
                direction={true}
                className="rounded-md bg-orange-500 p-4 font-bold tracking-tighter"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
