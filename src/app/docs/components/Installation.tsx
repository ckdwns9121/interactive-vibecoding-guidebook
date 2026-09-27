"use client";

import { useState } from "react";
import CopyAction from "./CopyAction";

export default function Installation({
  dependencies,
  compact = false,
}: {
  dependencies: string[];
  compact?: boolean;
}) {
  const [manager, setManager] = useState("npm");
  const command = `${manager} ${manager === "npm" ? "install" : "add"} ${dependencies.join(" ")}`;
  if (!dependencies.length)
    return (
      <section id="dependencies" className="docs-dependencies">
        <div>
          <h2>Dependencies</h2>
          <p>React 외 추가 패키지가 필요하지 않습니다.</p>
        </div>
      </section>
    );
  return (
    <section id="dependencies" className={compact ? "docs-dependencies" : "docs-installation"}>
      <div className="docs-install-heading">
        <div>
          <h2>{compact ? "Dependencies" : "Install"}</h2>
          <p>
            {compact ? `${dependencies.length} required packages` : "프로젝트에 필요한 패키지를 설치하세요."}
          </p>
        </div>
        {!compact && (
          <label className="docs-manager">
            <span className="sr-only">패키지 매니저</span>
            <select value={manager} onChange={(event) => setManager(event.target.value)}>
              {["npm", "pnpm", "yarn", "bun"].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="docs-install-command">
        <code>{command}</code>
        <CopyAction text={command} label="명령 복사" />
      </div>
    </section>
  );
}
