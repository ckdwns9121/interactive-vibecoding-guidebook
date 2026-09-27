import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = JSON.parse(fs.readFileSync(path.join(root, "src/data/component-docs.generated.json"), "utf8"));
const prop = (route, name) => docs[`/docs/${route}`].props.find((value) => value.name === name);

test("generated docs are reproducible and cover the whole catalogue", () => {
  assert.equal(Object.keys(docs).length, 29);
  for (const doc of Object.values(docs)) {
    for (const prop of doc.props)
      assert.ok(prop.description.trim(), `${doc.componentName}.${prop.name} needs a source description`);
  }
  execFileSync(process.execPath, ["scripts/generate-docs-metadata.mjs", "--check"], { cwd: root });
});

test("API defaults and comments are source-derived, including partial destructuring", () => {
  assert.equal(prop("typography/typing", "speed").defaultValue, "100");
  assert.equal(prop("typography/typing", "text").required, true);
  assert.match(prop("typography/typing", "speed").description, /밀리초/);
  assert.equal(prop("typography/scroll-trigger-text", "duration").defaultValue, "0.8");
  assert.equal(prop("typography/scroll-trigger-text", "finalX").defaultValue, null);
  assert.equal(prop("interaction/sticky-stack", "sections").required, true);
  assert.equal(docs["/docs/cursor/magnetic"].props.length, 0);
});

test("copyable files include imported types, CSS, and cursor companions", () => {
  assert.ok(
    docs["/docs/interaction/sticky-stack"].files.some((file) => file.path.endsWith("types/section.ts")),
  );
  assert.deepEqual(docs["/docs/typography/text-clip-effect"].dependencies, ["gsap"]);
  assert.ok(docs["/docs/typography/text-clip-effect"].files.some((file) => file.language === "css"));
  assert.equal(docs["/docs/cursor/overlay-cursor-demo"].files.length, 3);
  assert.ok(docs["/docs/cursor/magnetic"].files.some((file) => file.path.endsWith("MagneticTargetBox.tsx")));
  for (const doc of Object.values(docs)) {
    assert.ok(!doc.dependencies.includes("react"));
    for (const file of doc.files)
      assert.equal(file.code, fs.readFileSync(path.join(root, file.path), "utf8"));
  }
});
