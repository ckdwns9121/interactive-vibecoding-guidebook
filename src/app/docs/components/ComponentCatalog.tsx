"use client";

import Link from "next/link";
import { useState } from "react";
import {
  categories as menuTree,
  categorySymbols as symbols,
  docEntries,
  searchEntries,
} from "@/lib/docs/catalog";
import { useDocsPreferences } from "./DocsPreferences";

export default function ComponentCatalog({ favoritesOnly = false }: { favoritesOnly?: boolean }) {
  const { favorites } = useDocsPreferences();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const items = docEntries;
  const visible = searchEntries(query, items).filter(
    (item) =>
      (!favoritesOnly || favorites.includes(item.path)) && (category === "All" || item.category === category),
  );
  return (
    <>
      <div className="docs-eyebrow">BUILD SOMETHING THAT MOVES</div>
      <h1 className="docs-hero-title">
        {favoritesOnly ? (
          <>
            다시 쓰고 싶은
            <br />
            <span>인터랙션 모음.</span>
          </>
        ) : (
          <>
            아이디어에
            <br />
            <span>움직임을 더하세요.</span>
          </>
        )}
      </h1>
      <p className="docs-lead">
        {favoritesOnly ? (
          "컴포넌트의 하트를 눌러 저장한 목록입니다. 이 브라우저에 보관돼요."
        ) : (
          <>
            직접 만져보고, 원하는 대로 바꾸고, 코드로 가져가세요.
            <br />웹 인터랙션을 만드는 가장 구체적인 출발점.
          </>
        )}
      </p>
      <div className="docs-hero-meta">
        <span>{items.length}개의 예제</span>
        <span>5개의 카테고리</span>
        <Link href="/docs/getting-started">처음이라면 여기서 시작 →</Link>
      </div>
      <section aria-label="컴포넌트 카탈로그" className="docs-catalog">
        <div className="docs-catalog-heading">
          <h2>컴포넌트 둘러보기</h2>
          <label className="docs-search">
            <span className="sr-only">카탈로그 검색</span>
            <input
              type="search"
              placeholder="어떤 효과를 찾으세요?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div className="docs-filters" aria-label="카테고리 필터">
          {["All", ...menuTree.map((group) => group.category)].map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name === "All" ? "전체" : name}
            </button>
          ))}
        </div>
        <p className="docs-result-count" role="status">
          {visible.length}개의 예제
        </p>
        <div className="docs-card-grid">
          {visible.map((item) => (
            <Link key={item.path} href={item.path} className="docs-card">
              <div className="docs-card-art" data-category={item.category}>
                <span aria-hidden="true">{symbols[item.category]}</span>
                <small>{item.category}</small>
                <span className="docs-card-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="docs-card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="docs-empty">
            <p>
              {favoritesOnly
                ? "저장한 컴포넌트가 없거나 필터와 일치하지 않아요. 문서의 하트를 눌러 모아 보세요."
                : "일치하는 컴포넌트가 없어요. 다른 검색어를 입력해 보세요."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              전체 보기
            </button>
          </div>
        )}
      </section>
    </>
  );
}
