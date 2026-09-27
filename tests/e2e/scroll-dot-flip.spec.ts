import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const route = "/docs/interaction/scroll-dot-flip";
const output = ".omx/artifacts/scroll-dot-flip";

test("scroll reveals random flipping tiles, ends in sampled dots, and replays on re-entry", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await mkdir(output, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(route, { waitUntil: "networkidle" });
  const photo = page.locator("[data-dot-flip]");
  await expect(photo).toHaveAttribute("data-state", "photo");
  await photo.screenshot({ path: `${output}/photo.png` });
  // Screenshot scrolling may already trigger the animation. Move away to reset before the measured pass.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(photo).toHaveAttribute("data-state", "photo");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-state", "flipping");
  await page.waitForTimeout(1200);
  await photo.screenshot({ path: `${output}/flipping.png` });
  await expect(photo).toHaveAttribute("data-state", "dots", { timeout: 7000 });
  await photo.screenshot({ path: `${output}/dots.png` });
  const colors = await photo.locator("canvas").evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d")!;
    return {
      corner: Array.from(context.getImageData(0, 0, 1, 1).data),
      dot: Array.from(
        context.getImageData(Math.floor(canvas.width / 72), Math.floor(canvas.height / 48), 1, 1).data,
      ),
    };
  });
  expect(colors.corner).toEqual([21, 20, 14, 255]);
  expect(colors.dot).not.toEqual(colors.corner);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(photo).toHaveAttribute("data-state", "photo");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-state", "flipping");
  await page.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#usage")).toContainText("ScrollDotFlip");
  expect(errors).toEqual([]);
});

test("reduced motion skips rotation and mobile remains within viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route, { waitUntil: "networkidle" });
  const photo = page.locator("[data-dot-flip]");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-state", "dots");
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth))
    .toBeLessThanOrEqual(1);
  await photo.screenshot({ path: `${output}/mobile-dots.png` });
});
