import { assign, createMachine } from "xstate";
import { checkWinner, findBestMove } from "@/helpers/minimax";
import { Board, GameEvent, Player } from "@/types";
import {
  ActionsEnum,
  GameEventEnum,
  GameModeEnum,
  PlayerEnum,
  StatesEnum,
} from "@/enums";

interface GameContext {
  board: Board;
  currentPlayer: Player;
  event: GameEvent | null;
  mode: GameModeEnum.Player | GameModeEnum.AI;
  winner: string | null;
  boardSize: number;
  context: GameContext; // recursive type assign for test reasons (due to insufficient implementation of XState)
}

const gameMachineConfig = {
  id: "game",
  initial: StatesEnum.MODE_SELECTION,
  context: {
    board: Array(9).fill(null),
    currentPlayer: PlayerEnum.X,
    winner: null,
    event: null,
    mode: GameModeEnum.Player,
    boardSize: 3,
  },
  states: {
    modeSelection: {
      on: {
        SELECT_MODE_AND_SIZE: {
          actions: ActionsEnum.SET_MODE_AND_SIZE,
          target: StatesEnum.PLAYING,
        },
      },
    },
    playing: {
      on: {
        MAKE_MOVE: {
          actions: ActionsEnum.MAKE_MOVE,
          target: StatesEnum.CHECKING_WINNER,
        },
        RESET: {
          actions: ActionsEnum.RESET_GAME,
          target: StatesEnum.MODE_SELECTION,
        },
      },
    },
    checkingWinner: {
      always: [
        { target: StatesEnum.WON, guard: "isWinner" },
        { target: StatesEnum.DRAW, guard: "isDraw" },
        {
          target: StatesEnum.AI_MOVE,
          guard: "isAiMode",
        },
        {
          target: StatesEnum.PLAYING,
        },
      ],
    },
    aiMove: {
      entry: StatesEnum.AI_MOVE,
      always: [
        { target: StatesEnum.WON, guard: "isWinner" },
        { target: StatesEnum.DRAW, guard: "isDraw" },
        { target: StatesEnum.PLAYING },
      ],
    },
    won: {
      on: {
        RESET: {
          actions: ActionsEnum.RESET_GAME,
          target: StatesEnum.MODE_SELECTION,
        },
      },
    },
    draw: {
      on: {
        RESET: {
          actions: ActionsEnum.RESET_GAME,
          target: StatesEnum.MODE_SELECTION,
        },
      },
    },
  },
};

const gameMachineOptions = {
  actions: {
    setModeAndSize: assign((context: GameContext) => {
      if (context.event?.type === GameEventEnum.SELECT_MODE_AND_SIZE) {
        const boardSize = context.event.size;
        return {
          ...context["context"],
          mode: context.event.mode,
          boardSize: boardSize,
          board: Array(boardSize * boardSize).fill(null),
        };
      }
      return context["context"];
    }),
    makeMove: assign((context: GameContext) => {
      if (context.event?.type === GameEventEnum.MAKE_MOVE) {
        const { board, currentPlayer } = context["context"];
        const { index } = context.event;

        if (board[index] === null) {
          const newBoard = [...board];
          newBoard[index] = currentPlayer;

          return {
            ...context["context"],
            board: newBoard,
            currentPlayer:
              currentPlayer === PlayerEnum.X ? PlayerEnum.O : PlayerEnum.X,
          };
        }
      }
      return context["context"];
    }),
    aiMove: assign((context: GameContext) => {
      const { board, boardSize } = context["context"];
      const bestMove = findBestMove(board, boardSize);
      const newBoard = [...context["context"].board];
      newBoard[bestMove] = PlayerEnum.O;

      const winner = checkWinner(newBoard, boardSize);

      return {
        ...context["context"],
        board: newBoard,
        currentPlayer: PlayerEnum.X,
        winner: winner,
      };
    }),
    resetGame: assign((context: GameContext) => ({
      board: Array(
        context["context"].boardSize * context["context"].boardSize,
      ).fill(null),
      winner: null,
      currentPlayer: PlayerEnum.X,
      mode: GameModeEnum.Player,
    })),
  },
  guards: {
    isWinner: (context: GameContext) =>
      checkWinner(context["context"].board, context["context"].boardSize) !==
      null,
    isDraw: (context: GameContext) =>
      context["context"].board.every((cell: string | null) => cell !== null),
    isAiMode: (context: GameContext) =>
      context["context"].mode === GameModeEnum.AI,
  },
};

// @ts-ignore
// due to specific typing demand
export const gameMachine = createMachine(gameMachineConfig, gameMachineOptions);
