import React from "react";
import Square from "../Square/Square";
import { BoardContainer } from "@/styles/styles";
import { PlayerEnum } from "@/enums";
import { StateValue } from "xstate";

interface BoardProps {
  squares: (PlayerEnum | null)[];
  onClick: (index: number) => void;
  state: StateValue;
  boardSize: number;
}

export const Board = ({ squares, onClick, state, boardSize }: BoardProps) => {
  return (
    <BoardContainer boardSize={boardSize}>
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
