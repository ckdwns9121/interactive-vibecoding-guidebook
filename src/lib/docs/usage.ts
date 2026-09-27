type UsageChildren = string | UsageChildren[] | null | undefined;

/** Safely preserve text as a JSX expression, including quotes and angle brackets. */
export function usageText(value: string | number): string {
  return `{${JSON.stringify(value)}}`;
}

/** Build copyable TSX from explicit live props; never inspect or stringify functions. */
export function usageElement(
  name: string,
  props: Record<string, unknown> = {},
  children?: UsageChildren,
): string {
  const attributes = Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (typeof value === "function") throw new Error(`Provide an explicit example for callback ${key}.`);
      const cssVariables =
        key === "style" &&
        value &&
        typeof value === "object" &&
        Object.keys(value).some((key) => key.startsWith("--"));
      return `  ${key}={${JSON.stringify(value)}${cssVariables ? " as CSSProperties" : ""}}`;
    });
  const opening = attributes.length ? `<${name}\n${attributes.join("\n")}\n` : `<${name}`;
  const flatten = (value: UsageChildren): string[] =>
    Array.isArray(value) ? value.flatMap(flatten) : value ? [value] : [];
  const content = flatten(children).join("\n");
  if (!content) return `${opening}${attributes.length ? "/>" : " />"}`;
  return `${opening}>\n${content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}\n</${name}>`;
}

/** Imports are source-level statements supplied explicitly by each demo. */
export function generateUsage(markup: string, imports: string[]): string {
  const styleImport = markup.includes(" as CSSProperties")
    ? ['import type { CSSProperties } from "react";']
    : [];
  return `"use client";\n\n${[...styleImport, ...imports].join("\n")}\n\nexport default function Example() {\n  return (\n${markup
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n")}\n  );\n}`;
}
