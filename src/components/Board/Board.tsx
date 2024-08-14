import Square from "../Square/Square";
import { BoardContainer } from "@/styles/styles";
import { StateValue } from "xstate";
import { PlayerEnum } from "@/enums";

interface BoardProps {
  squares: (PlayerEnum | null)[];
  onClick: (index: number) => void;
  state: StateValue;
}

export const Board = ({ squares, onClick, state }: BoardProps) => {
  return (
    <BoardContainer>
      {squares.map((value: PlayerEnum | null, index: number) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          state={state}
        />
      ))}
    </BoardContainer>
  );
};

export default Board;
