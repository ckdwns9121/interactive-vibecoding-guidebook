"use client";

import { useState } from "react";
import ComponentDocPage from "../../components/ComponentDocPage";
import ScrollDotFlip from "@/components/common/effects/scroll-dot-flip/ScrollDotFlip";
import { RangeWithNumber, SelectField, ColorField, CheckboxField } from "@/components/common/docs-controls";
import { generateUsage, usageElement } from "@/lib/docs/usage";

const photos = [
  { value: "/1.avif", label: "컬러 포트레이트" },
  { value: "/2.avif", label: "샘플 사진 02" },
  { value: "/3.webp", label: "샘플 사진 03" },
];

export default function ScrollDotFlipPage() {
  const [src, setSrc] = useState("/1.avif");
  const [columns, setColumns] = useState(36);
  const [duration, setDuration] = useState(0.9);
  const [stagger, setStagger] = useState(2.2);
  const [dotSize, setDotSize] = useState(0.76);
  const [triggerOffset, setTriggerOffset] = useState(0.12);
  const [backgroundColor, setBackgroundColor] = useState("#15140e");
  const [once, setOnce] = useState(false);
  const [seed, setSeed] = useState(17);
  const props = {
    src,
    alt: "랜덤한 타일이 뒤집히며 도트로 바뀌는 사진",
    columns,
    duration,
    stagger,
    dotSize,
    triggerOffset,
    backgroundColor,
    once,
    seed,
    aspectRatio: 1.5,
    className: "rounded-xl",
  };

  return (
    <ComponentDocPage
      title="Scroll Dot Flip"
      description="사진에 가까이 스크롤하면 사각 타일이 랜덤한 순서로 뒤집히고, 사진의 색을 가진 작은 점으로 변합니다. 아래 사진까지 스크롤해 보세요."
      previewMode="scroll"
      preview={
        <div style={{ padding: "0 20px 40px" }}>
          <div
            style={{
              minHeight: "65vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 22,
            }}
          >
            <span style={{ color: "#f0cd68", fontSize: 11, letterSpacing: "0.2em" }}>
              PHOTO → FLIP → DOTS
            </span>
            <p
              style={{
                fontSize: "clamp(32px, 4vw, 54px)",
                lineHeight: 1.15,
                fontWeight: 650,
                letterSpacing: "-0.05em",
                color: "#f6f3e9",
              }}
            >
              A new way
              <br />
              to see the picture.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "#b2aea5" }}>
              아래로 스크롤하세요.
              <br />
              사진이 작은 점으로 바뀝니다.
            </p>
            <span aria-hidden="true" style={{ color: "#f0cd68", fontSize: 28 }}>
              ↓
            </span>
          </div>
          <ScrollDotFlip {...props} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 16,
              color: "#b2aea5",
              fontSize: 11,
            }}
          >
            <span>
              {columns} × {Math.round(columns / 1.5)} TILES
            </span>
            <span>RANDOM FLIP / ORIGINAL COLORS</span>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, color: "#b2aea5", lineHeight: 1.8 }}>
            사진이 화면 밖으로 나갈 만큼 위로 스크롤한 뒤 다시 내려오면 처음부터 재생됩니다. ‘한 번만 재생’을
            켜면 완성된 도트 사진을 유지합니다.
          </p>
        </div>
      }
      usage={generateUsage(usageElement("ScrollDotFlip", props), [
        'import ScrollDotFlip from "@/components/common/effects/scroll-dot-flip/ScrollDotFlip";',
      ])}
      controls={
        <>
          <SelectField label="사진" value={src} onChange={setSrc} options={photos} />
          <RangeWithNumber
            label="가로 타일 수"
            description="높을수록 도트가 촘촘해집니다."
            value={columns}
            onChange={setColumns}
            min={12}
            max={64}
            step={2}
          />
          <RangeWithNumber
            label="타일 회전 시간"
            description="한 타일의 회전 시간 (초)"
            value={duration}
            onChange={setDuration}
            min={0.3}
            max={2}
            step={0.1}
          />
          <RangeWithNumber
            label="랜덤 전환 간격"
            description="전체 타일이 출발하는 시간 범위 (초)"
            value={stagger}
            onChange={setStagger}
            min={0}
            max={4}
            step={0.2}
          />
          <RangeWithNumber
            label="도트 크기"
            description="셀 대비 최종 점의 지름 비율"
            value={dotSize}
            onChange={setDotSize}
            min={0.2}
            max={1}
            step={0.02}
          />
          <RangeWithNumber
            label="스크롤 시작 위치"
            description="화면 하단에서 올라오는 비율"
            value={triggerOffset}
            onChange={setTriggerOffset}
            min={0}
            max={0.4}
            step={0.02}
          />
          <RangeWithNumber
            label="랜덤 패턴"
            description="값을 바꾸면 회전 순서가 달라집니다."
            value={seed}
            onChange={setSeed}
            min={1}
            max={100}
          />
          <ColorField label="점 사이 배경색" value={backgroundColor} onChange={setBackgroundColor} />
          <CheckboxField label="한 번만 재생" checked={once} onChange={setOnce} />
        </>
      }
      idea={{
        when: "사용자가 사진에 가까이 스크롤했을 때",
        what: "원본 사진의 사각 타일을 무작위 순서로 뒤집습니다.",
        how: "Canvas에서 원본 픽셀 색상을 샘플링하고 타일의 회전·축소·둥글기를 보간합니다. 최종 도트도 원본 색을 유지합니다. 외부 사진을 사용할 때는 CORS가 허용된 이미지 URL이 필요하며, 읽을 수 없으면 원본 사진을 표시합니다.",
      }}
      prompt="스크롤해서 사진에 가까워지면 사각 타일들이 무작위 순서와 방향으로 뒤집히며 원본 색상의 작은 점으로 변하는 React 컴포넌트를 만들어줘. Canvas로 사진을 격자로 나누고 각 셀의 색을 샘플링해 도트 이미지를 만들어줘. 타일 수, 회전 시간, 랜덤 지연, 도트 크기, 시작 위치를 조절하고 화면 밖에서는 애니메이션을 멈춰줘. prefers-reduced-motion과 이미지 로드 실패도 처리해줘."
    />
  );
}
