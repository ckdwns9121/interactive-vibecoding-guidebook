import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <article className="docs-guide">
      <div className="docs-eyebrow">GETTING STARTED</div>
      <h1 className="docs-hero-title">
        첫 인터랙션을
        <br />
        <span>만들어 보세요.</span>
      </h1>
      <p className="docs-lead">
        이 가이드북은 React 컴포넌트의 데모, 사용 예제, 원본 코드를 함께 제공합니다.
      </p>
      <section>
        <span className="docs-eyebrow">01 / EXPLORE</span>
        <h2>원하는 효과 찾기</h2>
        <p>
          컴포넌트 목록에서 효과를 고르거나 이름과 설명으로 검색하세요. 미리보기 아래의 컨트롤 패널에서 속도,
          텍스트, 색상 등을 바꿔 볼 수 있어요. ‘다시 재생’은 설정을 유지한 채 데모를 다시 시작합니다.
        </p>
        <Link href="/docs">컴포넌트 둘러보기 →</Link>
      </section>
      <section>
        <span className="docs-eyebrow">02 / COPY</span>
        <h2>프로젝트에 코드 가져오기</h2>
        <p>
          Code 탭에서 필요한 소스 파일을 복사하고, Usage의 import 경로를 내 프로젝트에 맞춰 바꾸세요. 이
          프로젝트의 예제는 React, TypeScript, Tailwind CSS를 기준으로 작성되어 있어요.
        </p>
        <p>
          복사한 소스의 import를 확인하세요. framer-motion이나 gsap을 사용하는 경우 해당 패키지가 필요합니다.
          로컬 훅, CSS 모듈, 이미지 등을 참조한다면 관련 파일도 함께 가져와야 합니다.
        </p>
        <pre>
          <code>{`# 소스에서 사용하는 패키지만 설치하세요.\nnpm install framer-motion\nnpm install gsap`}</code>
        </pre>
        <p>
          Next.js App Router에서 상태나 브라우저 이벤트를 사용하는 컴포넌트는 파일 상단의{" "}
          <code>&quot;use client&quot;</code> 선언을 유지하세요.
        </p>
      </section>
      <section>
        <span className="docs-eyebrow">03 / MAKE IT YOURS</span>
        <h2>아이디어를 내 화면에 적용하기</h2>
        <p>
          문서의 인터랙션 아이디어에서 효과가 실행되는 조건과 동작을 확인하세요. AI 프롬프트를 복사한 뒤
          적용할 화면, 원하는 색상, 모바일 동작을 추가하면 구현 요청을 더 구체적으로 만들 수 있어요.
        </p>
        <p>
          Customize에서 바꾼 값은 Code 탭의 Usage에도 반영됩니다. Copy for AI는 사용 예제, Props, 의존성과
          소스 파일을 한 번에 복사합니다. 실제 화면에서는 키보드 조작, 작은 화면, 모션 감소 설정도 확인하세요.
        </p>
        <Link href="/docs/typography/typing">타이핑 텍스트로 시작하기 →</Link>
      </section>
    </article>
  );
}
