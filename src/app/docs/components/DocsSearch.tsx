"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { searchEntries } from "@/lib/docs/catalog";

export default function DocsSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    input.current?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const element = dialog.current;
    return () => {
      element?.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [open]);
  const results = searchEntries(query);
  return (
    <>
      <button
        className="docs-search-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <span>
          ⌕ <span className="docs-search-label">검색...</span>
        </span>
        <kbd>⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="docs-search-dialog"
        aria-label="컴포넌트 검색"
        onCancel={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="docs-search-dialog-header">
          <label>
            <span className="sr-only">전체 컴포넌트 검색</span>
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="이름, 효과 또는 키워드 검색…"
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  dialog.current?.querySelector<HTMLAnchorElement>(".docs-search-results a")?.focus();
                }
              }}
            />
          </label>
          <button className="docs-button" type="button" onClick={() => setOpen(false)}>
            닫기
          </button>
        </div>
        <div
          className="docs-search-results"
          onKeyDown={(event) => {
            if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
            const links = Array.from(event.currentTarget.querySelectorAll("a"));
            const index = links.indexOf(document.activeElement as HTMLAnchorElement);
            if (index === -1) return;
            event.preventDefault();
            links[(index + (event.key === "ArrowDown" ? 1 : links.length - 1)) % links.length]?.focus();
          }}
        >
          {results.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => setOpen(false)}>
              <span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </span>
              <span>{item.category} ↗</span>
            </Link>
          ))}
          {!results.length && (
            <p className="docs-empty" role="status">
              검색 결과가 없어요. 다른 키워드를 입력해 보세요.
            </p>
          )}
        </div>
        <div className="docs-search-help">↑ ↓ 이동 · Enter 열기 · Esc 닫기</div>
      </dialog>
    </>
  );
}
