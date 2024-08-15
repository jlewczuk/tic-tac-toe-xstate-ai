import React from "react";
import { useMachine } from "@xstate/react";
import { useWindowSize } from "@/hooks/useWindowSize/useWindowSize";
import Confetti from "react-confetti";
import { ModeSelection } from "../ModeSelection/ModeSelection";
import { GameEventEnum, GameModeEnum, PlayerEnum } from "@/enums";
import { Board } from "../Board/Board";
import { gameMachine } from "@/state/gameMachine";
import {
  Button,
  GameContainer,
  SeparatorLine,
  StatusText,
} from "@/styles/styles";

export const Game = () => {
  const [state, send] = useMachine(gameMachine);
  const { board, currentPlayer, boardSize } = state.context;
  const { width, height } = useWindowSize();

  const handleSelectModeAndSize = (mode: GameModeEnum, size: number) => {
    send({ type: GameEventEnum.SELECT_MODE_AND_SIZE, mode, size });
  };

  const handleSquareClick = (index: number) => {
    if (state.matches("won") || state.matches("draw")) return;
    send({ type: GameEventEnum.MAKE_MOVE, index });
  };

  const handleReset = () => {
    send({ type: GameEventEnum.RESET });
  };

  let status: string;

  if (state.matches("won")) {
    const winner: PlayerEnum =
      currentPlayer === PlayerEnum.X ? PlayerEnum.O : PlayerEnum.X;

    status = `Player ${winner} wins!`;
  } else if (state.matches("draw")) {
    status = `It's a draw!`;
  } else {
    status = `Player ${currentPlayer}'s turn`;
  }

  return (
    <GameContainer>
      {state.matches("modeSelection") && (
        <ModeSelection onSelectModeAndSize={handleSelectModeAndSize} />
      )}
      {state.matches("won") && <Confetti width={width} height={height} />}
      {!state.matches("modeSelection") && (
        <>
          <Board
            squares={board}
            onClick={handleSquareClick}
            boardSize={boardSize}
            state={state.value}
          />
          <StatusText>{status}</StatusText>
          <SeparatorLine />
          <Button onClick={handleReset}>Reset Game</Button>
        </>
      )}
    </GameContainer>
  );
};
