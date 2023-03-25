import React, { useState } from 'react';
import "../css/Game.css";

import { Board } from "../components/Board";
import { Hand, HandObject } from "../components/Hand";
import { EndPopup } from '../components/EndPopup';

import { startingBoards } from '../data/Setups';

interface GameProps {
  setupIndex: number;
  addGameData(moveOrder: String, maxHand: number): void;
  nextSetup(setupIndex: number): void;
}

export function GamePage({ setupIndex, addGameData, nextSetup }: GameProps) {
  const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

  const startingHand: HandObject = colors.reduce((obj, color) => ({ ...obj, [color]: 0 }), {});

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]));
  }

  const [board, setBoard] = useState(processBoard(startingBoards[setupIndex]));
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

        const newMaxHand = Math.max(maxHand, Object.keys(handCopy).reduce((total, key) => total + handCopy[key], 0));
        setMaxHand(newMaxHand);

        setHand(handCopy);
        setBoard(boardCopy);

        const newMoves = moves + rowId.toString();
        setMoves(newMoves);

        if (boardCopy.every(row => row.length === 0)) {
          setGameEndPopup(true);
          addGameData(newMoves, newMaxHand);
        }
      }
    }
  }

  return (
    <div className='page'>
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} maxHand={maxHand}/>
      {
        gameEndPopup ?
        (<EndPopup>
          <h1>Nice!</h1>
          <h3>
            Move Order: {moves}<br />
            Max Hand Used: {maxHand}
          </h3>
          <button id='next-setup' onClick={() => nextSetup(setupIndex)}>
            <p>
              {setupIndex === startingBoards.length - 1 ? "End" : `Setup ${setupIndex + 2} of ${startingBoards.length}`}
            </p>
          </button>
        </EndPopup>) :
        null
      }
    </div>
  );
}