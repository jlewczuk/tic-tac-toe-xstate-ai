import { fireEvent, render, screen } from "@testing-library/react";

import { Board } from "./Board";

import { PlayerEnum } from "@/enums";
import "@testing-library/jest-dom";

describe("Board Component", () => {
  const squares = [
    PlayerEnum.X,
    null,
    PlayerEnum.O,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const mockOnClick = jest.fn();
  const mockState = "playing";

  it("renders the correct number of squares", () => {
    render(
      <Board
        squares={squares}
        onClick={mockOnClick}
        state={mockState}
        boardSize={3}
      />,
    );
    const squareElements = screen.getAllByRole("button");
    expect(squareElements).toHaveLength(squares.length);
  });

  it("renders squares with correct values", () => {
    render(
      <Board
        squares={squares}
        onClick={mockOnClick}
        state={mockState}
        boardSize={3}
      />,
    );
    const squareElements = screen.getAllByRole("button");

    expect(squareElements[0]).toHaveTextContent(PlayerEnum.X);
    expect(squareElements[1]).toBeEmptyDOMElement();
    expect(squareElements[2]).toHaveTextContent(PlayerEnum.O);
  });

  it("calls onClick with the correct index when a square is clicked", () => {
    render(
      <Board
        squares={squares}
        onClick={mockOnClick}
        state={mockState}
        boardSize={3}
      />,
    );
    const squareElements = screen.getAllByRole("button");

    fireEvent.click(squareElements[1]);
    expect(mockOnClick).toHaveBeenCalledWith(1);

    fireEvent.click(squareElements[2]);
    expect(mockOnClick).toHaveBeenCalledWith(1);
  });

  it("does not call onClick if a square is already occupied", () => {
    render(
      <Board
        squares={squares}
        onClick={mockOnClick}
        state={mockState}
        boardSize={3}
      />,
    );
    const squareElements = screen.getAllByRole("button");

    fireEvent.click(squareElements[0]);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("handles different board sizes correctly", () => {
    const boardSize = 4;
    const squares4x4 = Array(boardSize * boardSize).fill(null);
    render(
      <Board
        squares={squares4x4}
        onClick={mockOnClick}
        state={mockState}
        boardSize={boardSize}
      />,
    );
    const squareElements = screen.getAllByRole("button");
    expect(squareElements).toHaveLength(boardSize * boardSize);
  });
});
