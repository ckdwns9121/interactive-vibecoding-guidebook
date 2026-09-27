"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import ZoomScrollBg from "../../../../components/common/framer-motion/ZoomScrollBg";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import {
  ZOOM_BG_DEFAULTS,
  IMAGE_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TITLE_WEIGHT_OPTIONS,
  BLEND_MODE_OPTIONS,
} from "./constants";

export default function ZoomScrollBgPage() {
  // 컨트롤 상태
  const [imageSrc, setImageSrc] = useState(ZOOM_BG_DEFAULTS.imageSrc);
  const [imageAlt, setImageAlt] = useState(ZOOM_BG_DEFAULTS.imageAlt);
  const [title, setTitle] = useState(ZOOM_BG_DEFAULTS.title);
  const [minScale, setMinScale] = useState(ZOOM_BG_DEFAULTS.minScale);
  const [maxScale, setMaxScale] = useState(ZOOM_BG_DEFAULTS.maxScale);
  const [stiffness, setStiffness] = useState(ZOOM_BG_DEFAULTS.stiffness);
  const [damping, setDamping] = useState(ZOOM_BG_DEFAULTS.damping);
  const [mass, setMass] = useState(ZOOM_BG_DEFAULTS.mass);
  const [titleSize, setTitleSize] = useState(ZOOM_BG_DEFAULTS.titleSize);
  const [titleWeight, setTitleWeight] = useState(ZOOM_BG_DEFAULTS.titleWeight);
  const [titleColor, setTitleColor] = useState(ZOOM_BG_DEFAULTS.titleColor);
  const [blendMode, setBlendMode] = useState(ZOOM_BG_DEFAULTS.blendMode);

  const titleClassName = `${blendMode} ${titleSize} ${titleWeight} ${titleColor}`;

  // 컨트롤 패널
  const controlPanel = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SelectField
          label="Background Image"
          description="배경 이미지 선택"
          value={imageSrc}
          onChange={setImageSrc}
          options={IMAGE_OPTIONS}
        />

        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">Title</label>
          <p className="text-xs text-gray-400">표시될 제목 텍스트</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
            placeholder="제목을 입력하세요"
          />
        </div>

        <RangeWithNumber
          label="Min Scale"
          description="최소 확대 비율"
          value={minScale}
          onChange={setMinScale}
          min={0.5}
          max={1.5}
          step={0.05}
        />
        <RangeWithNumber
          label="Max Scale"
          description="최대 확대 비율"
          value={maxScale}
          onChange={setMaxScale}
          min={1}
          max={3}
          step={0.05}
        />
        <RangeWithNumber
          label="Stiffness"
          description="스프링 강성 (반응 속도)"
          value={stiffness}
          onChange={setStiffness}
          min={10}
          max={300}
        />
        <RangeWithNumber
          label="Damping"
          description="스프링 댐핑 (감속도)"
          value={damping}
          onChange={setDamping}
          min={5}
          max={100}
        />
        <SelectField
          label="Title Size"
          description="제목 텍스트 크기"
          value={titleSize}
          onChange={setTitleSize}
          options={TITLE_SIZE_OPTIONS}
        />
        <SelectField
          label="Title Weight"
          description="제목 글꼴 두께"
          value={titleWeight}
          onChange={setTitleWeight}
          options={TITLE_WEIGHT_OPTIONS}
        />
        <SelectField
          label="Blend Mode"
          description="텍스트 블렌드 모드"
          value={blendMode}
          onChange={setBlendMode}
          options={BLEND_MODE_OPTIONS}
        />
      </div>

      {/* 리셋 버튼 */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={() => {
            setImageSrc(ZOOM_BG_DEFAULTS.imageSrc);
            setImageAlt(ZOOM_BG_DEFAULTS.imageAlt);
            setTitle(ZOOM_BG_DEFAULTS.title);
            setMinScale(ZOOM_BG_DEFAULTS.minScale);
            setMaxScale(ZOOM_BG_DEFAULTS.maxScale);
            setStiffness(ZOOM_BG_DEFAULTS.stiffness);
            setDamping(ZOOM_BG_DEFAULTS.damping);
            setMass(ZOOM_BG_DEFAULTS.mass);
            setTitleSize(ZOOM_BG_DEFAULTS.titleSize);
            setTitleWeight(ZOOM_BG_DEFAULTS.titleWeight);
            setTitleColor(ZOOM_BG_DEFAULTS.titleColor);
            setBlendMode(ZOOM_BG_DEFAULTS.blendMode);
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
      title="Zoom Scroll Background."
      description="스크롤에 따라 배경 이미지가 부드럽게 확대/축소되는 인터랙션을 구현합니다. framer-motion을 활용하여 스크롤 진행도에 따른 자연스러운 줌 효과를 제공하며, 텍스트와 배경의 블렌드 모드를 통해 시각적 깊이감을 표현합니다."
      preview={
        <div className="h-[60vh]">
          <ZoomScrollBg
            key={`${imageSrc}-${title}-${minScale}-${maxScale}-${stiffness}-${damping}-${mass}`}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            title={title}
            minScale={minScale}
            maxScale={maxScale}
            stiffness={stiffness}
            damping={damping}
            mass={mass}
            titleClassName={titleClassName}
          />
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "h-[60vh]" }, [
          usageElement("ZoomScrollBg", {
            imageSrc: imageSrc,
            imageAlt: imageAlt,
            title: title,
            minScale: minScale,
            maxScale: maxScale,
            stiffness: stiffness,
            damping: damping,
            mass: mass,
            titleClassName: titleClassName,
          }),
        ]),
        ['import ZoomScrollBg from "../../../../components/common/framer-motion/ZoomScrollBg";'],
      )}
      controlPanel={controlPanel}
      idea={{
        when: "사용자가 페이지를 스크롤할 때",
        what: "배경 이미지를",
        how: "스크롤 진행도에 따라 framer-motion의 useTransform을 활용하여 자연스러운 확대/축소 애니메이션으로 표현하고, 스프링 물리 효과를 적용하여 부드러운 전환 구현",
      }}
      prompt="ZoomScrollBg 컴포넌트를 만들어주세요. 이 컴포넌트는 스크롤에 따라 배경 이미지가 확대/축소되는 효과를 보여줍니다. imageSrc와 imageAlt prop으로 배경 이미지를, title prop으로 제목 텍스트를, minScale과 maxScale prop으로 최소/최대 확대 비율을 설정할 수 있게 해주세요. stiffness, damping, mass prop으로 스프링 물리 효과를, titleClassName prop으로 제목 스타일링을 설정할 수 있게 해주세요. framer-motion의 useScroll과 useTransform을 활용하여 스크롤 진행도를 감지하고, 배경 이미지의 scale을 동적으로 조절해주세요. 스프링 물리 효과를 적용하여 자연스러운 애니메이션을 구현하고, 오버레이와 블렌드 모드를 통해 텍스트 가독성을 확보해주세요."
    />
  );
}
