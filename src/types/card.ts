export interface CardItem {
  /** 카드를 구분하는 고유 숫자 식별자입니다. */
  id: number;
  /** 카드 이미지의 대체 텍스트와 카드 제목으로 사용할 문자열입니다. */
  title: string;
  /** 카드에 표시할 설명입니다. */
  description: string;
  /** 카드 이미지의 경로입니다. 외부 URL을 사용하면 Next.js 이미지 호스트 설정이 필요합니다. */
  image: string;
}
