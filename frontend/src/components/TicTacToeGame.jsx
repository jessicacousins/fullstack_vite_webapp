import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./TicTacToeGame.css";

const TicTacToeGame = () => {
  const { user } = useAuth();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [turnHistory, setTurnHistory] = useState([]);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
  });

  useEffect(() => {
    if (user?.email) {
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    if (turnHistory.length > 0 && !winner) {
      const timer = setInterval(() => {
        removeOldestMark();
      }, 5000); // remove mark after 5 seconds
      return () => clearInterval(timer);
    }
  }, [turnHistory, winner]);

  const fetchStats = async () => {
    try {
      if (!user?.email) return;
      const response = await axios.get(`/api/tictactoe/stats/${user.email}`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const computerMove = (board) => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((cell) => cell !== null);
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      return emptyCells[randomIndex];
    }
    return null;
  };

  const handleCellClick = async (index) => {
    if (board[index] || winner || currentPlayer === "O") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const newTurnHistory = [...turnHistory, { player: currentPlayer, index }];
    setTurnHistory(newTurnHistory);

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      await updateStats(gameWinner === "X");
      return;
    }

    if (isBoardFull(newBoard)) {
      setWinner("Tie");
      await updateStats(false); // No winner for ties
      return;
    }

    setCurrentPlayer("O");

    setTimeout(() => {
      const updatedBoard = [...newBoard];
      const computerIndex = computerMove(updatedBoard);

      if (computerIndex !== null) {
        updatedBoard[computerIndex] = "O";
        const updatedTurnHistory = [
          ...newTurnHistory,
          { player: "O", index: computerIndex },
        ];

        setBoard(updatedBoard);
        setTurnHistory(updatedTurnHistory);

        const computerWinner = checkWinner(updatedBoard);
        if (computerWinner) {
          setWinner(computerWinner);
          updateStats(computerWinner === "X");
        } else if (isBoardFull(updatedBoard)) {
         
          setWinner("Tie");
          updateStats(false); 
        } else {
          setCurrentPlayer("X");
        }
      }
    }, 1000);
  };

  const removeOldestMark = () => {
    if (winner) return;

    const newBoard = [...board];
    const newTurnHistory = [...turnHistory];

    // remove the oldest mark
    const oldestMove = newTurnHistory.shift();
    if (oldestMove) {
      newBoard[oldestMove.index] = null;
    }

    setBoard(newBoard);
    setTurnHistory(newTurnHistory);
  };

  const updateStats = async (didWin) => {
    try {
      if (!user?.email) return;
      await axios.post("/api/tictactoe/update-stats", {
        email: user.email,
        didWin,
      });
      fetchStats();
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setTurnHistory([]);
  };

  return (
    <div className="tic-tac-toe-container">
      <h1 className="tictactoeTitle">Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? "filled" : ""}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="winner-message">
          {winner === "X"
            ? "You win!"
            : winner === "O"
            ? "Computer wins!"
            : "It's a tie!"}
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="current-player">Your Turn</div>
      )}
      <div className="stats">
        <h3>Player Stats</h3>
        <p>Games Played: {stats.gamesPlayed}</p>
        <p>Games Won: {stats.gamesWon}</p>
        <p>Games Lost: {stats.gamesLost}</p>
      </div>
    </div>
  );
};

export default TicTacToeGame;
