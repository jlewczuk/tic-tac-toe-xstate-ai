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
  },
  states: {
    modeSelection: {
      on: {
        SELECT_MODE: {
          actions: ActionsEnum.SET_MODE,
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
    setMode: assign((context: GameContext) => {
      if (context.event?.type === GameEventEnum.SELECT_MODE) {
        return {
          ...context["context"],
          mode: context.event["mode"],
        };
      }
      return {};
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
      const bestMove = findBestMove(context["context"].board);
      const newBoard = [...context["context"].board];
      newBoard[bestMove] = PlayerEnum.O;

      const winner = checkWinner(newBoard);

      return {
        ...context["context"],
        board: newBoard,
        currentPlayer: PlayerEnum.X,
        winner: winner,
      };
    }),
    resetGame: assign(() => ({
      board: Array(9).fill(null),
      winner: null,
      currentPlayer: PlayerEnum.X,
      mode: GameModeEnum.Player,
    })),
  },
  guards: {
    isWinner: (context: GameContext) =>
      checkWinner(context["context"].board) !== null,
    isDraw: (context: GameContext) =>
      context["context"].board.every((cell: string | null) => cell !== null),
    isAiMode: (context: GameContext) =>
      context["context"].mode === GameModeEnum.AI,
  },
};

// @ts-ignore
// due to specific typing demand
export const gameMachine = createMachine(gameMachineConfig, gameMachineOptions);
