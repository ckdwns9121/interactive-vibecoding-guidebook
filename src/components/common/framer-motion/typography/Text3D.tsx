"use client";

import React from "react";

interface Text3DProps {
  /** 입체 그림자를 적용할 문자열입니다. */
  text: string;
  /** 텍스트 글꼴 크기(px)입니다. */
  fontSize?: number;
  /** 텍스트의 평면 회전 각도(deg)입니다. */
  rotateAngle?: number;
  /** 텍스트를 가로로 기울이는 각도(deg)입니다. */
  skewAngle?: number;
  /** 텍스트 h1 요소에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 텍스트 앞면의 CSS 색상입니다. */
  baseColor?: string;
  /** 처음 20단계와 65단계 이후 그림자의 CSS 색상입니다. */
  shadowColor1?: string;
  /** 21~47단계 그림자의 CSS 색상입니다. */
  shadowColor2?: string;
  /** 48~64단계 그림자의 CSS 색상입니다. */
  shadowColor3?: string;
  /** centered가 true일 때 전체 화면 컨테이너에 적용할 CSS 배경색입니다. */
  backgroundColor?: string;
  /** 텍스트의 CSS font-family 값입니다. 사용할 웹폰트는 별도로 불러와야 합니다. */
  fontFamily?: string;
  /** 65단계 이후 추가할 그림자의 마지막 단계 번호입니다. 앞의 64단계는 항상 생성됩니다. */
  shadowDepth?: number;
  /** true이면 화면 높이의 배경 컨테이너를 만들고 텍스트를 중앙에 배치합니다. */
  centered?: boolean;
  /** 각 그림자 단계의 가로 위치를 계산할 기준 이동량(px)입니다. */
  shadowOffsetX?: number;
  /** 각 그림자 단계의 세로 위치를 계산할 기준 이동량(px)입니다. */
  shadowOffsetY?: number;
  /** 각 text-shadow에 적용할 흐림 반경(px)입니다. */
  shadowBlur?: number;
  /** 그림자 가로·세로 이동 거리에 곱할 배율입니다. */
  shadowSpread?: number;
}

const Text3D: React.FC<Text3DProps> = ({
  text,
  fontSize = 80,
  rotateAngle = 20,
  skewAngle = -20,
  className = "",
  baseColor = "#ffffff",
  shadowColor1 = "#51B3A3",
  shadowColor2 = "#389788",
  shadowColor3 = "#7ee5d6",
  backgroundColor = "#59C4B4",
  fontFamily = "'Press Start 2P', cursive",
  shadowDepth = 90,
  centered = true,
  shadowOffsetX = 1,
  shadowOffsetY = 1,
  shadowBlur = 0,
  shadowSpread = 1,
}) => {
  // 3D text-shadow 생성 함수
  const generateTextShadow = () => {
    const shadows = [];

    // 첫 번째 단계: shadowColor1
    for (let i = 1; i <= 20; i++) {
      const x = i * shadowOffsetX * shadowSpread;
      const y = (i + (i > 10 ? i - 10 : 0)) * shadowOffsetY * shadowSpread;
      shadows.push(`${x}px ${y}px ${shadowBlur}px ${shadowColor1}`);
    }

    // 두 번째 단계: shadowColor2
    for (let i = 21; i <= 47; i++) {
      const x = (i + Math.floor((i - 21) / 2)) * shadowOffsetX * shadowSpread;
      const y = (i + Math.floor((i - 21) / 2) + 10) * shadowOffsetY * shadowSpread;
      shadows.push(`${x}px ${y}px ${shadowBlur}px ${shadowColor2}`);
    }

    // 세 번째 단계: shadowColor3
    for (let i = 48; i <= 64; i++) {
      const x = (i + (i - 48) * 2) * shadowOffsetX * shadowSpread;
      const y = (i + (i - 48) * 4 + 1) * shadowOffsetY * shadowSpread;
      shadows.push(`${x}px ${y}px ${shadowBlur}px ${shadowColor3}`);
    }

    // 마지막 단계: shadowColor1 (뒷부분)
    for (let i = 65; i <= shadowDepth; i++) {
      const x = (i + (i - 65) * 2) * shadowOffsetX * shadowSpread;
      const y = (i + (i - 65) * 1 + 15) * shadowOffsetY * shadowSpread;
      shadows.push(`${x}px ${y}px ${shadowBlur}px ${shadowColor1}`);
    }

    return shadows.join(", ");
  };

  const containerStyle = centered
    ? {
        position: "absolute" as const,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        margin: "auto",
        width: "fit-content",
        height: "fit-content",
        maxWidth: "90vw",
        maxHeight: "90vh",
      }
    : {};

  const textStyle = {
    fontFamily,
    fontSize: `${fontSize}px`,
    color: baseColor,
    textShadow: generateTextShadow(),
    transform: `rotate(${rotateAngle}deg) skew(${skewAngle}deg)`,
    WebkitTransform: `rotate(${rotateAngle}deg) skew(${skewAngle}deg)`,
    MozTransform: `rotate(${rotateAngle}deg) skew(${skewAngle}deg)`,
    OTransform: `rotate(${rotateAngle}deg) skew(${skewAngle}deg)`,
    msTransform: `rotate(${rotateAngle}deg) skew(${skewAngle}deg)`,
    userSelect: "none" as const,
    lineHeight: "1.2",
    whiteSpace: "nowrap" as const,
  };

  const backgroundStyle = {
    backgroundColor,
    minHeight: "100vh",
    width: "100%",
    position: "relative" as const,
    overflow: "hidden",
  };

  if (centered) {
    return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <h1 style={textStyle} className={className}>
            {text}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <h1 style={textStyle} className={className}>
      {text}
    </h1>
  );
};

export default Text3D;
