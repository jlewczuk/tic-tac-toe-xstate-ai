import {
  checkWinner,
  evaluateBoard,
  findBestMove,
  getAvailableMoves,
  minimax,
} from "./minimax";

import { PlayerEnum } from "@/enums";

describe("Tic-Tac-Toe AI Functions", () => {
  describe("getAvailableMoves", () => {
    it("should return all indices for an empty board", () => {
      const board = Array(9).fill(null);
      expect(getAvailableMoves(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should return only empty indices for a partially filled board", () => {
      const board = [
        PlayerEnum.X,
        null,
        PlayerEnum.O,
        null,
        PlayerEnum.X,
        null,
        PlayerEnum.O,
        null,
        null,
      ];
      expect(getAvailableMoves(board)).toEqual([1, 3, 5, 7, 8]);
    });

    it("should return an empty array for a full board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
      ];
      expect(getAvailableMoves(board)).toEqual([]);
    });
  });

  describe("checkWinner", () => {
    it("should return the winner if there is one on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(checkWinner(board, 3)).toBe(PlayerEnum.X);
    });

    it("should return null if there is no winner on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(checkWinner(board, 3)).toBeNull();
    });

    it("should return null for an empty board on a 3x3 board", () => {
      const board = Array(9).fill(null);
      expect(checkWinner(board, 3)).toBeNull();
    });

    it("should correctly identify winner on a 4x4 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        PlayerEnum.X,
      ];
      expect(checkWinner(board, 4)).toBe(PlayerEnum.X);
    });

    it("should correctly identify winner on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        PlayerEnum.X,
      ];
      expect(checkWinner(board, 5)).toBe(PlayerEnum.X);
    });

    it("should return null if there is no winner on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(checkWinner(board, 5)).toBeNull();
    });
  });

  describe("evaluateBoard", () => {
    it("should return 10 if X wins on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 3)).toBe(10);
    });

    it("should return -10 if O wins on a 3x3 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 3)).toBe(-10);
    });

    it("should return 0 if there is no winner on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(evaluateBoard(board, 3)).toBe(0);
    });

    it("should return 10 if X wins on a 4x4 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 4)).toBe(10);
    });

    it("should return -10 if O wins on a 4x4 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 4)).toBe(-10);
    });

    it("should return 0 if there is no winner on a 4x4 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
      ];
      expect(evaluateBoard(board, 4)).toBe(0);
    });

    it("should return 10 if X wins on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 5)).toBe(10);
    });

    it("should return -10 if O wins on a 5x5 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(evaluateBoard(board, 5)).toBe(-10);
    });

    it("should return 0 if there is no winner on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(evaluateBoard(board, 5)).toBe(0);
    });
  });

  describe("minimax", () => {
    it("should return 10 for a winning board for X on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 3, 3)).toBe(
        10,
      );
    });

    it("should return -10 for a winning board for O on a 3x3 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.O, 0, -Infinity, Infinity, 3, 3)).toBe(
        -10,
      );
    });

    it("should return 0 for a draw on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 3, 3)).toBe(
        0,
      );
    });

    it("should return 10 for a winning board for X on a 4x4 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 4, 4)).toBe(
        10,
      );
    });

    it("should return -10 for a winning board for O on a 4x4 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.O, 0, -Infinity, Infinity, 4, 4)).toBe(
        -10,
      );
    });

    it("should return 0 for a draw on a 4x4 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 4, 4)).toBe(
        0,
      );
    });

    it("should return 10 for a winning board for X on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 5, 5)).toBe(
        10,
      );
    });

    it("should return -10 for a winning board for O on a 5x5 board", () => {
      const board = [
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      expect(minimax(board, PlayerEnum.O, 0, -Infinity, Infinity, 5, 5)).toBe(
        -10,
      );
    });

    it("should return 0 for a draw on a 5x5 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.X,
        PlayerEnum.O,
      ];
      expect(minimax(board, PlayerEnum.X, 0, -Infinity, Infinity, 5, 5)).toBe(
        0,
      );
    });
  });

  describe("findBestMove", () => {
    it("should return the best move for X to win on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        PlayerEnum.X,
        null,
        null,
      ];
      expect(findBestMove(board, 3)).toBe(5);
    });

    it("should return the best move to block O from winning on a 3x3 board", () => {
      const board = [
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.X,
        PlayerEnum.O,
        PlayerEnum.O,
        null,
        null,
        null,
        PlayerEnum.X,
      ];

      // test here returns 5, but the best move in this scenario can be both 5 and 6,
      // because that is the most optimal move here (blocking two possible winnings by X)
      // findBestMove always chooses 5 over 6 here, as far as I manually tested it.
      expect(findBestMove(board, 3)).toBe(5);
    });

    it("should return the best move for an empty board on a 3x3 board", () => {
      const board = Array(9).fill(null);
      expect(findBestMove(board, 3)).toBe(0);
    });

    it("should return the best move for an empty board on a 4x4 board", () => {
      const board = Array(16).fill(null);
      expect(findBestMove(board, 4)).toBe(0);
    });

    it("should return the best move for an empty board on a 5x5 board", () => {
      const board = Array(25).fill(null);
      expect(findBestMove(board, 5)).toBe(0);
    });
  });
});
