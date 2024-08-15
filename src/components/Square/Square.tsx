import { StateValue, StateValueMap } from "xstate";

import { PlayerEnum } from "@/enums";
import { SquareButton } from "@/styles/styles";

interface SquareProps {
  value: PlayerEnum | null;
  onClick: () => void;

  state: StateValue | StateValueMap;
}

export const Square = ({ value, onClick, state }: SquareProps) => {
  return (
    <SquareButton onClick={onClick} disabled={value !== null} state={state}>
      {value}
    </SquareButton>
  );
};
