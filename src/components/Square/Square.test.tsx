import { fireEvent, render, screen } from "@testing-library/react";

import { Square } from "./Square";

import { PlayerEnum } from "@/enums";
import "@testing-library/jest-dom";

describe("Square Component", () => {
  const mockOnClick = jest.fn();

  test("renders with value", () => {
    render(
      <Square value={PlayerEnum.X} onClick={mockOnClick} state="playing" />,
    );
    expect(screen.getByText(PlayerEnum.X)).toBeInTheDocument();
  });

  test("renders empty when value is null", () => {
    render(<Square value={null} onClick={mockOnClick} state="playing" />);
    expect(screen.queryByText(PlayerEnum.X)).toBeNull();
  });

  test("calls onClick when clicked", () => {
    render(<Square value={null} onClick={mockOnClick} state="playing" />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("is disabled when value is not null", () => {
    render(
      <Square value={PlayerEnum.X} onClick={mockOnClick} state="playing" />,
    );
    expect(screen.getByText(PlayerEnum.X)).toBeDisabled();
  });

  test("applies the correct styles based on state", () => {
    const { container } = render(
      <Square value={PlayerEnum.X} onClick={mockOnClick} state="won" />,
    );
    const button = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(button);

    expect(styles.animation).toContain("1s ease-in-out infinite");
  });
});
