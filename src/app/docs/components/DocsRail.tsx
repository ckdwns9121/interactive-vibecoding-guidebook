"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docEntries } from "@/lib/docs/catalog";

export default function DocsRail() {
  const pathname = usePathname();
  const current = docEntries.find((item) => item.path === pathname);
  const related = docEntries
    .filter((item) => item.category === (current?.category ?? "Typography") && item.path !== pathname)
    .slice(0, 3);
  return (
    <aside className="docs-rail" aria-label="문서 활용 가이드">
      <div className="docs-rail-card">
        <div className="docs-rail-art" aria-hidden="true">
          <span>
            make it
            <br />
            <em>interactive.</em>
          </span>
          <i>↗</i>
        </div>
        <div className="docs-rail-body">
          <h2>
            아이디어에서
            <br />
            인터랙션까지.
          </h2>
          <p>
            직접 확인하고, 값을 바꾸고,
            <br />내 프로젝트에 가져가세요.
          </p>
          <Link href="/docs/getting-started" className="docs-primary-link">
            사용 가이드 보기 <span>↗</span>
          </Link>
        </div>
      </div>
      <section className="docs-rail-card docs-rail-body">
        <h2>작게 시작해 보세요</h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Preview</strong>
              <p>움직임을 직접 확인하세요.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Customize</strong>
              <p>원하는 느낌으로 조절하세요.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Code / Copy for AI</strong>
              <p>코드나 AI 요청으로 가져가세요.</p>
            </div>
          </li>
        </ol>
      </section>
      <section className="docs-rail-card docs-rail-body">
        <h2>함께 살펴보기</h2>
        <div className="docs-related">
          {related.map((item) => (
            <Link key={item.path} href={item.path}>
              {item.name}
              <span>↗</span>
            </Link>
          ))}
        </div>
      </section>
      <p className="docs-rail-note">
        React · TypeScript · Tailwind CSS
        <br />
        Made for your next interaction.
      </p>
    </aside>
  );
}
