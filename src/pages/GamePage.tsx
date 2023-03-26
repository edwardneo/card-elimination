import React, { useState } from 'react';
import "../css/Game.css";

import { Board } from "../components/Board";
import { Hand, HandObject } from "../components/Hand";
import { EndPopup } from '../components/EndPopup';

import { layouts } from '../data/Layouts';

interface GameProps {
  layoutIndex: number;
  addGameData(moveOrder: String, handLengths: number[]): void;
  nextLayout(layoutIndex: number): void;
}

export function GamePage({ layoutIndex, addGameData, nextLayout }: GameProps) {
  const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

  const startingHand: HandObject = colors.reduce((obj, color) => ({ ...obj, [color]: 0 }), {});

  const processBoard = (board: string[]) => {
    return board.map((stack: string) => stack.split("").map(cardChar => colors[parseInt(cardChar) - 1]));
  }

  const [board, setBoard] = useState(processBoard(layouts[layoutIndex].board));
  const [hand, setHand] = useState(startingHand);
  const [moves, setMoves] = useState("");
  const [handLengths, setHandLengths] = useState<number[]>([]);
  const [gameEndPopup, setGameEndPopup] = useState(false);

  const takeCard = (rowId: number) => {
    const boardCopy = board.map(row => [...row]);
    if (0 <= rowId && rowId < board.length) {
      const newCard = boardCopy[rowId].pop();
      if (newCard) {
        const handCopy = {...hand};
        handCopy[newCard]++;

        if (handCopy[newCard] === layouts[layoutIndex].elimNum) {
          handCopy[newCard] = 0;
        }

        const newHandLengths = handLengths.concat([Object.keys(handCopy).reduce((total, key) => total + handCopy[key], 0)]);
        setHandLengths(newHandLengths);

        setHand(handCopy);
        setBoard(boardCopy);

        const newMoves = moves + rowId.toString();
        setMoves(newMoves);

        if (boardCopy.every(row => row.length === 0)) {
          setGameEndPopup(true);
          addGameData(newMoves, newHandLengths);
        }
      }
    }
  }

  return (
    <div className='page'>
      <Board board={board} takeCard={takeCard} />
      <Hand hand={hand} maxHand={Math.max(...handLengths)} />
      {
        gameEndPopup ?
        (<EndPopup>
          <h1>Nice!</h1>
          <h3>
            Move Order: {moves}<br />
            Hand Lengths: {handLengths}<br />
            Max Hand Used: {Math.max(...handLengths)}
          </h3>
          <button id='next-layout' onClick={() => nextLayout(layoutIndex)}>
            <p>
              {layoutIndex === layouts.length - 1 ? "End" : `Layout ${layoutIndex + 2} of ${layouts.length}`}
            </p>
          </button>
        </EndPopup>) :
        null
      }
    </div>
  );
}