"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import MagneticCursor from "@/components/common/framer-motion/cursor/MagneticCursor";
import MagneticTargetBox from "@/components/common/framer-motion/cursor/MagneticTargetBox";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import {
  MAGNETIC_CURSOR_DEFAULTS,
  BOX_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
  BORDER_STYLE_OPTIONS,
  BORDER_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
} from "./constants";

export default function MagneticCursorDocsPage() {
  // 컨트롤 상태
  const [boxWidth, setBoxWidth] = useState(MAGNETIC_CURSOR_DEFAULTS.boxWidth);
  const [boxHeight, setBoxHeight] = useState(MAGNETIC_CURSOR_DEFAULTS.boxHeight);
  const [boxText, setBoxText] = useState(MAGNETIC_CURSOR_DEFAULTS.boxText);
  const [boxColor, setBoxColor] = useState(MAGNETIC_CURSOR_DEFAULTS.boxColor);
  const [textColor, setTextColor] = useState(MAGNETIC_CURSOR_DEFAULTS.textColor);
  const [borderStyle, setBorderStyle] = useState(MAGNETIC_CURSOR_DEFAULTS.borderStyle);
  const [borderColor, setBorderColor] = useState(MAGNETIC_CURSOR_DEFAULTS.borderColor);
  const [fontSize, setFontSize] = useState(MAGNETIC_CURSOR_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(MAGNETIC_CURSOR_DEFAULTS.fontWeight);

  // 컨트롤 패널
  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* BOX TEXT */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Box Text</label>
          <p className="text-xs text-gray-400">박스에 표시될 텍스트</p>
          <input
            type="text"
            value={boxText}
            onChange={(e) => setBoxText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="박스 텍스트를 입력하세요"
          />
        </div>

        <RangeWithNumber
          label="Box Width"
          description="박스 너비 (px)"
          value={boxWidth}
          onChange={setBoxWidth}
          min={100}
          max={400}
          step={10}
        />
        <RangeWithNumber
          label="Box Height"
          description="박스 높이 (px)"
          value={boxHeight}
          onChange={setBoxHeight}
          min={50}
          max={200}
          step={10}
        />
        <SelectField
          label="Box Color"
          description="박스 배경 색상"
          value={boxColor}
          onChange={setBoxColor}
          options={BOX_COLOR_OPTIONS}
        />
        <SelectField
          label="Text Color"
          description="텍스트 색상"
          value={textColor}
          onChange={setTextColor}
          options={TEXT_COLOR_OPTIONS}
        />
        <SelectField
          label="Border Style"
          description="테두리 스타일"
          value={borderStyle}
          onChange={setBorderStyle}
          options={BORDER_STYLE_OPTIONS}
        />
        <SelectField
          label="Border Color"
          description="테두리 색상"
          value={borderColor}
          onChange={setBorderColor}
          options={BORDER_COLOR_OPTIONS}
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
            setBoxWidth(MAGNETIC_CURSOR_DEFAULTS.boxWidth);
            setBoxHeight(MAGNETIC_CURSOR_DEFAULTS.boxHeight);
            setBoxText(MAGNETIC_CURSOR_DEFAULTS.boxText);
            setBoxColor(MAGNETIC_CURSOR_DEFAULTS.boxColor);
            setTextColor(MAGNETIC_CURSOR_DEFAULTS.textColor);
            setBorderStyle(MAGNETIC_CURSOR_DEFAULTS.borderStyle);
            setBorderColor(MAGNETIC_CURSOR_DEFAULTS.borderColor);
            setFontSize(MAGNETIC_CURSOR_DEFAULTS.fontSize);
            setFontWeight(MAGNETIC_CURSOR_DEFAULTS.fontWeight);
          }}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          기본값으로 리셋
        </button>
      </div>
    </>
  );

  return (
    <>
      <MagneticCursor />
      <ComponentDocPage
        title="Magnetic Cursor"
        description="마우스 커서가 자석처럼 끌리는 효과를 구현합니다. framer-motion을 활용하여 마우스 위치를 감지하고, 타겟 요소에 가까워질수록 커서가 자연스럽게 끌리는 애니메이션을 제공합니다."
        preview={
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <MagneticTargetBox
                style={{
                  width: `${boxWidth}px`,
                  height: `${boxHeight}px`,
                  backgroundColor: boxColor,
                  color: textColor,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  borderStyle: borderStyle,
                  borderColor: borderColor,
                }}
              >
                {boxText}
              </MagneticTargetBox>
              <MagneticTargetBox className="bg-red-600 text-white border-dashed border-white">
                HOVER
              </MagneticTargetBox>
              <MagneticTargetBox className="bg-green-600 text-white border-solid border-yellow-400">
                INTERACT
              </MagneticTargetBox>
            </div>
          </div>
        }
        usage={generateUsage(
          usageElement("div", {}, [
            usageElement("MagneticCursor"),
            usageElement("div", { className: "min-h-[40vh] flex items-center justify-center" }, [
              usageElement("div", { className: "flex flex-wrap items-center justify-center gap-6" }, [
                usageElement(
                  "MagneticTargetBox",
                  {
                    style: {
                      width: `${boxWidth}px`,
                      height: `${boxHeight}px`,
                      backgroundColor: boxColor,
                      color: textColor,
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                      borderStyle: borderStyle,
                      borderColor: borderColor,
                    },
                  },
                  [usageText(boxText)],
                ),
                usageElement(
                  "MagneticTargetBox",
                  { className: "bg-red-600 text-white border-dashed border-white" },
                  [usageText("HOVER")],
                ),
                usageElement(
                  "MagneticTargetBox",
                  { className: "bg-green-600 text-white border-solid border-yellow-400" },
                  [usageText("INTERACT")],
                ),
              ]),
            ]),
          ]),
          [
            'import MagneticCursor from "@/components/common/framer-motion/cursor/MagneticCursor";',
            'import MagneticTargetBox from "@/components/common/framer-motion/cursor/MagneticTargetBox";',
          ],
        )}
        controlPanel={controlPanel}
        idea={{
          when: "사용자가 마우스를 타겟 요소 위에 올렸을 때",
          what: "커서를",
          how: "framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치에 따라 자석처럼 끌리는 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 자연스러운 움직임 구현",
        }}
        prompt="MagneticCursor와 MagneticTargetBox 컴포넌트를 만들어주세요. MagneticCursor는 커스텀 커서를 생성하고, MagneticTargetBox는 자석 효과가 적용되는 타겟 요소입니다. MagneticCursor는 framer-motion의 useMotionValue와 useSpring을 활용하여 마우스 위치를 감지하고, 커스텀 커서가 마우스를 따라 움직이도록 구현해주세요. MagneticTargetBox는 마우스가 가까워질수록 커서가 끌리는 효과를 구현하고, hover 시 스케일과 위치 변화 애니메이션을 적용해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, mix-blend-difference를 활용하여 커서의 가시성을 확보해주세요."
      />
    </>
  );
}
