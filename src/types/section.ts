export interface SectionItem {
  /** 섹션을 구분하는 고유 식별자입니다. */
  id: string;
  /** 섹션 상단에 표시할 제목입니다. */
  title: string;
  /** 제목 아래에 표시할 설명입니다. */
  description: string;
  /** 섹션 배경에 적용할 CSS 색상 또는 그라디언트입니다. */
  backgroundColor: string;
  /** 제목·설명·섹션 번호에 적용할 CSS 색상입니다. 생략하면 흰색을 사용합니다. */
  textColor?: string;
  /** 설명 아래에 추가로 표시할 React 콘텐츠입니다. */
  content?: React.ReactNode;
}

export interface StickyStackSectionsProps {
  /** 쌓이는 순서대로 전달할 섹션 배열입니다. 제목, 설명, 배경색과 선택적 콘텐츠를 포함합니다. */
  sections: SectionItem[];
  /** 전체 섹션 스택을 감싸는 컨테이너에 추가할 CSS 클래스입니다. */
  className?: string;
}
