import { fireEvent, render, screen } from "@testing-library/react";
import { ModeSelection } from "./ModeSelection";
import { GameModeEnum } from "@/enums";
import "@testing-library/jest-dom";

const mockOnSelectMode = jest.fn();

describe("ModeSelection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders buttons correctly", () => {
    render(<ModeSelection onSelectMode={mockOnSelectMode} />);
    expect(screen.getByText("Play with a Friend")).toBeInTheDocument();
    expect(screen.getByText("Play against AI")).toBeInTheDocument();
  });

  test("calls onSelectMode with Player mode when 'Play with a Friend' is clicked", () => {
    render(<ModeSelection onSelectMode={mockOnSelectMode} />);
    fireEvent.click(screen.getByText("Play with a Friend"));
    expect(mockOnSelectMode).toHaveBeenCalledWith(GameModeEnum.Player);
  });

  test("calls onSelectMode with AI mode when 'Play against AI' is clicked", () => {
    render(<ModeSelection onSelectMode={mockOnSelectMode} />);
    fireEvent.click(screen.getByText("Play against AI"));
    expect(mockOnSelectMode).toHaveBeenCalledWith(GameModeEnum.AI);
  });
});
