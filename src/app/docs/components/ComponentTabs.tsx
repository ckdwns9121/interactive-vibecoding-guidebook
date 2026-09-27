"use client";

import { Fragment, ReactNode, useId, useState } from "react";
import type { ComponentDocMetadata } from "@/types/docs";
import dynamic from "next/dynamic";
const CodeBlock = dynamic(() => import("./CodeBlock"), {
  loading: () => <p className="docs-source-help">코드를 불러오는 중…</p>,
});
import Installation from "./Installation";
import PropsTable from "./PropsTable";

type Tab = "preview" | "code";
interface ComponentTabsProps {
  preview: ReactNode;
  usage: string;
  metadata: ComponentDocMetadata;
  controls?: ReactNode;
  actions?: ReactNode;
  previewMode?: "default" | "scroll";
  onReset: () => void;
}
export default function ComponentTabs({
  preview,
  usage,
  metadata,
  controls,
  actions,
  previewMode = "default",
  onReset,
}: ComponentTabsProps) {
  const id = useId();
  const [tab, setTab] = useState<Tab>("preview");
  const [replay, setReplay] = useState(0);
  const [filePath, setFilePath] = useState(metadata.files[0]?.path);
  const file = metadata.files.find((entry) => entry.path === filePath) ?? metadata.files[0];
  return (
    <>
      <div className="docs-tabs-toolbar">
        <div className="docs-tab-bar" role="tablist" aria-label="컴포넌트 보기">
          {(["preview", "code"] as const).map((value) => (
            <button
              key={value}
              type="button"
              id={`${id}-tab-${value}`}
              role="tab"
              aria-controls={`${id}-panel-${value}`}
              aria-selected={tab === value}
              tabIndex={tab === value ? 0 : -1}
              onClick={() => setTab(value)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? "preview"
                    : event.key === "End"
                      ? "code"
                      : tab === "preview"
                        ? "code"
                        : "preview";
                setTab(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }}
            >
              <span aria-hidden="true">{value === "preview" ? "◉" : "‹ ›"}</span>{" "}
              {value === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>
        <div className="docs-component-actions">
          <div className="docs-actions-desktop">{actions}</div>
          <details className="docs-actions-mobile">
            <summary aria-label="컴포넌트 작업">•••</summary>
            <div>{actions}</div>
          </details>
        </div>
      </div>
      <div
        id={`${id}-panel-preview`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-preview`}
        hidden={tab !== "preview"}
        tabIndex={0}
      >
        {tab === "preview" && (
          <>
            <div
              className={`docs-preview ${previewMode === "scroll" ? "docs-preview-scroll" : ""}`}
              id="preview"
            >
              <div className="docs-preview-tools">
                <button
                  type="button"
                  className="docs-icon-button"
                  onClick={() => setReplay((value) => value + 1)}
                  aria-label="애니메이션 다시 재생"
                  title="애니메이션 다시 재생"
                >
                  ↻
                </button>
              </div>
              {previewMode === "scroll" && (
                <p className="docs-scroll-hint">↓ 페이지를 스크롤하며 효과를 확인하세요.</p>
              )}
              <div className="docs-preview-stage">
                <Fragment key={replay}>{preview}</Fragment>
              </div>
            </div>
            {controls && (
              <section className="docs-frame docs-customize" id="customize">
                <div className="docs-frame-heading">
                  <h2>Customize</h2>
                  <button type="button" className="docs-text-button" onClick={onReset}>
                    ↺ 초기화
                  </button>
                </div>
                <div className="docs-customize-body">{controls}</div>
              </section>
            )}
            <PropsTable props={metadata.props} />
            <Installation dependencies={metadata.dependencies} compact />
          </>
        )}
      </div>
      <div
        id={`${id}-panel-code`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-code`}
        hidden={tab !== "code"}
        tabIndex={0}
      >
        {tab === "code" && (
          <div className="docs-code-content">
            <Installation dependencies={metadata.dependencies} />
            <section id="usage">
              <h2 className="docs-section-title">Usage</h2>
              <CodeBlock code={usage} title="사용 예제 · TSX" />
            </section>
            <section id="source">
              <div className="docs-source-heading">
                <h2 className="docs-section-title">Code</h2>
                <span className="docs-badge">TypeScript + Tailwind</span>
              </div>
              <p className="docs-source-help">
                소스 파일을 같은 경로로 복사하거나, import 경로를 프로젝트에 맞게 수정하세요. CSS·훅 등 함께
                필요한 파일도 포함됩니다. 이미지 경로는 프로젝트의 public 에셋이나 사용할 이미지 URL로
                바꾸세요.
              </p>
              {metadata.files.length > 1 && (
                <label className="docs-file-picker">
                  <span>
                    파일 <small>{metadata.files.length}</small>
                  </span>
                  <select value={file?.path} onChange={(event) => setFilePath(event.target.value)}>
                    {metadata.files.map((entry) => (
                      <option value={entry.path} key={entry.path}>
                        {entry.path}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {file && (
                <CodeBlock
                  key={file.path}
                  code={file.code}
                  language={file.language}
                  title={file.path.split("/").pop() ?? "Source"}
                  collapsible
                />
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
}
