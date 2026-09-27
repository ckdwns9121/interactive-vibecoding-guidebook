"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import ParallaxImage from "@/components/common/framer-motion/ParallaxImage";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import {
  PARALLAX_DEFAULTS,
  IMAGE_OPTIONS,
  CONTAINER_HEIGHT_OPTIONS,
  IMAGE_HEIGHT_OPTIONS,
  OBJECT_FIT_OPTIONS,
} from "./constants";

export default function ParallaxPage() {
  // 컨트롤 상태
  const [imageUrl, setImageUrl] = useState(PARALLAX_DEFAULTS.imageUrl);
  const [parallaxRange, setParallaxRange] = useState(PARALLAX_DEFAULTS.parallaxRange);
  const [stiffness, setStiffness] = useState(PARALLAX_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(PARALLAX_DEFAULTS.damping);
  const [mass, setMass] = useState(PARALLAX_DEFAULTS.mass);
  const [restDelta, setRestDelta] = useState(PARALLAX_DEFAULTS.restDelta);
  const [containerHeight, setContainerHeight] = useState(PARALLAX_DEFAULTS.containerHeight);
  const [imageHeight, setImageHeight] = useState(PARALLAX_DEFAULTS.imageHeight);
  const [objectFit, setObjectFit] = useState(PARALLAX_DEFAULTS.objectFit);

  // 컨트롤 패널 컴포넌트
  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SelectField
          label="Background Image"
          description="배경 이미지 선택"
          value={imageUrl}
          onChange={setImageUrl}
          options={IMAGE_OPTIONS}
        />
        <RangeWithNumber
          label="Parallax Range"
          description="패럴럭스 이동 범위 (px)"
          value={parallaxRange}
          onChange={setParallaxRange}
          min={100}
          max={600}
          step={50}
        />
        <RangeWithNumber
          label="Stiffness"
          description="스프링 강성 (높을수록 빠름)"
          value={stiffness}
          onChange={setStiffness}
          min={20}
          max={200}
          step={10}
        />
        <RangeWithNumber
          label="Damping"
          description="감쇠 (낮을수록 더 흔들림)"
          value={damping}
          onChange={setDamping}
          min={5}
          max={50}
          step={5}
        />
        <RangeWithNumber
          label="Mass"
          description="질량 (높을수록 느림)"
          value={mass}
          onChange={setMass}
          min={0.5}
          max={3}
          step={0.1}
        />
        <RangeWithNumber
          label="Rest Delta"
          description="멈춤 민감도"
          value={restDelta}
          onChange={setRestDelta}
          min={0.1}
          max={2}
          step={0.1}
        />
        <SelectField
          label="Container Height"
          description="컨테이너 높이"
          value={containerHeight}
          onChange={setContainerHeight}
          options={CONTAINER_HEIGHT_OPTIONS}
        />
        <SelectField
          label="Image Height"
          description="이미지 높이"
          value={imageHeight}
          onChange={setImageHeight}
          options={IMAGE_HEIGHT_OPTIONS}
        />
        <SelectField
          label="Object Fit"
          description="이미지 맞춤 방식"
          value={objectFit}
          onChange={setObjectFit}
          options={OBJECT_FIT_OPTIONS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setImageUrl(PARALLAX_DEFAULTS.imageUrl);
            setParallaxRange(PARALLAX_DEFAULTS.parallaxRange);
            setStiffness(PARALLAX_DEFAULTS.stiffness);
            setDamping(PARALLAX_DEFAULTS.damping);
            setMass(PARALLAX_DEFAULTS.mass);
            setRestDelta(PARALLAX_DEFAULTS.restDelta);
            setContainerHeight(PARALLAX_DEFAULTS.containerHeight);
            setImageHeight(PARALLAX_DEFAULTS.imageHeight);
            setObjectFit(PARALLAX_DEFAULTS.objectFit);
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
      title="Parallax Image."
      description="스크롤에 따라 배경 이미지가 시차를 두고 움직이는 패럴럭스 효과를 적용합니다."
      preview={
        <ParallaxImage
          imageUrl={imageUrl}
          parallaxRange={parallaxRange}
          stiffness={stiffness}
          damping={damping}
          mass={mass}
          restDelta={restDelta}
          containerHeight="h-[400px]"
          imageHeight="h-[500px]"
          objectFit={objectFit}
        />
      }
      usage={generateUsage(
        usageElement("ParallaxImage", {
          imageUrl: imageUrl,
          parallaxRange: parallaxRange,
          stiffness: stiffness,
          damping: damping,
          mass: mass,
          restDelta: restDelta,
          containerHeight: "h-[400px]",
          imageHeight: "h-[500px]",
          objectFit: objectFit,
        }),
        ['import ParallaxImage from "@/components/common/framer-motion/ParallaxImage";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "스크롤 이벤트가 발생할 때",
        what: "배경 이미지를",
        how: "스크롤 방향과 반대로 시차를 두고 움직이는 애니메이션으로 표현",
      }}
      prompt="ParallaxImage 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤 시 배경 이미지가 시차를 두고 움직이는 패럴럭스 효과를 보여줍니다. imageUrl prop으로 배경 이미지 경로를, parallaxRange prop으로 이동 범위를, stiffness와 damping prop으로 애니메이션 물리 속성을 설정할 수 있게 해주세요. containerHeight와 imageHeight prop으로 컨테이너와 이미지 높이를, objectFit prop으로 이미지 맞춤 방식을 지정할 수 있게 해주세요."
    />
  );
}
