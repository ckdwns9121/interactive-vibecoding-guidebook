import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { useEffect } from "react";
import ComponentTabs from "../ComponentTabs";
import type { ComponentDocMetadata } from "@/types/docs";

jest.mock("next/dynamic", () => () => jest.requireActual("../CodeBlock").default);

jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }: { children: string }) => <pre>{children}</pre>,
}));
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({ vscDarkPlus: {} }));
const metadata: ComponentDocMetadata = {
  componentName: "Example",
  sourcePath: "Example.tsx",
  props: [],
  dependencies: ["framer-motion"],
  files: [
    { path: "Example.tsx", code: "component source", language: "tsx" },
    { path: "Example.css", code: "component css", language: "css" },
  ],
};
function Demo({ mounted }: { mounted: () => void }) {
  useEffect(() => mounted(), [mounted]);
  return <span>demo</span>;
}
function Harness({ mounted = () => {}, onReset = () => {} }: { mounted?: () => void; onReset?: () => void }) {
  return (
    <ComponentTabs
      preview={<Demo mounted={mounted} />}
      usage="usage example"
      metadata={metadata}
      controls={<input aria-label="control" />}
      onReset={onReset}
    />
  );
}

test("copies usage, selected source and exact package command", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  render(<Harness />);
  fireEvent.click(screen.getByRole("tab", { name: /Code/ }));
  fireEvent.click(screen.getAllByRole("button", { name: "코드 복사" })[0]);
  await waitFor(() => expect(writeText).toHaveBeenLastCalledWith("usage example"));
  fireEvent.change(screen.getByRole("combobox", { name: /파일/ }), { target: { value: "Example.css" } });
  fireEvent.click(screen.getByRole("button", { name: "코드 복사" }));
  await waitFor(() => expect(writeText).toHaveBeenLastCalledWith("component css"));
  fireEvent.change(screen.getByRole("combobox", { name: "패키지 매니저" }), { target: { value: "pnpm" } });
  fireEvent.click(screen.getByRole("button", { name: "명령 복사" }));
  await waitFor(() => expect(writeText).toHaveBeenLastCalledWith("pnpm add framer-motion"));
});

test("replays, resets and uses arrow-key tab navigation", () => {
  const mounted = jest.fn();
  const onReset = jest.fn();
  render(<Harness mounted={mounted} onReset={onReset} />);
  expect(mounted).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("button", { name: "애니메이션 다시 재생" }));
  expect(mounted).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole("button", { name: /초기화/ }));
  expect(onReset).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(screen.getByRole("tab", { name: /Preview/ }), { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: /Code/ })).toHaveFocus();
  expect(screen.getByRole("tab", { name: /Code/ })).toHaveAttribute("aria-selected", "true");
  expect(screen.queryByText("demo")).not.toBeInTheDocument();
});

test("announces clipboard failure", async () => {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: jest.fn().mockRejectedValue(new Error("Denied")) },
    configurable: true,
  });
  render(<Harness />);
  fireEvent.click(screen.getByRole("button", { name: "명령 복사" }));
  const panel = screen.getByRole("tabpanel");
  await waitFor(() => expect(within(panel).getByRole("status")).toHaveTextContent("복사하지 못했어요"));
});
