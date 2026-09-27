"use client";
import { generateUsage, usageElement } from "@/lib/docs/usage";
import { useState } from "react";
import Text3D from "@/components/common/framer-motion/typography/Text3D";
import ComponentDocPage from "../../components/ComponentDocPage";
import { RangeWithNumber } from "@/components/common/docs-controls/RangeWithNumber";
import { ColorField } from "@/components/common/docs-controls/ColorField";
import { CheckboxField } from "@/components/common/docs-controls/CheckboxField";
import { ControlField } from "@/components/common/docs-controls/ControlField";

export default function Text3DPage() {
  const [text, setText] = useState("3D TEXT");
  const [fontSize, setFontSize] = useState(80);
  const [rotateAngle, setRotateAngle] = useState(20);
  const [skewAngle, setSkewAngle] = useState(-20);
  const [baseColor, setBaseColor] = useState("#ffffff");
  const [shadowColor1, setShadowColor1] = useState("#51B3A3");
  const [shadowColor2, setShadowColor2] = useState("#389788");
  const [shadowColor3, setShadowColor3] = useState("#7ee5d6");
  const [backgroundColor, setBackgroundColor] = useState("#59C4B4");
  const [shadowDepth, setShadowDepth] = useState(90);
  const [centered, setCentered] = useState(false);

  // 새로운 text-shadow 컨트롤 추가
  const [shadowOffsetX, setShadowOffsetX] = useState(1);
  const [shadowOffsetY, setShadowOffsetY] = useState(1);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowSpread, setShadowSpread] = useState(1);

  return (
    <ComponentDocPage
      title="3D Text Effect"
      description="CSS text-shadow를 활용하여 3D 텍스트 효과를 구현합니다. 회전, 기울기, 다층 그림자를 통해 입체감 있는 텍스트를 표현하며, 게임이나 레트로 스타일의 인터페이스에 적합합니다."
      preview={
        <div className="h-[50vh] flex items-center justify-center">
          <div
            className="min-h-32 md:min-h-40 flex items-center justify-center"
            style={{ backgroundColor: centered ? backgroundColor : "transparent" }}
          >
            <Text3D
              text={text}
              fontSize={fontSize}
              rotateAngle={rotateAngle}
              skewAngle={skewAngle}
              baseColor={baseColor}
              shadowColor1={shadowColor1}
              shadowColor2={shadowColor2}
              shadowColor3={shadowColor3}
              backgroundColor={backgroundColor}
              shadowDepth={shadowDepth}
              shadowOffsetX={shadowOffsetX}
              shadowOffsetY={shadowOffsetY}
              shadowBlur={shadowBlur}
              shadowSpread={shadowSpread}
              centered={false}
            />
          </div>
        </div>
      }
      usage={generateUsage(
        usageElement("div", { className: "h-[50vh] flex items-center justify-center" }, [
          usageElement(
            "div",
            {
              className: "min-h-32 md:min-h-40 flex items-center justify-center",
              style: { backgroundColor: centered ? backgroundColor : "transparent" },
            },
            [
              usageElement("Text3D", {
                text: text,
                fontSize: fontSize,
                rotateAngle: rotateAngle,
                skewAngle: skewAngle,
                baseColor: baseColor,
                shadowColor1: shadowColor1,
                shadowColor2: shadowColor2,
                shadowColor3: shadowColor3,
                backgroundColor: backgroundColor,
                shadowDepth: shadowDepth,
                shadowOffsetX: shadowOffsetX,
                shadowOffsetY: shadowOffsetY,
                shadowBlur: shadowBlur,
                shadowSpread: shadowSpread,
                centered: false,
              }),
            ],
          ),
        ]),
        ['import Text3D from "@/components/common/framer-motion/typography/Text3D";'],
      )}
      controls={
        <>
          <ControlField label="Text" description="표시할 텍스트">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
              placeholder="3D 텍스트를 입력하세요"
            />
          </ControlField>
          <RangeWithNumber
            label="Font Size"
            description="글꼴 크기 (px)"
            value={fontSize}
            onChange={setFontSize}
            min={20}
            max={200}
            step={5}
          />
          <RangeWithNumber
            label="Rotate Angle"
            description="회전 각도 (도)"
            value={rotateAngle}
            onChange={setRotateAngle}
            min={-45}
            max={45}
            step={1}
          />
          <RangeWithNumber
            label="Skew Angle"
            description="기울기 각도 (도)"
            value={skewAngle}
            onChange={setSkewAngle}
            min={-45}
            max={45}
            step={1}
          />
          <ColorField
            label="Base Color"
            description="기본 텍스트 색상"
            value={baseColor}
            onChange={setBaseColor}
          />
          <ColorField
            label="Shadow Color 1"
            description="첫 번째 그림자 색상"
            value={shadowColor1}
            onChange={setShadowColor1}
          />
          <ColorField
            label="Shadow Color 2"
            description="두 번째 그림자 색상"
            value={shadowColor2}
            onChange={setShadowColor2}
          />
          <ColorField
            label="Shadow Color 3"
            description="세 번째 그림자 색상"
            value={shadowColor3}
            onChange={setShadowColor3}
          />
          <ColorField
            label="Background Color"
            description="배경 색상"
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
          <RangeWithNumber
            label="Shadow Depth"
            description="그림자 깊이"
            value={shadowDepth}
            onChange={setShadowDepth}
            min={20}
            max={200}
            step={5}
          />
          <RangeWithNumber
            label="Shadow Offset X"
            description="그림자 X 오프셋"
            value={shadowOffsetX}
            onChange={setShadowOffsetX}
            min={0}
            max={5}
            step={0.1}
          />
          <RangeWithNumber
            label="Shadow Offset Y"
            description="그림자 Y 오프셋"
            value={shadowOffsetY}
            onChange={setShadowOffsetY}
            min={0}
            max={5}
            step={0.1}
          />
          <RangeWithNumber
            label="Shadow Blur"
            description="그림자 블러"
            value={shadowBlur}
            onChange={setShadowBlur}
            min={0}
            max={10}
            step={0.5}
          />
          <RangeWithNumber
            label="Shadow Spread"
            description="그림자 확산"
            value={shadowSpread}
            onChange={setShadowSpread}
            min={0.5}
            max={3}
            step={0.1}
          />
          <ControlField label="Background Style" description="배경 스타일 적용">
            <CheckboxField label="배경 색상 적용" checked={centered} onChange={setCentered} />
          </ControlField>
        </>
      }
      idea={{
        when: "3D 텍스트 효과가 필요한 게임이나 레트로 스타일 인터페이스에서",
        what: "텍스트를",
        how: "CSS text-shadow의 다층 그림자와 transform의 rotate, skew를 조합하여 입체감 있는 3D 효과로 표현",
      }}
      prompt="Text3D 컴포넌트를 만들어주세요. 이 컴포넌트는 CSS text-shadow를 활용한 3D 텍스트 효과를 보여줍니다. text prop으로 표시할 텍스트를, fontSize prop으로 글꼴 크기를, rotateAngle과 skewAngle prop으로 회전과 기울기 각도를 설정할 수 있게 해주세요. baseColor prop으로 기본 텍스트 색상을, shadowColor1, shadowColor2, shadowColor3 prop으로 다층 그림자 색상을, backgroundColor prop으로 배경 색상을 설정할 수 있게 해주세요. shadowDepth prop으로 그림자 깊이를, shadowOffsetX와 shadowOffsetY prop으로 그림자 오프셋을, shadowBlur와 shadowSpread prop으로 그림자 블러와 확산을 설정할 수 있게 해주세요. centered prop으로 배경 색상 적용 여부를 설정할 수 있게 해주세요. CSS text-shadow를 다층으로 생성하여 3D 효과를 구현하고, transform을 활용하여 회전과 기울기 효과를 적용해주세요."
    />
  );
}
