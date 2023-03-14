import React, { useState } from 'react';
import "./App.css";

import { Board } from "./components/Board";
import { Hand, HandObject } from "./components/Hand";

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

  const startingHand: HandObject = colors.reduce((obj, color) => ({ ...obj, [color]: 0 }), {});

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]))
  }

  const [board, setBoard] = useState(processBoard(startingBoards[0]));
  const [hand, setHand] = useState(startingHand);
  const [moves, setMoves] = useState("");

  const takeCard = (rowId: number) => {
    const boardCopy = board.map(row => [...row]);
    if (0 <= rowId && rowId < board.length) {
      const newCard = boardCopy[rowId].pop();
      if (newCard) {
        const handCopy = {...hand};
        handCopy[newCard]++;

        if (handCopy[newCard] == 3) {
          handCopy[newCard] = 0;
        }

        setHand(handCopy);
        setBoard(boardCopy);
        setMoves(moves + rowId.toString());
      }
    }
  }

  return (
    <div id="app">
      {board.every(row => row.length == 0) ? `You won! Move order: ${moves}` : null}
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} />
    </div>
  );
}

export default App;
