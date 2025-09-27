
# Char Star Game - Project Blueprint

## 1. Project Overview
**CHAR STAR** is a two-player, offline strategy board game built as a web application. It is inspired by classic alignment games like Tic-Tac-Toe and Morris, but with its own unique board and rules. The objective is for a player to be the first to align their three pieces in a straight line.

## 2. Core Features
- **Start Screen**: A visually appealing entry screen with the game title and a "Start" button.
- **Game Screen**: The main interface for gameplay, featuring the game board, player information displays, and game status messages.
- **1v1 Offline Mode**: Two players can play against each other on the same device.
- **Two-Phase Gameplay**:
    1.  **Placement Phase**: Players take turns placing their three pieces on any empty node on the board.
    2.  **Movement Phase**: Once all six pieces are on the board, players take turns moving one of their pieces to an adjacent, empty node.
- **Win Condition**: The game is won when a player successfully aligns their three pieces horizontally, vertically, or diagonally.
- **Side Menu**: A navigation menu providing access to game options and information.
    - Reset Game
    - Return to Main Menu
    - About, Privacy, and Contact information.

## 3. Tech Stack
- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Module System**: ESM

## 4. Component Architecture
The application is structured into reusable, single-responsibility components.

- **`App.tsx`**: The root component that manages the active view (`start` or `game`) and orchestrates the overall application flow.
- **`StartScreen.tsx`**: A presentational component for the initial screen.
- **`GameScreen.tsx`**: The main container for the game, managing all game-related state (board state, current player, game phase, winner) and logic.
- **`Board.tsx`**: A component that visually renders the game board, including nodes and connecting lines, and handles user clicks on the nodes.
- **`PlayerInfo.tsx`**: Displays player-specific information, such as their avatar, name, and the status of their pieces (remaining to be placed).
- **`Menu.tsx`**: A slide-in menu component for navigation and game controls.
- **`icons.tsx`**: A utility component for housing SVG icons.

## 5. State Management
- **Local Component State**: All state is managed locally within components using React Hooks (`useState`, `useEffect`, `useCallback`).
- **`GameScreen.tsx` State**:
    - `board`: An array of 9 elements representing the state of each node (`'P1'`, `'P2'`, or `null`).
    - `currentPlayer`: The player whose turn it is (`'P1'` or `'P2'`).
    - `gamePhase`: The current phase of the game (`'placing'`, `'moving'`, `'gameOver'`).
    - `piecesToPlace`: An object tracking how many pieces each player has left to place.
    - `selectedNodeIndex`: The index of the piece selected for movement during the `'moving'` phase.
    - `winner`: The winner of the game (`'P1'`, `'P2'`, or `null`).
    - `message`: A string to display the current game status to the players.

## 6. Game Logic
- **Board Representation**: The 3x3 board with diagonal connections is represented by a single-dimensional array of length 9.
- **Adjacency**: A constant object defines the valid moves from each node, mapping each node index to an array of adjacent node indices.
- **Win Detection**: A predefined array of winning combinations (lines) is used. After each move, a function checks if the current player's pieces occupy all three nodes of any winning line.
