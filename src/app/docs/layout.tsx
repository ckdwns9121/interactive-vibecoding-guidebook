"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DocsSidebar from "./components/DocsSidebar";
import DocsSearch from "./components/DocsSearch";
import DocsRail from "./components/DocsRail";
import { DocsPreferences } from "./components/DocsPreferences";
import DemoReset from "./components/DemoReset";
import "./docs.css";

export default function DocsPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => {
      element?.close();
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <DocsPreferences>
      <div className="docs-shell">
        <a href="#docs-content" className="docs-skip">
          본문으로 건너뛰기
        </a>
        <header className="docs-header">
          <div className="docs-header-left">
            <Link href="/docs" className="docs-brand">
              <span className="docs-brand-mark" aria-hidden="true">
                ✳
              </span>
              Interaction Guide
            </Link>
            <span className="docs-header-divider">/</span>
            <Link href="/docs" className="docs-header-link docs-header-link-active">
              Docs
            </Link>
            <Link href="/docs/typography/playground" className="docs-header-link">
              Playground
            </Link>
          </div>
          <div className="docs-header-right">
            <DocsSearch />
            <Link href="/docs/getting-started" className="docs-header-cta">
              시작하기 ↗
            </Link>
            <button
              type="button"
              className="docs-button docs-mobile-toggle"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              메뉴
            </button>
          </div>
        </header>
        <aside className="docs-sidebar">
          <DocsSidebar />
        </aside>
        <dialog
          ref={dialog}
          className="docs-mobile-nav"
          aria-label="문서 탐색 메뉴"
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="docs-mobile-heading">
            <span>Interaction Guide</span>
            <button type="button" className="docs-button" onClick={() => setOpen(false)}>
              닫기 ×
            </button>
          </div>
          <DocsSidebar onNavigate={() => setOpen(false)} />
        </dialog>
        <div className="docs-body">
          <main id="docs-content" tabIndex={-1} className="docs-main">
            <DemoReset key={pathname}>{children}</DemoReset>
            <footer className="docs-footer">
              <span>Interaction Guide</span>
              <span>직접 만들고, 움직여 보세요.</span>
            </footer>
          </main>
          <DocsRail />
        </div>
      </div>
    </DocsPreferences>
  );
}
