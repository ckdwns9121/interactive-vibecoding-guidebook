"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import AnimatedTextListWithCursor from "@/components/common/framer-motion/AnimatedTextListWithCursor";
import ComponentDocPage from "../../components/ComponentDocPage";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import {
  ANIMATED_LIST_DEFAULTS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  COLOR_OPTIONS,
  GAP_OPTIONS,
  IMAGE_SIZE_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  DEFAULT_IMAGES,
} from "./constants";

export default function AnimatedTextListPage() {
  // 컨트롤 상태
  const [cities, setCities] = useState(ANIMATED_LIST_DEFAULTS.cities);
  const [fontSize, setFontSize] = useState(ANIMATED_LIST_DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(ANIMATED_LIST_DEFAULTS.fontWeight);
  const [textColor, setTextColor] = useState(ANIMATED_LIST_DEFAULTS.textColor);
  const [codeColor, setCodeColor] = useState(ANIMATED_LIST_DEFAULTS.codeColor);
  const [gap, setGap] = useState(ANIMATED_LIST_DEFAULTS.gap);
  const [imageSize, setImageSize] = useState(ANIMATED_LIST_DEFAULTS.imageSize);
  const [borderRadius, setBorderRadius] = useState(ANIMATED_LIST_DEFAULTS.borderRadius);

  // 도시 수정 함수
  const updateCity = (index: number, field: string, value: string) => {
    const newCities = [...cities];
    newCities[index] = { ...newCities[index], [field]: value };
    setCities(newCities);
  };

  // 컨트롤 패널
  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* CITY ITEMS */}
        <div className="space-y-4 md:col-span-2 lg:col-span-3">
          <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">List Items</label>
          <p className="text-xs text-gray-400">리스트 설정</p>
          {cities.map((city, index) => (
            <div
              key={index}
              className="grid gap-4 md:grid-cols-3 p-4 bg-black/20 rounded-lg border border-gray-700"
            >
              <div className="space-y-2">
                <label className="text-xs text-gray-300">Code</label>
                <input
                  type="text"
                  value={city.code}
                  onChange={(e) => updateCity(index, "code", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="01"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-300">Name</label>
                <input
                  type="text"
                  value={city.name}
                  onChange={(e) => updateCity(index, "name", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tokyo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-300">Image</label>
                <select
                  value={city.img}
                  onChange={(e) => updateCity(index, "img", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {DEFAULT_IMAGES.map((img) => (
                    <option key={img} value={img} className="bg-gray-800 text-white">
                      {img}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

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
          label="Text Color"
          description="메인 텍스트 색상"
          value={textColor}
          onChange={setTextColor}
          options={COLOR_OPTIONS}
        />
        <SelectField
          label="Code Color"
          description="코드 텍스트 색상"
          value={codeColor}
          onChange={setCodeColor}
          options={COLOR_OPTIONS}
        />
        <SelectField
          label="Gap"
          description="항목 간 간격"
          value={gap}
          onChange={setGap}
          options={GAP_OPTIONS}
        />
        <SelectField
          label="Image Size"
          description="커서 이미지 크기"
          value={imageSize}
          onChange={setImageSize}
          options={IMAGE_SIZE_OPTIONS}
        />
        <SelectField
          label="Border Radius"
          description="이미지 둥글기"
          value={borderRadius}
          onChange={setBorderRadius}
          options={BORDER_RADIUS_OPTIONS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setCities(ANIMATED_LIST_DEFAULTS.cities);
            setFontSize(ANIMATED_LIST_DEFAULTS.fontSize);
            setFontWeight(ANIMATED_LIST_DEFAULTS.fontWeight);
            setTextColor(ANIMATED_LIST_DEFAULTS.textColor);
            setCodeColor(ANIMATED_LIST_DEFAULTS.codeColor);
            setGap(ANIMATED_LIST_DEFAULTS.gap);
            setImageSize(ANIMATED_LIST_DEFAULTS.imageSize);
            setBorderRadius(ANIMATED_LIST_DEFAULTS.borderRadius);
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
      title="애니메이티드 리스트 (Animated Text List With Cursor)"
      description="마우스 커서에 반응하는 인터랙티브 텍스트 리스트입니다. hover 시 컬러 변화와 애니메이션, 마우스 이동에 따른 skew 효과, 커스텀 커서 이미지를 구현합니다."
      preview={
        <AnimatedTextListWithCursor
          cities={cities}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textColor={textColor}
          codeColor={codeColor}
          gap={gap}
          imageSize={imageSize}
          borderRadius={borderRadius}
        />
      }
      usage={generateUsage(
        usageElement("AnimatedTextListWithCursor", {
          cities: cities,
          fontSize: fontSize,
          fontWeight: fontWeight,
          textColor: textColor,
          codeColor: codeColor,
          gap: gap,
          imageSize: imageSize,
          borderRadius: borderRadius,
        }),
        [
          'import AnimatedTextListWithCursor from "@/components/common/framer-motion/AnimatedTextListWithCursor";',
        ],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 리스트 항목에 마우스를 올렸을 때",
        what: "텍스트와 커서를",
        how: "컬러 변화, skew 애니메이션, 커스텀 이미지 커서로 표현하여 인터랙티브한 사용자 경험 제공",
      }}
      prompt="AnimatedTextListWithCursor 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 커서에 반응하는 인터랙티브 텍스트 리스트를 보여줍니다. cities prop으로 코드, 이름, 이미지가 포함된 리스트 배열을, fontSize와 fontWeight prop으로 텍스트 스타일을, textColor와 codeColor prop으로 텍스트 색상을 설정할 수 있게 해주세요. gap prop으로 항목 간 간격을, imageSize와 borderRadius prop으로 커서 이미지 크기와 둥글기를 조정할 수 있게 해주세요. hover 시 텍스트 색상 변화와 이동 애니메이션, skew 효과를 적용하고, 마우스 위치에 따라 해당 항목의 이미지가 커서로 나타나도록 구현해주세요. framer-motion을 활용하여 부드러운 애니메이션을 구현해주세요."
    />
  );
}
