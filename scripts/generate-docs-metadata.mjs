/** Generate browser-safe documentation from the component source of truth. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const motion = "src/components/common/framer-motion/";
// Explicit entries prevent a similarly named demo/helper from becoming the API reference.
const entries = {
  "typography/typing": ["typography/typing-text/TypingText"],
  "typography/scramble": ["typography/TextScramble"],
  "typography/magnetic": ["typography/MagneticLetters"],
  "typography/revealtext": ["typography/reveal-text/RevealText"],
  "typography/glitch": ["typography/glitch-text/GlitchText"],
  "typography/morphing": ["typography/morphing-text/MorphingText"],
  "typography/scroll-marquee": ["typography/ScrollMarqueeText"],
  "typography/scroll-trigger-text": ["typography/ScrollTriggerText"],
  "typography/text-clip-effect": ["typography/TextClipEffectItem", "typography/TextClipEffect"],
  "typography/text-3d": ["typography/Text3D"],
  "typography/paint-fill-text": ["typography/paint-fill-text/PaintFillText"],
  "typography/liquid-text": ["typography/liquid-text/LiquidText"],
  "typography/dissolve-text": ["typography/dissolve-text/DissolveText"],
  "typography/pixel-dissolve-text": ["typography/pixel-dissolve-text/PixelDissolveText"],
  "typography/playground": ["typography/morphing-text/MorphingText"],
  "interaction/scroll-dot-flip": ["../effects/scroll-dot-flip/ScrollDotFlip"],
  "interaction/tilt-card": ["../effects/TiltCard"],
  "interaction/parallax": ["ParallaxImage"],
  "interaction/zoom-bg": ["ZoomScrollBg"],
  "interaction/sticky-shrink": ["StickyShrinkSection"],
  "interaction/scroll-portfolio-cards": ["HorizontalScrollPortfolioCards"],
  "interaction/sticky-stack": ["StickyStackSections"],
  "interaction/dynamic-island": ["DynamicIsland"],
  "cursor/animated-list": ["AnimatedTextListWithCursor"],
  "cursor/overlay-cursor-demo": ["cursor/OverlayCursor", "cursor/GlobalCursor"],
  "cursor/magnetic": ["cursor/MagneticCursor", "cursor/MagneticTargetBox"],
  "background/noise-grain-bg": ["background/noise-grain-bg/NoiseGrainBG"],
  "background/dot-grid-bg": ["background/dot-grid-bg/DotGridBG"],
  "card/glassmorphism-card": ["card/glassmorphism-card/GlassmorphismCard"],
};
const absolute = (value) => path.resolve(root, value);
const relative = (value) => path.relative(root, value).split(path.sep).join("/");
const config = ts.readConfigFile(absolute("tsconfig.json"), ts.sys.readFile);
const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(
  Object.values(entries)
    .flat()
    .map((value) => absolute(`${motion}${value}.tsx`)),
  options,
);
const checker = program.getTypeChecker();

function resolveLocal(specifier, filename) {
  const clean = specifier.replace(/\?raw$/, "");
  const base = clean.startsWith("@/")
    ? absolute(`src/${clean.slice(2)}`)
    : path.resolve(path.dirname(filename), clean);
  const resolved = ["", ".ts", ".tsx", ".js", ".jsx", ".css", "/index.ts", "/index.tsx"]
    .map((ext) => base + ext)
    .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!resolved || !resolved.startsWith(absolute("src") + path.sep))
    throw new Error(`Unresolved local import ${specifier} in ${relative(filename)}`);
  return resolved;
}

function sources(entryFiles) {
  const seen = new Set();
  const dependencies = new Set();
  const files = [];
  function visit(filename) {
    if (seen.has(filename)) return;
    seen.add(filename);
    const code = fs.readFileSync(filename, "utf8");
    const language = filename.endsWith(".css") ? "css" : filename.endsWith(".tsx") ? "tsx" : "typescript";
    files.push({ path: relative(filename), code, language });
    if (language === "css") return;
    const source =
      program.getSourceFile(filename) ?? ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true);
    for (const statement of source.statements) {
      if (
        (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) ||
        !statement.moduleSpecifier
      )
        continue;
      const specifier = statement.moduleSpecifier.text;
      if (specifier.startsWith(".") || specifier.startsWith("@/")) visit(resolveLocal(specifier, filename));
      else {
        const typeOnly =
          statement.isTypeOnly ||
          statement.importClause?.isTypeOnly ||
          (statement.importClause?.namedBindings &&
            ts.isNamedImports(statement.importClause.namedBindings) &&
            !statement.importClause.name &&
            statement.importClause.namedBindings.elements.every((element) => element.isTypeOnly));
        const packageName = specifier.startsWith("@")
          ? specifier.split("/").slice(0, 2).join("/")
          : specifier.split("/")[0];
        if (!typeOnly && !["react", "react-dom"].includes(packageName)) dependencies.add(packageName);
      }
    }
  }
  entryFiles.forEach(visit);
  return { files, dependencies: [...dependencies].sort() };
}

function resolveDefault(expression, seen = new Set()) {
  if (ts.isIdentifier(expression) || ts.isPropertyAccessExpression(expression)) {
    let symbol = checker.getSymbolAtLocation(
      ts.isPropertyAccessExpression(expression) ? expression.name : expression,
    );
    if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
    const declaration = symbol?.valueDeclaration;
    if (declaration?.initializer && !seen.has(declaration)) {
      seen.add(declaration);
      return resolveDefault(declaration.initializer, seen);
    }
  }
  // Keep expressions verbatim: do not evaluate code or infer runtime values.
  return expression.getText();
}

function getProps(source, componentName) {
  let propsNode;
  function findType(node) {
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isImportSpecifier(node)) &&
      node.name?.text === `${componentName}Props`
    )
      propsNode = node;
    ts.forEachChild(node, findType);
  }
  findType(source);
  // OverlayCursor exports a provider; named props are more accurate than the filename.
  if (!propsNode)
    propsNode = source.statements.find(
      (node) =>
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
        node.name.text.endsWith("Props"),
    );
  if (!propsNode) return [];
  let symbol = checker.getSymbolAtLocation(propsNode.name);
  if (symbol?.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  const type = symbol ? checker.getDeclaredTypeOfSymbol(symbol) : checker.getTypeAtLocation(propsNode);
  const properties = type.getProperties();
  const defaults = new Map();
  function findDefaults(node) {
    if (ts.isParameter(node) && ts.isObjectBindingPattern(node.name)) {
      const names = node.name.elements.map((element) => (element.propertyName ?? element.name).getText());
      const parameterProperties = checker.getTypeAtLocation(node).getProperties();
      const matchesPublicType =
        parameterProperties.length === properties.length &&
        properties.every((prop) =>
          parameterProperties.some((parameterProp) => parameterProp.name === prop.name),
        );
      // Match the parameter type, even when a declared optional prop is unused.
      if (matchesPublicType || properties.every((prop) => names.includes(prop.name))) {
        for (const element of node.name.elements)
          if (element.initializer)
            defaults.set(
              (element.propertyName ?? element.name).getText(),
              resolveDefault(element.initializer),
            );
      }
    }
    ts.forEachChild(node, findDefaults);
  }
  findDefaults(source);
  return properties.map((property) => {
    const declaration = property.valueDeclaration ?? property.declarations?.[0];
    const declarationSource = declaration.getSourceFile();
    const comments = ts.displayPartsToString(property.getDocumentationComment(checker));
    const trailing = ts.getTrailingCommentRanges(declarationSource.text, declaration.end) ?? [];
    const description =
      comments ||
      trailing
        .map((range) =>
          declarationSource.text
            .slice(range.pos, range.end)
            .replace(/^\/\/\s?/, "")
            .replace(/^\/\*\*?|\*\/$/g, "")
            .trim(),
        )
        .join(" ");
    return {
      name: property.name,
      type:
        declaration.type?.getText() ??
        checker.typeToString(checker.getTypeOfSymbolAtLocation(property, declaration)),
      defaultValue: defaults.get(property.name) ?? null,
      required: !(property.flags & ts.SymbolFlags.Optional),
      description,
    };
  });
}

const metadata = {};
for (const [route, entryPaths] of Object.entries(entries)) {
  const entryFiles = entryPaths.map((value) => absolute(`${motion}${value}.tsx`));
  const source = program.getSourceFile(entryFiles[0]);
  const defaultFunction = source.statements.find(
    (node) =>
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword),
  );
  const componentName = defaultFunction?.name?.text ?? path.basename(entryFiles[0], ".tsx");
  metadata[`/docs/${route}`] = {
    componentName,
    sourcePath: relative(entryFiles[0]),
    props: getProps(source, componentName),
    ...sources(entryFiles),
  };
}
// Keep route coverage synchronized with the catalogue without executing application code.
const menuSource = fs.readFileSync(absolute("src/app/docs/components/menuTree.ts"), "utf8");
const menuRoutes = [...menuSource.matchAll(/path:\s*["'](\/docs\/[^"']+)["']/g)].map((match) => match[1]);
if (
  menuRoutes.some((route) => !metadata[route]) ||
  Object.keys(metadata).some((route) => !menuRoutes.includes(route))
)
  throw new Error("Catalogue routes and metadata entries differ. Update the explicit entries map.");
const target = absolute("src/data/component-docs.generated.json");
const output = JSON.stringify(metadata, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== output)
    throw new Error("Documentation metadata is stale. Run node scripts/generate-docs-metadata.mjs");
  console.log(`Verified ${Object.keys(metadata).length} documentation entries.`);
} else {
  fs.writeFileSync(target, output);
  console.log(`Generated ${Object.keys(metadata).length} documentation entries.`);
}
