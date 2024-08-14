import { act, render } from "@testing-library/react";
import { useWindowSize } from "@/hooks";
import React from "react";

const TestComponent = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <span data-testid="width">{width}</span>
      <span data-testid="height">{height}</span>
    </div>
  );
};

describe("useWindowSize", () => {
  it("should return the initial window size", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("width").textContent).toBe(window.innerWidth.toString());
    expect(getByTestId("height").textContent).toBe(
      window.innerHeight.toString(),
    );
  });

  it("should update the window size on resize", () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(getByTestId("width").textContent).toBe("500");
    expect(getByTestId("height").textContent).toBe("500");
  });

  it("should clean up the event listener on unmount", () => {
    const { unmount } = render(<TestComponent />);
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });
});
