import { fireEvent, render, screen } from "@testing-library/react";

import { ModeSelection } from "@/components";
import { GameModeEnum } from "@/enums";
import "@testing-library/jest-dom";

const mockOnSelectModeAndSize = jest.fn();

describe("ModeSelection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders mode selection options correctly", () => {
    render(<ModeSelection onSelectModeAndSize={mockOnSelectModeAndSize} />);
    expect(screen.getByLabelText("Play with a Friend")).toBeInTheDocument();
    expect(screen.getByLabelText("Play against AI")).toBeInTheDocument();
  });

  test("renders board size options correctly", () => {
    render(<ModeSelection onSelectModeAndSize={mockOnSelectModeAndSize} />);
    expect(screen.getByLabelText("3x3")).toBeInTheDocument();
    expect(screen.getByLabelText("4x4")).toBeInTheDocument();
    expect(screen.getByLabelText("5x5")).toBeInTheDocument();
  });

  test("calls onSelectModeAndSize with correct mode and size when 'Play with a Friend' is selected and Start Game is clicked", () => {
    render(<ModeSelection onSelectModeAndSize={mockOnSelectModeAndSize} />);
    fireEvent.click(screen.getByLabelText("Play with a Friend"));
    fireEvent.click(screen.getByLabelText("3x3"));
    fireEvent.click(screen.getByText("Start Game"));
    expect(mockOnSelectModeAndSize).toHaveBeenCalledWith(
      GameModeEnum.Player,
      3,
    );
  });

  test("calls onSelectModeAndSize with correct mode and size when 'Play against AI' is selected and Start Game is clicked", () => {
    render(<ModeSelection onSelectModeAndSize={mockOnSelectModeAndSize} />);
    fireEvent.click(screen.getByLabelText("Play against AI"));
    fireEvent.click(screen.getByLabelText("4x4"));
    fireEvent.click(screen.getByText("Start Game"));
    expect(mockOnSelectModeAndSize).toHaveBeenCalledWith(GameModeEnum.AI, 4);
  });
});
