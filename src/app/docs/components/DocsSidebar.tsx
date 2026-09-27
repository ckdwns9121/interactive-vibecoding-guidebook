"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { categories, categorySymbols, docEntries, searchEntries } from "@/lib/docs/catalog";
import { useDocsPreferences } from "./DocsPreferences";

export default function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const active = useRef<HTMLAnchorElement>(null);
  const { favorites } = useDocsPreferences();
  const matches = new Set(searchEntries(query).map((entry) => entry.path));
  const filtered = categories
    .filter((group) => category === "All" || group.category === category)
    .map((group) => ({ ...group, items: group.items.filter((item) => matches.has(item.path)) }))
    .filter((group) => group.items.length);
  useEffect(() => {
    active.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);
  return (
    <nav aria-label="컴포넌트 문서" className="docs-nav">
      <div className="docs-nav-tools">
        <div className="docs-category-icons" aria-label="탐색 카테고리">
          {["All", ...categories.map((group) => group.category)].map((name) => (
            <button
              type="button"
              key={name}
              title={name === "All" ? "전체 카테고리" : name}
              aria-label={name === "All" ? "전체 카테고리" : name}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name === "All" ? "⊞" : categorySymbols[name]}
            </button>
          ))}
        </div>
        <label className="docs-search">
          <span className="sr-only">컴포넌트 필터</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`${docEntries.length}개 컴포넌트 검색…`}
          />
        </label>
      </div>
      {!query && category === "All" && (
        <section className="docs-nav-group">
          <h2>Get Started</h2>
          <ul>
            {[
              { path: "/docs/getting-started", name: "시작하기" },
              { path: "/docs", name: "컴포넌트 둘러보기" },
              {
                path: "/docs/favorites",
                name: `즐겨찾기${favorites.length ? ` · ${favorites.length}` : ""}`,
              },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={pathname === item.path ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {filtered.map((group) => (
        <section key={group.category} className="docs-nav-group">
          <h2>
            {group.category}
            <span>{group.items.length}</span>
          </h2>
          <ul>
            {group.items.map((item) => (
              <li key={item.path}>
                <Link
                  ref={pathname === item.path ? active : undefined}
                  href={item.path}
                  aria-current={pathname === item.path ? "page" : undefined}
                  onClick={onNavigate}
                >
                  {item.name}
                  {favorites.includes(item.path) && (
                    <span className="docs-saved-dot" aria-label="즐겨찾기">
                      ♥
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {filtered.length === 0 && (
        <div role="status" className="docs-empty">
          검색 결과가 없어요.
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            필터 초기화
          </button>
        </div>
      )}
    </nav>
  );
}
