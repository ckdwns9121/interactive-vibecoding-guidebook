import menuTree from "@/app/docs/components/menuTree";

export const categories = menuTree;
export const docEntries = categories.flatMap((group) =>
  group.items.map((item) => ({ ...item, category: group.category })),
);
export type DocEntry = (typeof docEntries)[number];
export const categorySymbols: Record<string, string> = {
  Typography: "Aa",
  Interaction: "↗",
  Cursor: "↖",
  Background: "⠿",
  Card: "▱",
};
export function searchEntries(query: string, entries = docEntries) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter((item) =>
    terms.every((term) =>
      `${item.name} ${item.category} ${item.description} ${item.path}`.toLocaleLowerCase().includes(term),
    ),
  );
}
