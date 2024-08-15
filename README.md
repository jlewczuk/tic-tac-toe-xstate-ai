# Tic-Tac-Toe Game

## Overview

This project is a Tic-Tac-Toe game implemented with React, TypeScript, XState, StyledComponents and Jest. It supports
3x3, 4x4, 5x5 board sizes and
two game modes, including playing against an AI opponent.

## Approach and Design Decisions

## Component Structure

### Board Component

- **Purpose**: Renders the Tic-Tac-Toe game board, displaying squares and handling user interactions.
- **Design**:
    - **Props**:
        - `squares`: An array representing the state of each square on the board, where each element can be
          a `PlayerEnum` value or `null`.
        - `onClick`: A callback function to handle clicks on squares, updating the game state.
        - `state`: Represents the current state of the game, used for conditional styling or logic.
        - `boardSize`: Determines the size of the board (3x3, 4x4, or 5x5).
    - **Implementation**:
        - Uses `BoardContainer` styled component to manage layout based on `boardSize`.
        - Iterates over the `squares` array to render individual `Square` components.

### ModeSelection Component

- **Purpose**: Allows users to select the game mode (Player vs. Player or Player vs. AI) and the board size (3x3, 4x4,
  or 5x5).
- **Design**:
    - **Props**:
        - `onSelectModeAndSize`: Callback function to pass selected game mode and board size to the parent component.
    - **Implementation**:
        - Utilizes `RadioGroup` to render options for game mode and board size.
        - Includes a `Button` to initiate the game with the selected settings.

### RadioGroup Component

- **Purpose**: Provides a reusable component for rendering a group of radio buttons.
- **Design**:
    - **Props**:
        - `name`: The name attribute for the radio buttons, used for grouping.
        - `options`: An array of `RadioOption` objects, each containing a `value` and `label`.
        - `selectedValue`: The currently selected value, used to control the checked state of the radio buttons.
        - `onChange`: Callback function to handle changes in the selected value.
    - **Implementation**:
        - Maps over `options` to render each radio button with corresponding `label` and `value`.

### Square Component

- **Purpose**: Represents an individual square on the Tic-Tac-Toe board.
- **Design**:
    - **Props**:
        - `value`: The value of the square, which can be a `PlayerEnum` or `null`.
        - `onClick`: A callback function triggered when the square is clicked.
        - `state`: Represents the current state of the game, used for conditional styling or logic.
    - **Implementation**:
        - Uses `SquareButton` styled component to display the square and handle clicks.
        - The button is disabled if the square is already occupied.

This structure aims to keep components modular, reusable, and easy to manage, with a clear separation of concerns
between different parts of the application.

### State Management with XState

#### Game Machine (`gameMachine`)

- **Purpose**: Manages the state of the Tic-Tac-Toe game, including handling player moves, checking for winners, and
  managing transitions between different game states.

- **States**:
    - **modeSelection**: Initial state where users select the game mode (Player vs. Player or Player vs. AI) and the
      board size. Transitions to the `playing` state when the mode and size are selected.
    - **playing**: Active game state where player moves are made. Transitions to the `checkingWinner` state after a
      move.
    - **checkingWinner**: Evaluates the board to check for a winner or a draw. If AI mode is selected, transitions to
      the `aiMove` state to let the AI make a move.
    - **aiMove**: Handles the AI's move using the minimax algorithm. After the AI's move, transitions to
      the `checkingWinner` state to re-evaluate the game state.
    - **won**: Final state indicating the game has been won. Transitions to `modeSelection` on reset.
    - **draw**: Final state indicating the game has ended in a draw. Transitions to `modeSelection` on reset.

- **Context**:
    - **board**: Represents the current state of the game board as an array of player moves or `null`.
    - **currentPlayer**: Tracks the current player (X or O).
    - **event**: Stores the current event being processed (e.g., move, mode selection).
    - **mode**: Indicates the game mode (Player vs. Player or Player vs. AI).
    - **winner**: Stores the winner of the game, if any.
    - **boardSize**: Defines the size of the board (3x3, 4x4, or 5x5).

- **Actions**:
    - **setModeAndSize**: Configures the game mode and board size based on user input. Initializes the board according
      to the selected size.
    - **makeMove**: Updates the board with the current player's move and switches to the next player.
    - **aiMove**: Computes the best move for the AI using the minimax algorithm and updates the board.
    - **resetGame**: Resets the game state to the initial configuration, ready for a new game.

- **Guards**:
    - **isWinner**: Checks if there is a winner on the board.
    - **isDraw**: Determines if the board is full without a winner, resulting in a draw.
    - **isAiMode**: Checks if the current game mode is AI mode.

This setup ensures a clear separation of concerns, with XState managing complex game logic and transitions, and React
components handling the user interface and interactions.

### Styling

- **Styled Components**: Used for styling to leverage component-scoped styles and ensure consistency across the
  application.
- **Design**: Focused on a modern and clean look with effects for different states to enhance user experience.

### Testing

- **Testing Library**: Jest and React Testing Library are used for unit tests to ensure component functionality.
- **Coverage**: Includes tests for rendering components correctly, user interactions, and state changes.

### Linting and Formatting

- **ESLint**: Configured to enforce code quality and style, using `@typescript-eslint` for TypeScript support.
- **Prettier**: Integrated with ESLint to ensure consistent code formatting.

## Setup

To get started with this project:

1. **Clone the Repository**:
   ```bash
   git clone jlewczuk/tic-tac-toe-xstate-ai

2. **Install Dependencies**:
   ```bash
   npm install

3. **Run the Development Server**:
   ```bash
   npm run dev

4. **Run tests**:
   ```bash
   npm test
