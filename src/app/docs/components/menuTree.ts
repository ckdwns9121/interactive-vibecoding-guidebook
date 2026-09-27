// 트리형 카테고리/서브카테고리 데이터 구조 예시
const menuTree = [
  {
    category: "Typography",
    items: [
      {
        id: "typing",
        name: "타이핑 텍스트",
        description: "자연스러운 타이핑 애니메이션",
        path: "/docs/typography/typing",
      },
      {
        id: "scramble",
        name: "스크램블 텍스트",
        description: "문자가 랜덤하게 섞이며 나타나는 효과",
        path: "/docs/typography/scramble",
      },
      {
        id: "magnetic",
        name: "마그네틱 텍스트",
        description: "마우스에 반응하는 마그네틱 텍스트",
        path: "/docs/typography/magnetic",
      },
      {
        id: "revealtext",
        name: "등장 텍스트",
        description: "한 글자씩 등장하는 텍스트",
        path: "/docs/typography/revealtext",
      },
      {
        id: "glitch",
        name: "글리치 텍스트",
        description: "글리치(Glitch) 스타일의 텍스트 애니메이션",
        path: "/docs/typography/glitch",
      },
      {
        id: "morphing",
        name: "모프링 텍스트",
        description: "모프링(Morphing) 스타일의 텍스트 애니메이션",
        path: "/docs/typography/morphing",
      },
      {
        id: "scroll-marquee",
        name: "스크롤 마퀴 텍스트",
        description: "스크롤 마크리(Scroll Marquee) 스타일의 텍스트 애니메이션",
        path: "/docs/typography/scroll-marquee",
      },
      {
        id: "scroll-color-text",
        name: "스크롤 트리거 텍스트",
        description: "스크롤 트리거 텍스트",
        path: "/docs/typography/scroll-trigger-text",
      },
      {
        id: "text-clip-effect",
        name: "클립 텍스트",
        description: "클립 텍스트",
        path: "/docs/typography/text-clip-effect",
      },
      {
        id: "text-3d",
        name: "3D 텍스트",
        description: "깊이감 있는 그림자와 회전 효과의 3D 텍스트",
        path: "/docs/typography/text-3d",
      },
      {
        id: "paint-fill-text",
        name: "물감 채우기 텍스트",
        description: "물감 채우기 텍스트",
        path: "/docs/typography/paint-fill-text",
      },
      {
        id: "liquid-text",
        name: "리퀴드 텍스트",
        description: "SVG 필터로 액체처럼 흐르는 왜곡 텍스트",
        path: "/docs/typography/liquid-text",
      },
      {
        id: "dissolve-text",
        name: "디졸브 텍스트",
        description: "먼지처럼 흩어지며 사라지는 디졸브 효과",
        path: "/docs/typography/dissolve-text",
      },
      {
        id: "pixel-dissolve-text",
        name: "픽셀 디졸브 텍스트",
        description: "레트로 게임 스타일 픽셀화 + 디졸브 효과",
        path: "/docs/typography/pixel-dissolve-text",
      },
      {
        id: "playground",
        name: "플레이그라운드",
        description: "플레이그라운드",
        path: "/docs/typography/playground",
      },
    ],
  },
  {
    category: "Interaction",
    items: [
      {
        id: "scroll-dot-flip",
        name: "스크롤 도트 플립",
        description: "사진 타일이 랜덤하게 뒤집히며 도트 이미지로 전환",
        path: "/docs/interaction/scroll-dot-flip",
      },
      {
        id: "tilt-card",
        name: "틸트 카드",
        description: "마우스 움직임에 반응하는 3D 카드",
        path: "/docs/interaction/tilt-card",
      },
      {
        id: "parallax",
        name: "패럴럭스 이미지",
        description: "스크롤에 따라 움직이는 패럴럭스 이미지",
        path: "/docs/interaction/parallax",
      },
      {
        id: "zoom-bg",
        name: "스크롤 줌 배경",
        description: "스크롤에 따라 배경이 줌 인/아웃 되는 효과",
        path: "/docs/interaction/zoom-bg",
      },
      {
        id: "sticky-shrink",
        name: "스티키 축소 효과",
        description: "스크롤에 따라 섹션이 축소되는 효과",
        path: "/docs/interaction/sticky-shrink",
      },
      {
        id: "scroll-portfolio-cards",
        name: "스크롤 포트폴리오 카드",
        description: "세로 스크롤로 가로 카드가 슬라이드되는 효과",
        path: "/docs/interaction/scroll-portfolio-cards",
      },
      {
        id: "sticky-stack",
        name: "스티키 스택 섹션",
        description: "스크롤 시 섹션들이 상단에 고정되며 스택되는 효과",
        path: "/docs/interaction/sticky-stack",
      },
      {
        id: "dynamic-island",
        name: "다이나믹 아일랜드",
        description: "iOS Dynamic Island 스타일의 확장 가능한 인터랙티브 컴포넌트",
        path: "/docs/interaction/dynamic-island",
      },
    ],
  },
  {
    category: "Cursor",
    items: [
      {
        id: "animated-list",
        name: "커스텀 이미지 커서",
        description: "텍스트에 호버 시 이미지가 나타나는 효과",
        path: "/docs/cursor/animated-list",
      },
      {
        id: "overlay-cursor-demo",
        name: "오버레이 커서",
        description: "오버레이 커서 ",
        path: "/docs/cursor/overlay-cursor-demo",
      },
      {
        id: "magnetic",
        name: "마그네틱 커서",
        description: "마그네틱 커서",
        path: "/docs/cursor/magnetic",
      },
    ],
  },
  {
    category: "Background",
    items: [
      {
        id: "noise-grain-bg",
        name: "노이즈 그레인 배경",
        description: "SVG 필터 기반 필름 그레인 노이즈 오버레이",
        path: "/docs/background/noise-grain-bg",
      },
      {
        id: "dot-grid-bg",
        name: "도트 그리드 배경",
        description: "마우스에 반응하는 인터랙티브 도트 그리드",
        path: "/docs/background/dot-grid-bg",
      },
    ],
  },
  {
    category: "Card",
    items: [
      {
        id: "glassmorphism-card",
        name: "글래스모피즘 카드",
        description: "블러와 빛 반사 효과의 유리 질감 카드",
        path: "/docs/card/glassmorphism-card",
      },
    ],
  },
  // 필요시 카테고리 추가
];

export default menuTree;
