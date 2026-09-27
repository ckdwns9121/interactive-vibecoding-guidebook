import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import registry from "../../src/data/component-docs.generated.json";

const artifacts = ".omx/artifacts/visual-ralph/react-bits";
const routes = Object.entries(registry);
const typingRoute = "/docs/typography/typing";

async function openCode(page: Page) {
  await page.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
}

async function clipboard(page: Page) {
  return page.evaluate(() => navigator.clipboard.readText());
}

for (const [route, metadata] of routes) {
  test(`documentation contract: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".docs-page-heading").getByRole("heading", { level: 1 })).toHaveText(
      route.endsWith("/playground")
        ? "Typography Playground"
        : metadata.componentName.replace(/([a-z])([A-Z])/g, "$1 $2"),
    );
    await expect(page.getByRole("tab", { name: "Preview", exact: true })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeAttached();
    await openCode(page);
    await expect(page.locator("#source").getByRole("heading", { name: "Code", exact: true })).toBeVisible();
    await expect(page.locator("#source pre")).toContainText(
      metadata.files[0].code.split("\n").find((line) => line.trim())!,
    );
    await page.getByRole("tab", { name: "Preview", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeAttached();
    expect(errors).toEqual([]);
  });
}

test("typing customization, reset, separate Usage/source copy and package managers", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(typingRoute, { waitUntil: "networkidle" });
  await page.getByRole("textbox", { name: "Texts", exact: true }).fill("Browser verified headline");
  await openCode(page);
  await expect(page.locator("#usage pre")).toContainText("Browser verified headline");
  await page.locator("#usage").getByRole("button", { name: "코드 복사", exact: true }).click();
  await expect.poll(() => clipboard(page)).toContain("Browser verified headline");
  const usageCopy = await clipboard(page);
  await page.locator("#source").getByRole("button", { name: "코드 복사", exact: true }).click();
  await expect.poll(() => clipboard(page)).toBe(registry[typingRoute].files[0].code);
  expect(await clipboard(page)).not.toBe(usageCopy);
  await page.getByLabel("패키지 매니저").selectOption("pnpm");
  await expect(page.locator(".docs-install-command code")).toHaveText(
    `pnpm add ${registry[typingRoute].dependencies.join(" ")}`,
  );
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await page.getByRole("button", { name: "초기화" }).click();
  await expect(page.getByRole("textbox", { name: "Texts", exact: true })).toHaveValue("타이포그래피");
  await openCode(page);
  await expect(page.locator("#usage pre")).not.toContainText("Browser verified headline");
});

test("source picker includes and copies its CSS dependency", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const entry = routes.find(
    ([route, metadata]) =>
      route.endsWith("paint-fill-text") && metadata.files.some((file) => file.path.endsWith(".css")),
  );
  expect(entry).toBeDefined();
  const [route, metadata] = entry!;
  const css = metadata.files.find((file) => file.path.endsWith(".css"))!;
  await page.goto(route, { waitUntil: "networkidle" });
  await openCode(page);
  await page.locator("#source").getByRole("combobox").selectOption(css.path);
  await expect(page.locator("#source pre")).toContainText(css.code.split("\n").find((line) => line.trim())!);
  await page.locator("#source").getByRole("button", { name: "코드 복사", exact: true }).click();
  await expect.poll(() => clipboard(page)).toBe(css.code);
});

test("favorites persist after reload and appear in the saved catalogue", async ({ page }) => {
  await page.goto(typingRoute, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "즐겨찾기 추가", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "즐겨찾기 해제", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goto("/docs/favorites", { waitUntil: "networkidle" });
  await expect(page.locator(`main a[href="${typingRoute}"]`)).toBeVisible();
});

test("global search supports shortcut, keyboard navigation and Escape", async ({ page }) => {
  await page.goto("/docs", { waitUntil: "networkidle" });
  await page.keyboard.press("ControlOrMeta+k");
  const search = page.getByRole("dialog", { name: "컴포넌트 검색", exact: true });
  await expect(search).toBeVisible();
  await search.getByRole("searchbox").fill("typing");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${typingRoute}$`));
  await expect(search).not.toBeVisible();
  await page.keyboard.press("ControlOrMeta+k");
  await expect(search).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(search).not.toBeVisible();
});

for (const route of [
  typingRoute,
  "/docs/interaction/dynamic-island",
  "/docs/typography/morphing",
  "/docs/interaction/sticky-stack",
  "/docs/cursor/magnetic",
]) {
  test(`mobile contains document width: ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".docs-page-heading").getByRole("heading", { level: 1 })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);
    await openCode(page);
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
      .toBeLessThanOrEqual(1);
  });
}

test("mobile menu dismisses and restores trigger focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(typingRoute, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "메뉴", exact: true });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "문서 탐색 메뉴", exact: true });
  await expect(menu).toBeVisible();
  await menu.getByRole("button", { name: "닫기 ×", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("sticky stack layers and horizontal portfolio respond to real document scroll", async ({ page }) => {
  await page.goto("/docs/interaction/sticky-stack", { waitUntil: "networkidle" });
  const first = page.getByRole("heading", { name: "Discover.", exact: true });
  const second = page.getByRole("heading", { name: "Create.", exact: true });
  await first.scrollIntoViewIfNeeded();
  const firstY = await first.evaluate((node) => node.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + window.innerHeight), firstY);
  await expect
    .poll(() =>
      second.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      }),
    )
    .toBe(true);
  const layers = await page
    .locator("#preview .sticky")
    .evaluateAll((nodes) => nodes.map((node) => Number(getComputedStyle(node).zIndex)));
  expect(layers[1]).toBeGreaterThan(layers[0]);
  await page.goto("/docs/interaction/scroll-portfolio-cards", { waitUntil: "networkidle" });
  const track = page.locator("#preview .w-max");
  const original = await track.evaluate((node) => node.getBoundingClientRect().left);
  const start = await page
    .locator("#preview")
    .evaluate((node) => node.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((top) => window.scrollTo(0, top + window.innerHeight * 2), start);
  await expect
    .poll(() => track.evaluate((node) => node.getBoundingClientRect().left))
    .toBeLessThan(original - 100);
  await expect(page.locator("#preview").getByText("0%", { exact: true })).toHaveCount(0);
});

test("capture final desktop, mobile and code references", async ({ page }) => {
  await mkdir(artifacts, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(typingRoute, { waitUntil: "networkidle" });
  await page.getByRole("textbox", { name: "Texts", exact: true }).fill("Build with motion.");
  await expect(page.locator("#preview")).toContainText("Build with motion.");
  await page.screenshot({ path: `${artifacts}/final-desktop.png`, animations: "disabled" });
  await openCode(page);
  await page.screenshot({ path: `${artifacts}/final-code.png`, animations: "disabled" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator("#preview")).toContainText("Build with motion.");
  await page.screenshot({ path: `${artifacts}/final-mobile.png`, animations: "disabled" });
});
