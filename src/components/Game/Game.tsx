import { useMachine } from "@xstate/react";

import { useWindowSize } from "@/hooks/useWindowSize/useWindowSize";
import { GameContainer, ResetButton, StatusText } from "@/styles/styles";
import Confetti from "react-confetti";
import { ModeSelection } from "../ModeSelection/ModeSelection";
import { GameEventEnum, GameModeEnum, PlayerEnum } from "@/enums";
import Board from "../Board/Board";
import { gameMachine } from "@/state/gameMachine";

export const Game = () => {
  const [state, send] = useMachine(gameMachine);
  const { board, currentPlayer } = state.context;
  const { width, height } = useWindowSize();

  const handleSelectMode = (mode: GameModeEnum.Player | GameModeEnum.AI) => {
    send({ type: GameEventEnum.SELECT_MODE, mode });
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
        <ModeSelection onSelectMode={handleSelectMode} />
      )}
      {state.matches("won") && <Confetti width={width} height={height} />}
      {!state.matches("modeSelection") && (
        <>
          <Board
            squares={board}
            onClick={handleSquareClick}
            state={state.value}
          />
          <StatusText>{status}</StatusText>
          <ResetButton onClick={handleReset}>Reset Game</ResetButton>
        </>
      )}
    </GameContainer>
  );
};

export default Game;
