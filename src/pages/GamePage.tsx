import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/Game.css";

import { Board } from "../components/Board";
import { Hand, HandObject } from "../components/Hand";
import { EndPopup } from '../components/EndPopup';

import { layouts } from '../data/Layouts';

interface GameProps {
  addGameData(moveOrder: String, handLengths: number[]): void;
}

const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange', 'cyan'];

export function GamePage({ addGameData }: GameProps) {
  const { layoutIndexStr } = useParams();
  const navigate = useNavigate();

  const layoutIndex = Number(layoutIndexStr);
  console.log(layoutIndex);

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
      <Hand hand={hand} maxHand={handLengths.length === 0 ? 0 : Math.max(...handLengths)} />
      {
        gameEndPopup ?
        (<EndPopup>
          <h1>Nice!</h1>
          <h3>
            Move Order: {moves}<br />
            Hand Lengths: {handLengths}<br />
            Max Hand Used: {handLengths.length === 0 ? 0 : Math.max(...handLengths)}
          </h3>
          <button id='next-layout' onClick={() => navigate('/')}>
            <p>
              Back to Start
            </p>
          </button>
        </EndPopup>) :
        null
      }
    </div>
  );
}