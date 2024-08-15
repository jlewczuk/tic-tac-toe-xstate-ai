import { EventObject } from "xstate";
import { GameEventEnum, GameModeEnum } from "@/enums";

export type GameEvent =
  | SelectModeAndSizeEvent
  | MakeMoveEvent
  | AiMoveEvent
  | CheckWinnerEvent
  | ResetEvent;

export interface MakeMoveEvent extends EventObject {
  type: GameEventEnum.MAKE_MOVE;
  index: number;
}

export interface SelectModeAndSizeEvent extends EventObject {
  type: GameEventEnum.SELECT_MODE_AND_SIZE;
  mode: GameModeEnum;
  size: number;
}

export interface AiMoveEvent extends EventObject {
  type: GameEventEnum.AI_MOVE;
}

export interface CheckWinnerEvent extends EventObject {
  type: GameEventEnum.CHECK_WINNER;
}

export interface ResetEvent extends EventObject {
  type: GameEventEnum.RESET;
}
