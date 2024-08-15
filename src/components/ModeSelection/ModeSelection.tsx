import React, { useState } from "react";

import { RadioGroup } from "@/components";
import { BOARD_SIZE_OPTIONS, GAME_MODE_OPTIONS } from "@/constants";
import { GameModeEnum } from "@/enums";
import { Button, SeparatorLine } from "@/styles/styles";

interface ModeSelectionProps {
  onSelectModeAndSize: (mode: GameModeEnum, size: number) => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  onSelectModeAndSize,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameModeEnum>(
    GameModeEnum.Player,
  );
  const [boardSize, setBoardSize] = useState<number>(3);

  const handleModeChange = (value: string) => {
    setSelectedMode(value as GameModeEnum);
  };

  const handleBoardSizeChange = (value: string) => {
    setBoardSize(Number(value));
  };

  const handleStartGame = () => {
    onSelectModeAndSize(selectedMode, boardSize);
  };

  return (
    <>
      <div>
        <h3>Select Game Mode</h3>
        <RadioGroup
          name="gameMode"
          options={GAME_MODE_OPTIONS}
          selectedValue={selectedMode}
          onChange={handleModeChange}
        />
      </div>
      <div>
        <h3>Select Board Size</h3>
        <RadioGroup
          name="boardSize"
          options={BOARD_SIZE_OPTIONS}
          selectedValue={boardSize.toString()}
          onChange={handleBoardSizeChange}
        />
      </div>
      <SeparatorLine />
      <Button onClick={handleStartGame}>Start Game</Button>
    </>
  );
};
