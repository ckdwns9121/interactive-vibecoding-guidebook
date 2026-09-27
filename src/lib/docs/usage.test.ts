import ts from "typescript";
import { generateUsage, usageElement, usageText } from "./usage";

function syntaxErrors(code: string) {
  return ts
    .transpileModule(code, {
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
      fileName: "Example.tsx",
      reportDiagnostics: true,
    })
    .diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
}

test("live values produce complete, valid TSX while preserving hostile text", () => {
  const text = 'Hello <world> & "quotes" {braces}\n다음 줄';
  const code = generateUsage(
    usageElement("TypingText", { text, speed: 250, loop: false, progress: undefined }),
    ['import TypingText from "./TypingText";'],
  );
  expect(code).toContain(`text={${JSON.stringify(text)}}`);
  expect(code).toContain("speed={250}");
  expect(code).toContain("loop={false}");
  expect(code).not.toContain("progress=");
  expect(syntaxErrors(code)).toEqual([]);
});

test("nested and mapped children preserve JSX boundaries and CSS variables", () => {
  const code = generateUsage(
    usageElement("div", { style: { "--text-color": "#fa3" } }, [
      usageElement("h2", {}, usageText('<script>alert("text")</script>')),
      [1, 2].map((value) => usageElement("span", { title: `Item ${value}` }, usageText(value))),
    ]),
    [],
  );
  expect(code).toContain('import type { CSSProperties } from "react";');
  expect(code).toContain('title={"Item 2"}');
  expect(syntaxErrors(code)).toEqual([]);
});

test("callback props need explicit source examples", () => {
  expect(() => usageElement("Button", { onClick: () => undefined })).toThrow("explicit example");
});
