"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";
import { useState } from "react";
import TextScramble from "@/components/common/framer-motion/typography/TextScramble";
import ComponentDocPage from "../../components/ComponentDocPage";
import { TextAreaField } from "@/components/common/docs-controls/TextAreaField";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
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

const TRIGGER_OPTIONS = [
  { value: "auto", label: "Auto - 자동 시작" },
  { value: "hover", label: "Hover - 마우스 호버 시" },
  { value: "manual", label: "Manual - 수동 제어" },
];

const VARIANT_CLASSES: Record<string, string> = {
  h1: "text-3xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-2xl md:text-4xl lg:text-5xl font-semibold",
  h3: "text-xl md:text-3xl lg:text-4xl font-medium",
  h4: "text-lg md:text-2xl lg:text-3xl font-medium",
  body: "text-base md:text-lg",
  small: "text-sm md:text-base",
};

export default function ScrambleTextPage() {
  const [text, setText] = useState("스크램블 효과");
  const [speed, setSpeed] = useState(50);
  const [delay, setDelay] = useState(100);
  const [loop, setLoop] = useState(true);
  const [pauseTime, setPauseTime] = useState(1000);
  const [characters, setCharacters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  );
  const [revealSpeed, setRevealSpeed] = useState(100);
  const [trigger, setTrigger] = useState<"auto" | "hover" | "manual">("auto");
  const [textColor, setTextColor] = useState("inherit");
  const [variant, setVariant] = useState("h1");

  return (
    <ComponentDocPage
      title="스크램블 텍스트"
      description="텍스트가 스크램블되는 애니메이션 효과를 적용합니다."
      preview={
        <div className="min-h-32 md:min-h-40 flex items-center justify-center" style={{ color: textColor }}>
          <TextScramble
            text={text}
            speed={speed}
            delay={delay}
            loop={loop}
            pauseTime={pauseTime}
            characters={characters}
            revealSpeed={revealSpeed}
            trigger={trigger}
            className={VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3}
          />
        </div>
      }
      usage={generateUsage(
        usageElement(
          "div",
          {
            className: "min-h-32 md:min-h-40 flex items-center justify-center",
            style: { color: textColor },
          },
          [
            usageElement("TextScramble", {
              text: text,
              speed: speed,
              delay: delay,
              loop: loop,
              pauseTime: pauseTime,
              characters: characters,
              revealSpeed: revealSpeed,
              trigger: trigger,
              className: VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.h3,
            }),
          ],
        ),
        ['import TextScramble from "@/components/common/framer-motion/typography/TextScramble";'],
      )}
      controls={
        <>
          <TextAreaField
            label="Text"
            description="스크램블될 텍스트"
            value={text}
            onChange={setText}
            rows={3}
            placeholder="스크램블될 텍스트를 입력하세요"
          />
          <RangeWithNumber
            label="Scramble Speed"
            description="스크램블 속도(ms)"
            value={speed}
            onChange={setSpeed}
            min={10}
            max={200}
          />
          <RangeWithNumber
            label="Start Delay"
            description="애니메이션 시작 전 대기 시간(ms)"
            value={delay}
            onChange={setDelay}
            min={0}
            max={3000}
          />
          <RangeWithNumber
            label="Reveal Speed"
            description="각 문자가 복원되는 속도"
            value={revealSpeed}
            onChange={setRevealSpeed}
            min={50}
            max={300}
          />
          <RangeWithNumber
            label="Pause Time"
            description="반복 시 일시정지 시간(ms)"
            value={pauseTime}
            onChange={setPauseTime}
            min={500}
            max={5000}
          />
          <TextAreaField
            label="Characters"
            description="스크램블에 사용할 문자셋"
            value={characters}
            onChange={setCharacters}
            rows={2}
            placeholder="스크램블에 사용할 문자들을 입력하세요"
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
            label="Trigger"
            description="트리거 방식"
            value={trigger}
            onChange={(value) => setTrigger(value as "auto" | "hover" | "manual")}
            options={TRIGGER_OPTIONS}
          />
          <ControlField label="Loop" description="반복 재생">
            <CheckboxField label="반복 재생" checked={loop} onChange={setLoop} />
          </ControlField>
        </>
      }
      idea={{
        when: "컴포넌트가 마운트되거나 호버 이벤트가 발생할 때",
        what: "텍스트를",
        how: "랜덤 문자로 스크램블한 후 원래 텍스트로 순차적으로 복원하는 애니메이션으로 표현",
      }}
      prompt="TextScramble 컴포넌트를 만들어주세요. 이 컴포넌트는 텍스트가 스크램블되는 애니메이션 효과를 보여줍니다. text prop으로 스크램블할 텍스트를, speed prop으로 스크램블 속도를, delay prop으로 시작 전 대기 시간을 설정할 수 있게 해주세요. loop prop으로 반복 재생을, pauseTime prop으로 반복 시 일시정지 시간을, characters prop으로 스크램블에 사용할 문자셋을, revealSpeed prop으로 각 문자가 복원되는 속도를 설정할 수 있게 해주세요. trigger prop으로 auto, hover, manual 트리거 방식을 지원해주세요."
    />
  );
}
