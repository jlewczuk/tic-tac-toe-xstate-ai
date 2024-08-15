import { interpret } from "xstate";

import { GameEventEnum, GameModeEnum, PlayerEnum, StatesEnum } from "@/enums";
import * as minimaxHelpers from "@/helpers/minimax/minimax";
import { gameMachine } from "@/state";

jest.mock("@/helpers/minimax/minimax");

describe("gameMachine", () => {
  let service: any; // ;)

  beforeEach(() => {
    service = interpret(gameMachine).start();
    jest.clearAllMocks();
  });

  afterEach(() => {
    service.stop();
  });

  test("transitions to won when a winner is detected", (done) => {
    (minimaxHelpers.checkWinner as jest.Mock).mockReturnValue(PlayerEnum.X);

    service.subscribe((state: any) => {
      if (state.matches(StatesEnum.WON)) {
        expect(state.value).toBe(StatesEnum.WON);
        done();
      }
    });

    service.send({
      type: GameEventEnum.SELECT_MODE_AND_SIZE,
      mode: GameModeEnum.Player,
      size: 3,
    });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 0 });
  });

  test("transitions to draw when the board is full and no winner is detected", (done) => {
    (minimaxHelpers.checkWinner as jest.Mock).mockReturnValue(null);

    service.subscribe((state: any) => {
      if (state.matches(StatesEnum.DRAW)) {
        expect(state.value).toBe(StatesEnum.DRAW);
        done();
      }
    });

    service.send({
      type: GameEventEnum.SELECT_MODE_AND_SIZE,
      mode: GameModeEnum.Player,
      size: 3,
    });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 0 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 1 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 2 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 3 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 4 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 5 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 6 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 7 });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 8 });
  });

  test("resets the game to initial state", (done) => {
    service.subscribe((state: any) => {
      if (state.matches(StatesEnum.MODE_SELECTION)) {
        expect(state.context.board).toEqual(Array(9).fill(null));
        expect(state.context.currentPlayer).toBe(PlayerEnum.X);
        expect(state.context.mode).toBe(GameModeEnum.Player);
        done();
      }
    });

    service.send({
      type: GameEventEnum.SELECT_MODE_AND_SIZE,
      mode: GameModeEnum.Player,
      size: 3,
    });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 0 });
    service.send({ type: GameEventEnum.RESET });
  });
});
