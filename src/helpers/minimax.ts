import { PlayerEnum } from "@/enums";
import { Board } from "@/types";

export const getAvailableMoves = (board: (PlayerEnum | null)[]): number[] => {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
};

export const checkWinner = (
  board: (PlayerEnum | null)[],
  boardSize: number,
): PlayerEnum | null => {
  const checkLine = (line: (PlayerEnum | null)[]) => {
    if (line.every((cell) => cell === PlayerEnum.X)) return PlayerEnum.X;
    if (line.every((cell) => cell === PlayerEnum.O)) return PlayerEnum.O;
    return null;
  };

  for (let row = 0; row < boardSize; row++) {
    const rowCells = board.slice(row * boardSize, (row + 1) * boardSize);
    const winner = checkLine(rowCells);
    if (winner) return winner;
  }

  for (let col = 0; col < boardSize; col++) {
    const colCells = [];
    for (let row = 0; row < boardSize; row++) {
      colCells.push(board[row * boardSize + col]);
    }
    const winner = checkLine(colCells);
    if (winner) return winner;
  }

  const mainDiagonal = [];
  const antiDiagonal = [];
  for (let i = 0; i < boardSize; i++) {
    mainDiagonal.push(board[i * boardSize + i]);
    antiDiagonal.push(board[(i + 1) * boardSize - (i + 1)]);
  }
  let winner = checkLine(mainDiagonal);
  if (winner) return winner;
  winner = checkLine(antiDiagonal);
  if (winner) return winner;

  return null;
};

export const evaluateBoard = (board: Board, boardSize: number): number => {
  const winner = checkWinner(board, boardSize);
  if (winner === PlayerEnum.X) return 10;
  if (winner === PlayerEnum.O) return -10;
  return 0;
};

export const minimax = (
  newBoard: (PlayerEnum | null)[],
  player: PlayerEnum,
  depth = 0,
  alpha = -Infinity,
  beta = Infinity,
  boardSize: number,
  maxDepth: number,
): number => {
  const score = evaluateBoard(newBoard, boardSize);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (depth >= maxDepth || getAvailableMoves(newBoard).length === 0) return 0;

  if (player === PlayerEnum.X) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = player;
        const currentScore = minimax(
          newBoard,
          PlayerEnum.O,
          depth + 1,
          alpha,
          beta,
          boardSize,
          maxDepth,
        );
        newBoard[i] = null;
        bestScore = Math.max(bestScore, currentScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = player;
        const currentScore = minimax(
          newBoard,
          PlayerEnum.X,
          depth + 1,
          alpha,
          beta,
          boardSize,
          maxDepth,
        );
        newBoard[i] = null;
        bestScore = Math.min(bestScore, currentScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
};

export const findBestMove = (
  board: (PlayerEnum | null)[],
  boardSize: number,
): number => {
  const maxDepth = 3;
  const availableSpots = getAvailableMoves(board);

  const bestMove = availableSpots.reduce(
    (best, spot) => {
      const newBoard = [...board];
      newBoard[spot] = PlayerEnum.O;

      const score = minimax(
        newBoard,
        PlayerEnum.X,
        0,
        -Infinity,
        Infinity,
        boardSize,
        maxDepth,
      );
      return score < best.score ? { index: spot, score } : best;
    },
    { index: -1, score: Infinity },
  );

  return bestMove.index;
};
