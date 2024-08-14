import { SquareButton } from "@/styles/styles";
import { PlayerEnum } from "@/enums";
import { StateValue, StateValueMap } from "xstate";

interface SquareProps {
  value: PlayerEnum | null;
  onClick: () => void;
  state: StateValue | StateValueMap;
}

const Square = ({ value, onClick, state }: SquareProps) => {
  return (
    <SquareButton onClick={onClick} disabled={value !== null} state={state}>
      {value}
    </SquareButton>
  );
};

export default Square;
