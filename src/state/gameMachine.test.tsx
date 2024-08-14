import { interpret } from "xstate";
import { gameMachine } from "./gameMachine";
import * as minimaxHelpers from "@/helpers/minimax";
import { GameEventEnum, GameModeEnum, PlayerEnum, StatesEnum } from "@/enums";

jest.mock("@/helpers/minimax");

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
      type: GameEventEnum.SELECT_MODE,
      mode: GameModeEnum.Player,
    });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 0 });
  });

  test("resets the game to initial state", (done) => {
    service.subscribe((state: any) => {
      if (state.matches(StatesEnum.MODE_SELECTION)) {
        expect(state.context.board).toEqual(Array(9).fill(null));
        expect(state.context.currentPlayer).toBe(PlayerEnum.X);
        done();
      }
    });

    service.send({
      type: GameEventEnum.SELECT_MODE,
      mode: GameModeEnum.Player,
    });
    service.send({ type: GameEventEnum.MAKE_MOVE, index: 0 });
    service.send({ type: GameEventEnum.RESET });
  });
});
