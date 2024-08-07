import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

function Board({ value, xIsNext, onPlay }) {
  const winner = calculateWinner(value);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  function handleValue(i) {
    if (value[i] || calculateWinner(value)) return;
    const newValue = value.slice();
    newValue[i] = xIsNext ? "X" : "O";
    onPlay(newValue);
  }

  return (
    <>
      {status}
      <div className="board">
        <div className="row">
          <Square onSquareClick={() => handleValue(0)} value={value[0]} />
          <Square onSquareClick={() => handleValue(1)} value={value[1]} />
          <Square onSquareClick={() => handleValue(2)} value={value[2]} />
        </div>

        <div className="row">
          <Square onSquareClick={() => handleValue(3)} value={value[3]} />
          <Square onSquareClick={() => handleValue(4)} value={value[4]} />
          <Square onSquareClick={() => handleValue(5)} value={value[5]} />
        </div>

        <div className="row">
          <Square onSquareClick={() => handleValue(6)} value={value[6]} />
          <Square onSquareClick={() => handleValue(7)} value={value[7]} />
          <Square onSquareClick={() => handleValue(8)} value={value[8]} />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  function handlePlay(newValue) {
    const updatedHistory = history.slice(0, currentMove + 1);
    setValue(newValue);
    setXIsNext(!xIsNext);
    setHistory([...updatedHistory, newValue]);
    setCurrentMove(updatedHistory.length);
  }

  function setCurrentHistory(h, i) {
    setValue(h);
    setCurrentMove(i);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board value={value} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              <button onClick={() => setCurrentHistory(h, i)}>
                {i === 0 ? "Go to game start" : `Go to move ${i}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function calculateWinner(suqres) {
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
    if (suqres[a] && suqres[a] === suqres[b] && suqres[a] === suqres[c]) {
      return suqres[a];
    }
  }
  return null;
}
