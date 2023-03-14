import React, { useState } from 'react';
import "./App.css";

import { Board } from "./components/Board";
import { Hand } from "./components/Hand";

function App() {
  const startingBoards = [
    [
      '131242',
      '412323',
      '142243',
      '443131',
    ]
  ]

  const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

  const startingHand: string[] = [];

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]))
  }

  const [board, setBoard] = useState(processBoard(startingBoards[0]));
  const [hand, setHand] = useState(startingHand);

  const takeCard = (rowId: number) => {
    const boardCopy = board.map(row => [...row])
    const newCard = boardCopy[rowId].pop();
    if (newCard) {
      const handCopy = [...hand];
      handCopy.push(newCard);
      setHand(handCopy);
    }
    setBoard(boardCopy);
  }

  return (
    <div id="app">
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} />
    </div>
  );
}

export default App;
