import React, { useState } from 'react';
import { Card } from './Card';

interface BoardProps {
  board: string[][],
  takeCard(rowId: number): void,
}

export function Board({ board, takeCard }: BoardProps) {
  const startingBoards = [
    [
      '131242',
      '412323',
      '142243',
      '443131',
    ]
  ]

  return (
    <div id='board'>
      {board.map((cardColors, index) => <Row key={index} cardColors={cardColors} takeCard={() => takeCard(index)} />)}
    </div>
  )
}

interface RowProps {
  cardColors: string[],
  takeCard(): void,
}

function Row({ cardColors, takeCard }: RowProps) {
  const createCards = (cardColors: string[]) => {
    const cards = [];

    for (let i = 0; i < cardColors.length - 1; i++) {
      cards.push(
        <Card
          className="stack"
          key={cards.length}
          index={cards.length}
          color={cardColors[i]}
        />
      );
    }
    if (cardColors.length != 0) {
      cards.push(
        <Card
          className="stack last-card"
          key={cards.length}
          index={cards.length}
          color={cardColors[cardColors.length - 1]}
          onClick={takeCard}
        />
      );
    } else {
      cards.push(
        <Card
          className="stack"
          key={cards.length}
          index={cards.length}
        />
      );
    }

    return cards
  }

  return (
    <div className='row'>
      {createCards(cardColors)}
    </div>
  )
}