/** Seeded shuffle keeps each image's scattered flip order stable across redraws. */
export function createTileOrder(count: number, seed: number): number[] {
  const order = Array.from({ length: count }, (_, index) => index);
  let state = seed | 0 || 1;
  for (let index = count - 1; index > 0; index--) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const swap = (state >>> 0) % (index + 1);
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  // Convert shuffled indices to the delay rank for each original tile.
  const ranks = Array<number>(count);
  order.forEach((tile, rank) => {
    ranks[tile] = rank;
  });
  return ranks;
}

export function tileProgress(
  elapsed: number,
  rank: number,
  count: number,
  duration: number,
  stagger: number,
) {
  const delay = (rank / Math.max(1, count - 1)) * stagger;
  return Math.max(0, Math.min(1, (elapsed - delay) / duration));
}

/** Source crop for object-fit: cover, shared by the original tiles and their sampled colors. */
export function coverCrop(imageWidth: number, imageHeight: number, ratio: number) {
  const width = Math.min(imageWidth, imageHeight * ratio);
  const height = width / ratio;
  return { x: (imageWidth - width) / 2, y: (imageHeight - height) / 2, width, height };
}
