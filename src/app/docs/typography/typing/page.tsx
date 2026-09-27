"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";

import { useState } from "react";
import TypingText from "@/components/common/framer-motion/typography/typing-text/TypingText";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { SelectField } from "@/components/common/docs-controls/SelectField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";

const TEXT_COLOR_OPTIONS = [
  { value: "inherit", label: "inherit" },
  { value: "#000000", label: "Black" },
  { value: "#ffffff", label: "White" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#10b981", label: "Green" },
  { value: "#f59e0b", label: "Orange" },
  { value: "#ef4444", label: "Red" },
];

const VARIANT_OPTIONS = [
  { value: "h1", label: "H1 - Heading 1" },
  { value: "h2", label: "H2 - Heading 2" },
  { value: "h3", label: "H3 - Heading 3" },
  { value: "h4", label: "H4 - Heading 4" },
  { value: "body", label: "Body - 본문" },
  { value: "small", label: "Small - 소형" },
];

// 커서 타입 옵션
const CURSOR_OPTIONS = [
  { value: "|", label: "line" },
  { value: "_", label: "underscore" },
  { value: "█", label: "block" },
  { value: "●", label: "dot" },
];

const VARIANT_CLASSES: Record<string, string> = {
  h1: "text-3xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-2xl md:text-4xl lg:text-5xl font-semibold",
  h3: "text-xl md:text-3xl lg:text-4xl font-medium",
  h4: "text-lg md:text-2xl lg:text-3xl font-medium",
  body: "text-base md:text-lg",
  small: "text-sm md:text-base",
};

export default function TypographyAnimationPage() {
  const [text, setText] = useState("타이포그래피");
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [delay, setDelay] = useState(0);
  const [cursorColor, setCursorColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("inherit");
  const [variant, setVariant] = useState("h1");
  const [cursorType, setCursorType] = useState("|");
  const [showCursor, setShowCursor] = useState(true);
  const [loop, setLoop] = useState(false);

  return (
    <ComponentDocPage
      title="타이핑 애니메이션"
      description="텍스트가 타이핑되는 애니메이션 효과를 적용합니다."
      preview={
        <div
          className="min-h-32 md:min-h-40 flex items-center justify-center"
          style={
            { "--typing-text-color": textColor, "--typing-cursor-color": cursorColor } as React.CSSProperties
          }
        >
          <TypingText
            key={`${text}-${typingSpeed}-${delay}-${cursorType}-${showCursor}-${loop}`}
            text={text}
            speed={typingSpeed}
            delay={delay}
            className={VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3}
            cursorChar={cursorType}
            showCursor={showCursor}
            loop={loop}
            cursorClassName="text-[var(--typing-cursor-color)]"
            textClassName="text-[var(--typing-text-color)]"
          />
        </div>
      }
      usage={generateUsage(
        usageElement(
          "div",
          {
            className: "min-h-32 md:min-h-40 flex items-center justify-center",
            style: {
              "--typing-text-color": textColor,
              "--typing-cursor-color": cursorColor,
            } as React.CSSProperties,
          },
          [
            usageElement("TypingText", {
              text: text,
              speed: typingSpeed,
              delay: delay,
              className: VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3,
              cursorChar: cursorType,
              showCursor: showCursor,
              loop: loop,
              cursorClassName: "text-[var(--typing-cursor-color)]",
              textClassName: "text-[var(--typing-text-color)]",
            }),
          ],
        ),
        ['import TypingText from "@/components/common/framer-motion/typography/typing-text/TypingText";'],
      )}
      controls={
        <>
          <TextAreaField
            label="Texts"
            description="순차적으로 타이핑될 텍스트"
            value={text}
            onChange={setText}
            rows={3}
            placeholder="타이핑될 텍스트를 입력하세요"
          />
          <RangeWithNumber
            label="Typing Speed"
            description="각 글자 타이핑 속도(ms)"
            value={typingSpeed}
            onChange={setTypingSpeed}
            min={20}
            max={500}
          />
          <RangeWithNumber
            label="Start Delay"
            description="애니메이션 시작 전 대기 시간(ms)"
            value={delay}
            onChange={setDelay}
            min={0}
            max={3000}
          />
          <ColorField
            label="Cursor Color"
            description="커서 색상"
            value={cursorColor}
            onChange={setCursorColor}
          />
          <SelectField
            label="Text Color"
            description="텍스트 색상"
            value={textColor}
            onChange={setTextColor}
            options={TEXT_COLOR_OPTIONS}
          />
          <SelectField
            label="Variant"
            description="Typography 변형"
            value={variant}
            onChange={setVariant}
            options={VARIANT_OPTIONS}
          />
          <SelectField
            label="Cursor Type"
            description="커서 타입"
            value={cursorType}
            onChange={setCursorType}
            options={CURSOR_OPTIONS}
          />
          <ControlField label="Show Cursor" description="커서 표시 여부">
            <CheckboxField label="커서 표시" checked={showCursor} onChange={setShowCursor} />
          </ControlField>
          <ControlField label="Loop" description="반복 재생">
            <CheckboxField label="반복 재생" checked={loop} onChange={setLoop} />
          </ControlField>
        </>
      }
      idea={{
        when: "컴포넌트가 마운트되거나 텍스트가 변경될 때",
        what: "텍스트를",
        how: "한 글자씩 순차적으로 나타나는 타이핑 애니메이션으로 표현",
      }}
      prompt="TypingText 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 타이핑되는 애니메이션 효과를 보여줍니다. text prop으로 타이핑할 텍스트를, speed prop으로 타이핑 속도를, delay prop으로 시작 전 대기 시간을 설정할 수 있게 해주세요. className prop으로 스타일링을, cursorChar prop으로 커서 문자를, showCursor prop으로 커서 표시 여부를, loop prop으로 반복 재생을 설정할 수 있게 해주세요. cursorClassName과 textClassName prop으로 커서와 텍스트의 개별 스타일링을 지원해주세요."
    />
  );
}
