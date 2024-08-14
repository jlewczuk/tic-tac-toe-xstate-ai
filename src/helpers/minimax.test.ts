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
    it("should return the winner if there is one", () => {
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
      expect(checkWinner(board)).toBe(PlayerEnum.X);
    });

    it("should return null if there is no winner", () => {
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
      expect(checkWinner(board)).toBeNull();
    });

    it("should return null for an empty board", () => {
      const board = Array(9).fill(null);
      expect(checkWinner(board)).toBeNull();
    });
  });

  describe("evaluateBoard", () => {
    it("should return 10 if X wins", () => {
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
      expect(evaluateBoard(board)).toBe(10);
    });

    it("should return -10 if O wins", () => {
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
      expect(evaluateBoard(board)).toBe(-10);
    });

    it("should return 0 if there is no winner", () => {
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
      expect(evaluateBoard(board)).toBe(0);
    });
  });

  describe("minimax", () => {
    it("should return 10 for a winning board for X", () => {
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
      expect(minimax(board, 0, true)).toBe(10);
    });

    it("should return -10 for a winning board for O", () => {
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
      expect(minimax(board, 0, false)).toBe(-10);
    });

    it("should return 0 for a draw", () => {
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
      expect(minimax(board, 0, true)).toBe(0);
    });
  });

  describe("findBestMove", () => {
    it("should return the best move for X to win", () => {
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
      expect(findBestMove(board)).toBe(5);
    });

    it("should return the best move for X to block O from winning", () => {
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
      expect(findBestMove(board)).toBe(5);
    });

    it("should return the best move for an empty board", () => {
      const board = Array(9).fill(null);
      expect(findBestMove(board)).toBe(0);
    });
  });
});
