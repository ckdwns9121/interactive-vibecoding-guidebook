"use client";
import { generateUsage, usageElement, usageText } from "@/lib/docs/usage";

import { useState } from "react";
import GlitchText from "@/components/common/framer-motion/typography/glitch-text/GlitchText";
import TextScramble from "@/components/common/framer-motion/typography/TextScramble";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";

const VARIANT_OPTIONS = [
  { value: "h1", label: "H1 - Heading 1" },
  { value: "h2", label: "H2 - Heading 2" },
  { value: "h3", label: "H3 - Heading 3" },
  { value: "h4", label: "H4 - Heading 4" },
  { value: "body", label: "Body - 본문" },
  { value: "small", label: "Small - 소형" },
];

const VARIANT_CLASSES: Record<string, string> = {
  h1: "text-3xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-2xl md:text-4xl lg:text-5xl font-semibold",
  h3: "text-xl md:text-3xl lg:text-4xl font-medium",
  h4: "text-lg md:text-2xl lg:text-3xl font-medium",
  body: "text-base md:text-lg",
  small: "text-sm md:text-base",
};

export default function GlitchTextPage() {
  const [text, setText] = useState("GLITCH EFFECT");
  const [speed, setSpeed] = useState(0.5);
  const [enableShadows, setEnableShadows] = useState(true);
  const [enableOnHover, setEnableOnHover] = useState(false);
  const [refreshDelay, setRefreshDelay] = useState(100);
  const [variant, setVariant] = useState("h1");
  const [glitchColor1, setGlitchColor1] = useState("#ff0040");
  const [glitchColor2, setGlitchColor2] = useState("#00ffff");
  const [glitchColor3, setGlitchColor3] = useState("#ff0080");
  const [glitchColor4, setGlitchColor4] = useState("#0040ff");

  const glitchColors = [glitchColor1, glitchColor2, glitchColor3, glitchColor4];

  return (
    <ComponentDocPage
      title={
        <TextScramble
          text="Glitch Text."
          speed={30}
          delay={0}
          loop={false}
          pauseTime={1000}
          revealSpeed={60}
        />
      }
      description="텍스트에 사이버펑크 스타일의 글리치 효과를 적용하여 디지털 왜곡 현상을 시뮬레이션합니다."
      preview={
        <div className="min-h-32 md:min-h-40 flex items-center justify-center">
          <GlitchText
            key={`${text}-${speed}-${enableShadows}-${enableOnHover}-${refreshDelay}-${glitchColors.join("-")}`}
            className={VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3}
            speed={speed}
            enableShadows={enableShadows}
            enableOnHover={enableOnHover}
            refreshDelay={refreshDelay}
            glitchColors={glitchColors}
          >
            {text}
          </GlitchText>
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "min-h-32 md:min-h-40 flex items-center justify-center" }, [
          usageElement(
            "GlitchText",
            {
              className: VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3,
              speed: speed,
              enableShadows: enableShadows,
              enableOnHover: enableOnHover,
              refreshDelay: refreshDelay,
              glitchColors: glitchColors,
            },
            [usageText(text)],
          ),
        ]),
        ['import GlitchText from "@/components/common/framer-motion/typography/glitch-text/GlitchText";'],
      )}
      controls={
        <>
          <TextAreaField
            label="Text"
            description="글리치 효과가 적용될 텍스트"
            value={text}
            onChange={setText}
            rows={2}
            placeholder="글리치 효과를 적용할 텍스트를 입력하세요"
          />
          <RangeWithNumber
            label="Speed"
            description="글리치 애니메이션 속도 (낮을수록 빠름)"
            value={speed}
            onChange={setSpeed}
            min={0.1}
            max={2}
            step={0.1}
          />
          <RangeWithNumber
            label="Refresh Delay"
            description="글리치 효과 간격 (ms)"
            value={refreshDelay}
            onChange={setRefreshDelay}
            min={50}
            max={1000}
          />
          <ColorField
            label="Glitch Color 1"
            description="첫 번째 글리치 색상"
            value={glitchColor1}
            onChange={setGlitchColor1}
          />
          <ColorField
            label="Glitch Color 2"
            description="두 번째 글리치 색상"
            value={glitchColor2}
            onChange={setGlitchColor2}
          />
          <ColorField
            label="Glitch Color 3"
            description="세 번째 글리치 색상"
            value={glitchColor3}
            onChange={setGlitchColor3}
          />
          <ColorField
            label="Glitch Color 4"
            description="네 번째 글리치 색상"
            value={glitchColor4}
            onChange={setGlitchColor4}
          />
          <SelectField
            label="Variant"
            description="Typography 변형"
            value={variant}
            onChange={setVariant}
            options={VARIANT_OPTIONS}
          />
          <ControlField label="Enable Shadows" description="글리치 그림자 효과 활성화">
            <CheckboxField label="그림자 효과 사용" checked={enableShadows} onChange={setEnableShadows} />
          </ControlField>
          <ControlField label="Enable On Hover" description="호버 시에만 글리치 효과 실행">
            <CheckboxField label="호버 시에만 실행" checked={enableOnHover} onChange={setEnableOnHover} />
          </ControlField>
        </>
      }
      idea={{
        when: "컴포넌트가 마운트되거나 호버 이벤트가 발생할 때",
        what: "텍스트를",
        how: "4개의 색상 레이어와 랜덤한 클리핑 패턴으로 글리치 효과를 표현",
      }}
      prompt="GlitchText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트에 사이버펑크 스타일의 글리치 효과를 적용합니다. children prop으로 글리치 효과를 적용할 텍스트를, speed prop으로 애니메이션 속도를, enableShadows prop으로 그림자 효과 활성화를, enableOnHover prop으로 호버 시에만 실행 여부를, glitchColors prop으로 글리치 색상 배열을, refreshDelay prop으로 글리치 효과 간격을 설정할 수 있게 해주세요. 4개의 레이어로 구성된 복잡한 글리치 효과를 구현하고, 랜덤한 클리핑 패턴과 변형을 적용해주세요. framer-motion의 useAnimation을 활용하여 구현해주세요."
    />
  );
}
