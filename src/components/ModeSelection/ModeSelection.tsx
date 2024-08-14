import { GameContainer, ModeButton } from "../../styles/styles";
import { GameModeEnum } from "../../enums";
import { GameMode } from "../../types";

export const ModeSelection = ({
  onSelectMode,
}: {
  onSelectMode: (mode: GameMode) => void;
}) => {
  return (
    <GameContainer>
      <ModeButton onClick={() => onSelectMode(GameModeEnum.Player)}>
        Play with a Friend
      </ModeButton>
      <ModeButton onClick={() => onSelectMode(GameModeEnum.AI)}>
        Play against AI
      </ModeButton>
    </GameContainer>
  );
};
