import { fireEvent, render, screen } from "@testing-library/react";
import { useMachine } from "@xstate/react";
import { Game } from "./Game";
import { GameEventEnum, GameModeEnum, PlayerEnum } from "@/enums";
import "@testing-library/jest-dom";

jest.mock("@xstate/react", () => ({
  useMachine: jest.fn(),
}));

jest.mock("../../hooks/useWindowSize/useWindowSize", () => ({
  useWindowSize: jest.fn(() => ({ width: 1000, height: 1000 })),
}));

jest.mock("react-confetti", () => () => <div>Confetti</div>);

const mockSend = jest.fn();
const mockUseMachine = useMachine as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseMachine.mockReturnValue([
    {
      matches: jest.fn((state: string) => state === "modeSelection"),
      value: "modeSelection",
      context: {
        board: Array(9).fill(null),
        currentPlayer: PlayerEnum.X,
        winner: null,
        mode: GameModeEnum.Player,
      },
    },
    mockSend,
  ]);
});

describe("Game Component", () => {
  test("renders ModeSelection component when in modeSelection state", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "modeSelection"),
        value: "modeSelection",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
          winner: null,
          mode: GameModeEnum.Player,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(screen.getByText("Play with a Friend")).toBeInTheDocument();
    expect(screen.getByText("Play against AI")).toBeInTheDocument();
  });

  test("calls handleSelectMode with the correct mode when a mode is selected", () => {
    render(<Game />);
    fireEvent.click(screen.getByText("Play with a Friend"));
    expect(mockSend).toHaveBeenCalledWith({
      type: GameEventEnum.SELECT_MODE,
      mode: GameModeEnum.Player,
    });
  });

  test("renders Board, StatusText, and ResetButton when mode is selected", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "playing"),
        value: "playing",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(screen.getByText("Reset Game")).toBeInTheDocument();
    expect(
      screen.getByText(`Player ${PlayerEnum.X}'s turn`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reset Game/i }),
    ).toBeInTheDocument();
  });

  test("calls handleSquareClick when a square is clicked", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "playing"),
        value: "playing",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(mockSend).toHaveBeenCalledWith({
      type: GameEventEnum.MAKE_MOVE,
      index: 0,
    });
  });

  test("displays the correct winner when game is in won state", () => {
    const winner = PlayerEnum.O;
    const currentPlayer = PlayerEnum.X;

    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state) => state === "won"),
        value: "won",
        context: {
          board: Array(9).fill(null),
          currentPlayer,
          winner,
          mode: GameModeEnum.Player,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(screen.getByText(`Player ${winner} wins!`)).toBeInTheDocument();
  });

  test("renders Confetti when game is won", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "won"),
        value: "won",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(screen.getByText("Confetti")).toBeInTheDocument();
  });

  test("displays draw message when game is in draw state", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "draw"),
        value: "draw",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
          winner: null,
          mode: GameModeEnum.Player,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
  });

  test("calls handleReset when ResetButton is clicked", () => {
    mockUseMachine.mockReturnValue([
      {
        matches: jest.fn((state: string) => state === "playing"),
        value: "playing",
        context: {
          board: Array(9).fill(null),
          currentPlayer: PlayerEnum.X,
        },
      },
      mockSend,
    ]);

    render(<Game />);
    expect(
      screen.getByText((content, element) => content.includes("Reset Game")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Player ${PlayerEnum.X}'s turn`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Reset Game/i }),
    ).toBeInTheDocument();
  });
});
