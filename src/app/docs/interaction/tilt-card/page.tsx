"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import TiltCard from "@/components/common/effects/TiltCard";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import {
  TILT_CARD_DEFAULTS,
  BACKGROUND_COLOR_OPTIONS,
  PADDING_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
} from "./constants";

export default function TiltCardDocsPage() {
  // 컨트롤 상태
  const [maxTilt, setMaxTilt] = useState(TILT_CARD_DEFAULTS.maxTilt);
  const [parallaxFactor, setParallaxFactor] = useState(TILT_CARD_DEFAULTS.parallaxFactor);
  const [cardWidth, setCardWidth] = useState(TILT_CARD_DEFAULTS.cardWidth);
  const [cardHeight, setCardHeight] = useState(TILT_CARD_DEFAULTS.cardHeight);
  const [backgroundColor, setBackgroundColor] = useState(TILT_CARD_DEFAULTS.backgroundColor);
  const [cardPadding, setCardPadding] = useState(TILT_CARD_DEFAULTS.cardPadding);
  const [borderRadius, setBorderRadius] = useState(TILT_CARD_DEFAULTS.borderRadius);
  const [shadow, setShadow] = useState(TILT_CARD_DEFAULTS.shadow);
  const [titleText, setTitleText] = useState(TILT_CARD_DEFAULTS.titleText);
  const [titleSize, setTitleSize] = useState(TILT_CARD_DEFAULTS.titleSize);
  const [titleWeight, setTitleWeight] = useState(TILT_CARD_DEFAULTS.titleWeight);
  const [titleColor, setTitleColor] = useState(TILT_CARD_DEFAULTS.titleColor);
  const [descriptionText, setDescriptionText] = useState(TILT_CARD_DEFAULTS.descriptionText);
  const [descriptionSize, setDescriptionSize] = useState(TILT_CARD_DEFAULTS.descriptionSize);
  const [descriptionColor, setDescriptionColor] = useState(TILT_CARD_DEFAULTS.descriptionColor);

  // 컨트롤 패널
  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RangeWithNumber
          label="Max Tilt"
          description="최대 기울기 각도 (도)"
          value={maxTilt}
          onChange={setMaxTilt}
          min={5}
          max={45}
          step={1}
        />
        <RangeWithNumber
          label="Parallax Factor"
          description="패럴럭스 깊이 강도"
          value={parallaxFactor}
          onChange={setParallaxFactor}
          min={0}
          max={1}
          step={0.05}
        />
        <RangeWithNumber
          label="Card Width"
          description="카드 너비 (px)"
          value={cardWidth}
          onChange={setCardWidth}
          min={200}
          max={600}
          step={20}
        />
        <RangeWithNumber
          label="Card Height"
          description="카드 높이 (px)"
          value={cardHeight}
          onChange={setCardHeight}
          min={200}
          max={500}
          step={20}
        />
        <SelectField
          label="Background Color"
          description="카드 배경색"
          value={backgroundColor}
          onChange={setBackgroundColor}
          options={BACKGROUND_COLOR_OPTIONS}
        />
        <SelectField
          label="Padding"
          description="카드 내부 여백"
          value={cardPadding}
          onChange={setCardPadding}
          options={PADDING_OPTIONS}
        />
        <SelectField
          label="Border Radius"
          description="모서리 둥글기"
          value={borderRadius}
          onChange={setBorderRadius}
          options={BORDER_RADIUS_OPTIONS}
        />
        <SelectField
          label="Shadow"
          description="그림자 강도"
          value={shadow}
          onChange={setShadow}
          options={SHADOW_OPTIONS}
        />

        {/* TITLE TEXT */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title Text</label>
          <p className="text-xs text-gray-400">카드 제목</p>
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="카드 제목을 입력하세요"
          />
        </div>
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setMaxTilt(TILT_CARD_DEFAULTS.maxTilt);
            setParallaxFactor(TILT_CARD_DEFAULTS.parallaxFactor);
            setCardWidth(TILT_CARD_DEFAULTS.cardWidth);
            setCardHeight(TILT_CARD_DEFAULTS.cardHeight);
            setBackgroundColor(TILT_CARD_DEFAULTS.backgroundColor);
            setCardPadding(TILT_CARD_DEFAULTS.cardPadding);
            setBorderRadius(TILT_CARD_DEFAULTS.borderRadius);
            setShadow(TILT_CARD_DEFAULTS.shadow);
            setTitleText(TILT_CARD_DEFAULTS.titleText);
            setTitleSize(TILT_CARD_DEFAULTS.titleSize);
            setTitleWeight(TILT_CARD_DEFAULTS.titleWeight);
            setTitleColor(TILT_CARD_DEFAULTS.titleColor);
            setDescriptionText(TILT_CARD_DEFAULTS.descriptionText);
            setDescriptionSize(TILT_CARD_DEFAULTS.descriptionSize);
            setDescriptionColor(TILT_CARD_DEFAULTS.descriptionColor);
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
      title="Tilt Card."
      description="마우스 움직임에 따라 3D 기울기 효과를 적용하는 인터랙티브 카드입니다. 마우스 위치에 따라 카드가 자연스럽게 기울어지며, 패럴럭스 효과와 스프링 애니메이션을 통해 부드러운 사용자 경험을 제공합니다."
      preview={
        <div className="flex justify-center">
          <TiltCard
            maxTilt={maxTilt}
            parallaxFactor={parallaxFactor}
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          >
            <div
              className={`${backgroundColor} ${cardPadding} ${borderRadius} ${shadow} w-full h-full flex flex-col justify-center items-center text-center`}
            >
              <h3 className={`${titleSize} ${titleWeight} ${titleColor} mb-4`}>{titleText}</h3>
              <p className={`${descriptionSize} ${descriptionColor}`}>{descriptionText}</p>
            </div>
          </TiltCard>
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "flex justify-center" }, [
          usageElement(
            "TiltCard",
            {
              maxTilt: maxTilt,
              parallaxFactor: parallaxFactor,
              style: {
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
              },
            },
            [
              usageElement(
                "div",
                {
                  className: `${backgroundColor} ${cardPadding} ${borderRadius} ${shadow} w-full h-full flex flex-col justify-center items-center text-center`,
                },
                [
                  usageElement("h3", { className: `${titleSize} ${titleWeight} ${titleColor} mb-4` }, [
                    usageText(titleText),
                  ]),
                  usageElement("p", { className: `${descriptionSize} ${descriptionColor}` }, [
                    usageText(descriptionText),
                  ]),
                ],
              ),
            ],
          ),
        ]),
        ['import TiltCard from "@/components/common/effects/TiltCard";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 카드 위에서 마우스를 움직일 때",
        what: "카드를",
        how: "마우스 위치에 따라 3D 회전과 패럴럭스 효과를 적용하여 입체감 있는 인터랙션으로 표현",
      }}
      prompt="TiltCard 컴포넌트를 만들어주세요. 이 컴포넌트는 마우스 움직임에 따라 3D 기울기 효과를 적용하는 인터랙티브 카드를 보여줍니다. children prop으로 카드 내용을, maxTilt prop으로 최대 기울기 각도를, parallaxFactor prop으로 패럴럭스 깊이 강도를 설정할 수 있게 해주세요. style과 className prop으로 추가 스타일링을 지원해주세요. framer-motion의 useMotionValue, useTransform, useSpring을 활용하여 마우스 위치를 감지하고, 카드의 회전 각도를 계산해주세요. 마우스가 카드 중앙에서 멀어질수록 더 큰 각도로 기울어지도록 구현하고, 스프링 애니메이션으로 부드러운 전환을 적용해주세요. perspective와 transform-style을 활용하여 3D 효과를 구현해주세요."
    />
  );
}
