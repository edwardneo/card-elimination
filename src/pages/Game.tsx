import React, { useState } from 'react';
import "../css/Game.css";

import { Board } from "../components/Board";
import { Hand, HandObject } from "../components/Hand";
import { EndPopup } from '../components/EndPopup';

interface GameProps {
  boardArray: string[]
}

export function Game({ boardArray }: GameProps) {
  const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

  const startingHand: HandObject = colors.reduce((obj, color) => ({ ...obj, [color]: 0 }), {});

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]));
  }

  const [board, setBoard] = useState(processBoard(boardArray));
  const [hand, setHand] = useState(startingHand);
  const [moves, setMoves] = useState("");
  const [maxHand, setMaxHand] = useState(0);
  const [gameEndPopup, setGameEndPopup] = useState(false);

  const takeCard = (rowId: number) => {
    const boardCopy = board.map(row => [...row]);
    if (0 <= rowId && rowId < board.length) {
      const newCard = boardCopy[rowId].pop();
      if (newCard) {
        const handCopy = {...hand};
        handCopy[newCard]++;

        if (handCopy[newCard] === 3) {
          handCopy[newCard] = 0;
        }

        setMaxHand(Math.max(maxHand, Object.keys(handCopy).reduce((total, key) => total + handCopy[key], 0)));

        setHand(handCopy);
        setBoard(boardCopy);
        setMoves(moves + rowId.toString());
      }
    }

    setGameEndPopup(boardCopy.every(row => row.length === 0));
    console.log(boardCopy.every(row => row.length === 0));
  }

  return (
    <div id="app">
      {
        gameEndPopup ?
        (<EndPopup moveOrder={moves} maxHand={maxHand} />) :
        null
      }
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} maxHand={maxHand}/>
    </div>
  );
}