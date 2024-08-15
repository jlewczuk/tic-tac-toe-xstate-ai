import styled, { css, keyframes } from "styled-components";
import { StateValue, StateValueMap } from "xstate";

const winAnimation = keyframes`
    0%, 100% {
        background-color: #4caf50;
    }
    50% {
        background-color: #81c784;
    }
`;

const drawAnimation = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.05);
    }
`;

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: "Arial", sans-serif;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

interface BoardContainerProps {
  boardSize: number;
}

export const BoardContainer = styled.div<BoardContainerProps>`
  display: grid;
  grid-template-columns: ${({ boardSize }) => `repeat(${boardSize}, 1fr)`};
  gap: 10px;
`;

export const SquareButton = styled.button<{
  state: StateValue | StateValueMap;
}>`
  width: 100px;
  height: 100px;
  font-size: 2rem;
  background-color: #fff;
  border: 2px solid #000;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  ${({ state }) =>
    state === "won" &&
    css`
      animation: ${winAnimation} 1s ease-in-out infinite;
    `}
  ${({ state }) =>
    state === "draw" &&
    css`
      animation: ${drawAnimation} 0.5s ease-in-out alternate infinite;
    `}
    &:hover {
    background-color: #f7f7f7;
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;
    transform: none;
  }
`;

export const StatusText = styled.span`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
`;

export const Button = styled.button`
  margin: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #007bff;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:checked {
      background-color: #007bff;
      border: 2px solid #0056b3;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const RadioLabel = styled.label`
  font-size: 1rem;
  color: #333;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

export const SeparatorLine = styled.hr`
  width: 100%;
  border: 1px solid #ccc;
  margin: 20px 0;
`;
