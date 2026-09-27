import { render } from "@testing-library/react";
import MorphingText from "./MorphingText";

describe("MorphingText animation lifecycle", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    jest.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => jest.restoreAllMocks());

  it("cancels its animation when configuration changes and on unmount", () => {
    const words = ["Create", "Explore"];
    const { rerender, unmount } = render(<MorphingText texts={words} />);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
    rerender(<MorphingText texts={words} morphTime={2} />);
    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it("shows static text without scheduling frames for reduced motion", () => {
    jest.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    const { getByRole } = render(<MorphingText texts={["Create", "Explore"]} />);
    expect(getByRole("img")).toHaveAttribute("aria-label", "Create, Explore");
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("keeps SVG filters independent across simultaneous instances", () => {
    const { container } = render(
      <>
        <MorphingText texts={["One"]} />
        <MorphingText texts={["Two"]} />
      </>,
    );
    const ids = Array.from(container.querySelectorAll("filter"), (filter) => filter.id);
    expect(new Set(ids).size).toBe(2);
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
