import { coverCrop, createTileOrder, tileProgress } from "./tiles";

test("every tile gets one deterministic random delay rank", () => {
  const order = createTileOrder(864, 17);
  expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length: 864 }, (_, index) => index));
  expect(createTileOrder(864, 17)).toEqual(order);
  expect(createTileOrder(864, 18)).not.toEqual(order);
  expect(order).not.toEqual([...order].sort((a, b) => a - b));
});

test("tile timing holds the original, staggers rotation, then retains the completed dot", () => {
  expect(tileProgress(499, 1, 3, 1000, 1000)).toBe(0);
  expect(tileProgress(1000, 1, 3, 1000, 1000)).toBe(0.5);
  expect(tileProgress(2500, 1, 3, 1000, 1000)).toBe(1);
  expect(tileProgress(500, 0, 1, 1000, 1000)).toBe(0.5);
});

test("photo tiles and dot sampling use the same centered cover crop", () => {
  expect(coverCrop(2000, 1000, 1)).toEqual({ x: 500, y: 0, width: 1000, height: 1000 });
  expect(coverCrop(1000, 2000, 1)).toEqual({ x: 0, y: 500, width: 1000, height: 1000 });
  expect(coverCrop(1500, 1000, 1.5)).toEqual({ x: 0, y: 0, width: 1500, height: 1000 });
});
