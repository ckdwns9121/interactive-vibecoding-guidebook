"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function CopyAction({
  text,
  label = "복사",
  className = "",
  getText,
}: {
  text?: string;
  label?: string;
  className?: string;
  getText?: () => string;
}) {
  const { copy, isCopied, error } = useCopyToClipboard();
  return (
    <span className={`docs-copy-action ${className}`}>
      <button type="button" className="docs-button" onClick={() => copy(getText ? getText() : (text ?? ""))}>
        {isCopied ? "복사 완료 ✓" : label}
      </button>
      <span role="status" className={error ? "docs-copy-error" : "sr-only"}>
        {error
          ? "복사하지 못했어요. 내용을 선택해 직접 복사해 주세요."
          : isCopied
            ? "클립보드에 복사했습니다."
            : ""}
      </span>
    </span>
  );
}
