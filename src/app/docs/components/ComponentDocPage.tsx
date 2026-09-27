"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docEntries } from "@/lib/docs/catalog";
import metadataRegistry from "@/data/component-docs.generated.json";
import type { ComponentDocsRegistry } from "@/types/docs";
import ComponentTabs from "./ComponentTabs";
import CopyAction from "./CopyAction";
import { useDocsPreferences } from "./DocsPreferences";
import { useDemoReset } from "./DemoReset";

interface ComponentDocPageProps {
  title: ReactNode;
  description: ReactNode;
  preview: ReactNode;
  usage: string;
  controls?: ReactNode;
  controlPanel?: ReactNode;
  idea?: { when: string; what: string; how: string };
  prompt?: string;
  previewMode?: "default" | "scroll";
}

export default function ComponentDocPage({
  title,
  description,
  preview,
  usage,
  controls,
  controlPanel,
  idea,
  prompt,
  previewMode,
}: ComponentDocPageProps) {
  const pathname = usePathname();
  const { favorites, toggleFavorite } = useDocsPreferences();
  const reset = useDemoReset();
  const index = docEntries.findIndex((item) => item.path === pathname);
  const current = docEntries[index];
  const previous = docEntries[index - 1];
  const next = docEntries[index + 1];
  const metadata = (metadataRegistry as ComponentDocsRegistry)[pathname];
  if (!metadata)
    throw new Error(`Documentation metadata missing for ${pathname}. Run npm run docs:generate.`);
  const sourceFiles = metadata.files
    .map((file) => `### ${file.path}\n\`\`\`${file.language}\n${file.code}\n\`\`\``)
    .join("\n\n");
  const aiPrompt = `# ${metadata.componentName} 적용 요청\n\n${prompt ?? "아래 컴포넌트를 현재 프로젝트에 맞춰 적용해 주세요."}\n\n## 의존성\n${metadata.dependencies.join(", ") || "React"}\n\n## 사용 예제\n\`\`\`tsx\n${usage}\n\`\`\`\n\n## Props\n${metadata.props.map((prop) => `- ${prop.name}: ${prop.type}; 기본값: ${prop.defaultValue ?? "없음"}. ${prop.description}`).join("\n")}\n\n## 소스 파일\n${sourceFiles}\n\nimport 경로, CSS 및 에셋을 확인하고 키보드·모바일·모션 감소 환경을 검증해 주세요.`;
  return (
    <article>
      <div className="docs-breadcrumb">
        <Link href="/docs">Components</Link>
        <span>/</span>
        <span>{current?.category}</span>
      </div>
      <div className="docs-page-heading">
        <h1>
          {pathname.endsWith("/playground")
            ? title
            : metadata.componentName.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </h1>
      </div>
      <p className="docs-description">{description}</p>
      <ComponentTabs
        preview={preview}
        usage={usage}
        metadata={metadata}
        previewMode={previewMode}
        onReset={reset}
        controls={
          controlPanel ?? (controls ? <div className="docs-controls-grid">{controls}</div> : undefined)
        }
        actions={
          <>
            <button
              type="button"
              className="docs-icon-button"
              aria-label={favorites.includes(pathname) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              aria-pressed={favorites.includes(pathname)}
              onClick={() => toggleFavorite(pathname)}
            >
              {favorites.includes(pathname) ? "♥" : "♡"}
            </button>
            <CopyAction label="링크 복사" getText={() => window.location.href} />
            <CopyAction label="Copy for AI ↗" text={aiPrompt} />
          </>
        }
      />
      {(idea || prompt) && (
        <section className="docs-frame docs-application" id="application">
          <div className="docs-frame-heading">
            <h2>내 프로젝트에 적용하기</h2>
            <span>GUIDE</span>
          </div>
          <div className="docs-application-body">
            {idea && (
              <dl>
                {[
                  ["언제", idea.when],
                  ["무엇을", idea.what],
                  ["어떻게", idea.how],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {prompt && (
              <details>
                <summary>AI 프롬프트 살펴보기</summary>
                <p>{prompt}</p>
                <CopyAction text={prompt} label="프롬프트만 복사" />
              </details>
            )}
          </div>
        </section>
      )}
      <nav className="docs-page-pagination" aria-label="이전 다음 컴포넌트">
        <div>
          {previous ? (
            <Link href={previous.path}>
              <span aria-hidden="true">←</span>
              <span>
                <small>Previous</small>
                {previous.name}
              </span>
            </Link>
          ) : (
            <Link href="/docs">
              <span aria-hidden="true">←</span>
              <span>
                <small>Explore</small>모든 컴포넌트
              </span>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={next.path}>
              <span>
                <small>Next</small>
                {next.name}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
