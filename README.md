# Interaction Guide

React로 만든 인터랙션을 직접 조절하고 코드로 가져가는 한국어 컴포넌트 가이드북입니다. React Bits의 문서 흐름을 참고해 **Preview → Customize → Props → Dependencies**, **Code → Install → Usage → Source** 구조로 구성했습니다.

## 실행

```sh
npm ci
npm run dev
```

http://localhost:3000/docs 에서 시작합니다. React 19, Next.js 15.3.8, TypeScript, Tailwind CSS 4를 사용합니다. 실행 전 문서 메타데이터가 실제 컴포넌트 소스에서 생성됩니다.

## 문서에서 할 수 있는 것

- 5개 카테고리의 29개 예제 검색·필터링
- `⌘K` / `Ctrl+K` 전체 검색, 모바일 메뉴, 키보드 탭 이동
- 데모 재생, 설정 조절, 기본값 초기화
- 현재 설정을 반영하는 복사용 TSX 예제
- 실제 타입과 기본값을 반영하는 Props 표
- npm·pnpm·yarn·bun 의존성 설치 명령
- 컴포넌트뿐 아니라 함께 필요한 CSS·훅·타입 파일 확인·복사
- 즐겨찾기 저장 및 `/docs/favorites`에서 다시 보기
- `Copy for AI`로 사용 예제·Props·의존성·전체 소스를 한 번에 복사

`/`는 `/docs`로, `/playground`는 타이포그래피 플레이그라운드로 연결됩니다. 기존 컴포넌트 문서 URL은 유지합니다. CLI 레지스트리나 실제로 구현되지 않은 JS/CSS 변형을 제공하는 것처럼 표시하지 않습니다.

## 구조

```text
src/app/docs/
  components/           문서 셸, 검색, 카탈로그, 공통 문서 템플릿
  docs.css              문서 전용 디자인 토큰과 반응형 스타일
  getting-started/       설치·활용 가이드
  favorites/            브라우저에 저장한 즐겨찾기
  typography/ ...       예제별 상태, 미리보기, 실시간 사용 예제
src/components/common/  재사용할 실제 인터랙션 컴포넌트
src/lib/docs/           검색 데이터 접근과 안전한 TSX 예제 생성
src/data/component-docs.generated.json
scripts/generate-docs-metadata.mjs
```

컴포넌트 구현이 API 문서의 기준입니다. 생성기는 TypeScript 컴파일러 API로 Props 타입·필수 여부·기본값·주석을 추출하고 로컬 import를 따라 관련 파일과 외부 의존성을 수집합니다. 생성된 JSON은 브라우저에서 파일 시스템 접근 없이 사용할 수 있습니다.

새 예제를 추가할 때:

1. 실제 컴포넌트와 Props 설명 주석을 작성합니다.
2. `src/app/docs/components/menuTree.ts`에 경로와 설명을 추가합니다.
3. 생성기의 `entries`에 기본 컴포넌트와 필요한 동반 컴포넌트를 등록합니다.
4. 문서 페이지에서 `ComponentDocPage`와 공통 컨트롤을 사용합니다.
5. `generateUsage` / `usageElement`로 미리보기와 같은 상태 값을 사용 예제에 전달합니다. 콜백이 필요한 경우 실제 동작하는 예제 함수를 명시합니다.
6. `npm run docs:generate`와 아래 검증을 실행합니다.

개발 중 컴포넌트 API/주석을 수정했다면 `npm run docs:generate`로 문서를 갱신합니다. 개발 서버 시작과 빌드에서는 자동으로 생성합니다. 스크롤 데모에는 `previewMode="scroll"`을 지정해 문서 스크롤을 유지합니다.

## 검증

```sh
npm run lint
npm test -- --runInBand
npm run docs:check
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright는 빌드된 앱을 로컬 3100 포트에서 실행해 문서 경로, 검색, 복사, 초기화, 즐겨찾기, 모바일 레이아웃과 스크롤 데모를 검사합니다. 캡처는 `.omx/artifacts/visual-ralph/react-bits/`에 남깁니다. 기존 서버를 검사할 때는 `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm run test:e2e`를 사용할 수 있습니다.

## 디자인과 참고

디자인 기준은 [DESIGN.md](./DESIGN.md)에 있습니다. React Bits의 공개 [문서](https://reactbits.dev/text-animations/split-text)와 [소스 구조](https://github.com/DavidHDev/react-bits)를 조사했으며, 기존 프로젝트의 컴포넌트와 한국어 설명을 유지해 문서 UI를 구현했습니다. 광고·Pro 서비스·React Bits 브랜드 자산은 포함하지 않습니다.
