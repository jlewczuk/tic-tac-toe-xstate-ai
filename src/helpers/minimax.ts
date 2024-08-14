import { Board, Player } from "@/types";
import { PlayerEnum } from "@/enums";

export const getAvailableMoves = (board: Board): number[] => {
  return board
    .map((value, index) => (value === null ? index : null))
    .filter((val) => val !== null) as number[];
};

export const checkWinner = (board: Board): Player | null => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  return null;
};

export const evaluateBoard = (board: Board): number => {
  const winner = checkWinner(board);
  if (winner === PlayerEnum.X) return 10;
  if (winner === PlayerEnum.O) return -10;
  return 0;
};

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
): number => {
  const score = evaluateBoard(board);
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (getAvailableMoves(board).length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = PlayerEnum.X;
      best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
      board[move] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move] = PlayerEnum.O;
      best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
      board[move] = null;
    }
    return best;
  }
};

export const findBestMove = (board: Board): number => {
  let bestValue = -Infinity;
  let bestMove = -1;

  for (let move of getAvailableMoves(board)) {
    board[move] = PlayerEnum.X;
    const moveValue = minimax(board, 0, false);
    board[move] = null;

    if (moveValue > bestValue) {
      bestMove = move;
      bestValue = moveValue;
    }
  }

  return bestMove;
};
