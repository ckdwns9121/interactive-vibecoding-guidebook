import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DocsPreferences, useDocsPreferences } from "../DocsPreferences";

const path = "/docs/typography/typing";
function Harness() {
  const { favorites, toggleFavorite } = useDocsPreferences();
  return (
    <>
      <button onClick={() => toggleFavorite(path)}>toggle</button>
      <output>{favorites.join(",")}</output>
    </>
  );
}
beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());

test("persists a favorite and restores it on remount", async () => {
  const first = render(
    <DocsPreferences>
      <Harness />
    </DocsPreferences>,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("status")).toHaveTextContent(path);
  first.unmount();
  render(
    <DocsPreferences>
      <Harness />
    </DocsPreferences>,
  );
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(path));
});

test("keeps favorites usable in memory when browser storage is unavailable", () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Storage disabled");
  });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Storage disabled");
  });
  render(
    <DocsPreferences>
      <Harness />
    </DocsPreferences>,
  );
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("status")).toHaveTextContent(path);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
});

test("discards unknown paths in stored data", async () => {
  localStorage.setItem("interaction-guidebook:favorites", JSON.stringify(["/unknown", path, 1]));
  render(
    <DocsPreferences>
      <Harness />
    </DocsPreferences>,
  );
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(path));
  expect(screen.getByRole("status")).not.toHaveTextContent("unknown");
});
