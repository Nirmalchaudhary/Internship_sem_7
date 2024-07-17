import React, { useState } from "react";
import "./TicTacToe.css"; // Import your CSS for styling

const initialBoard = Array(9).fill(null);

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return; // If there's a winner or cell is already filled, do nothing

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Check for winner
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index]}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((cell) => cell !== null)) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  return (
    <div className="main">
    <div className="tic-tac-toe">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => (
              <div key={col} className="board-cell">
                {renderSquare(row * 3 + col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div>{getStatus()}</div>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
    </div>
  );
};

// Function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export default TicTacToe;
