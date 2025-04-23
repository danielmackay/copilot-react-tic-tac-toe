import { useState, useEffect } from "react";
import { Button } from "@/components/Button";

type Player = "X" | "O" | null;
type BoardState = (Player)[];

const calculateWinner = (squares: BoardState): Player => {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (board.every((square) => square !== null)) {
      setStatus("Draw!");
    } else {
      setStatus(`Next player: ${isXNext ? "X" : "O"}`);
    }
  }, [board, isXNext]);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className="h-32 w-32 border-2 border-gray-400 text-6xl font-bold flex items-center justify-center bg-white hover:bg-gray-100 transition-colors rounded-md shadow-md"
        onClick={() => handleClick(index)}
        disabled={!!board[index] || !!calculateWinner(board)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Tic Tac Toe</h1>
        
        <div className="mb-6 h-10 text-2xl font-semibold text-center bg-gray-100 rounded-lg p-1">{status}</div>
        
        <div className="grid grid-cols-3 gap-4 mb-8 mx-auto justify-center">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={resetGame} 
            className="px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all"
            variant="default"
          >
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;