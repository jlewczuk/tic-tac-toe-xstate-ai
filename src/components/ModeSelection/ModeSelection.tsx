import React, { useState } from "react";
import {
  Button,
  RadioButton,
  RadioLabel,
  SeparatorLine,
} from "@/styles/styles";
import { GameModeEnum } from "@/enums";

interface ModeSelectionProps {
  onSelectModeAndSize: (mode: GameModeEnum, size: number) => void;
}

export const ModeSelection = ({ onSelectModeAndSize }: ModeSelectionProps) => {
  const [selectedMode, setSelectedMode] = useState<GameModeEnum>(
    GameModeEnum.Player,
  );
  const [boardSize, setBoardSize] = useState<number>(3);

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMode(event.target.value as GameModeEnum);
  };

  const handleBoardSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBoardSize(Number(event.target.value));
  };

  const handleStartGame = () => {
    onSelectModeAndSize(selectedMode, boardSize);
  };

  return (
    <>
      <div>
        <h3>Select Game Mode</h3>
        <RadioButton>
          <input
            type="radio"
            id="modePlayer"
            name="gameMode"
            value={GameModeEnum.Player}
            onChange={handleModeChange}
            checked={selectedMode === GameModeEnum.Player}
          />
          <RadioLabel htmlFor="modePlayer">Play with a Friend</RadioLabel>
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            id="modeAI"
            name="gameMode"
            value={GameModeEnum.AI}
            onChange={handleModeChange}
            checked={selectedMode === GameModeEnum.AI}
          />
          <RadioLabel htmlFor="modeAI">Play against AI</RadioLabel>
        </RadioButton>
      </div>
      <div>
        <h3>Select Board Size</h3>
        <RadioButton>
          <input
            type="radio"
            id="size3x3"
            name="boardSize"
            value="3"
            onChange={handleBoardSizeChange}
            checked={boardSize === 3}
          />
          <RadioLabel htmlFor="size3x3">3x3</RadioLabel>
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            id="size4x4"
            name="boardSize"
            value="4"
            onChange={handleBoardSizeChange}
            checked={boardSize === 4}
          />
          <RadioLabel htmlFor="size4x4">4x4</RadioLabel>
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            id="size5x5"
            name="boardSize"
            value="5"
            onChange={handleBoardSizeChange}
            checked={boardSize === 5}
          />
          <RadioLabel htmlFor="size5x5">5x5</RadioLabel>
        </RadioButton>
      </div>
      <SeparatorLine />
      <Button onClick={handleStartGame}>Start Game</Button>
    </>
  );
};
