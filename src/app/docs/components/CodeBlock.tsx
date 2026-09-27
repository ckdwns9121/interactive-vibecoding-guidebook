"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyAction from "./CopyAction";

export default function CodeBlock({
  code,
  language = "tsx",
  title,
  collapsible = false,
}: {
  code: string;
  language?: string;
  title: string;
  collapsible?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="docs-code-panel">
      <div className="docs-code-toolbar">
        <span>{title}</span>
        <CopyAction text={code} label="코드 복사" />
      </div>
      <div className={collapsible && !expanded ? "docs-code-collapsed" : ""}>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "20px",
            fontSize: "12px",
            lineHeight: "1.8",
            background: "transparent",
          }}
          showLineNumbers={language !== "bash"}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      {collapsible && (
        <button
          type="button"
          className="docs-expand-code"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "코드 접기 ↑" : "전체 코드 보기 ↓"}
        </button>
      )}
    </div>
  );
}
