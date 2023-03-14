import React, { useState } from 'react';
import { Card } from './Card';

export interface HandObject {
  [key: string]: number
}

interface HandProps {
  hand: HandObject;
}

export function Hand({ hand }: HandProps) {

  const createHand = (hand: HandObject) => {
    const handCards = [];
    for (const color in hand) {
      for (let i = 0; i < hand[color]; i++) {
        handCards.push(<Card key={handCards.length} color={color} />);
      }
    }
    return handCards;
  }

  return (
    <div id="hand">
      {hand ? createHand(hand) : null}
    </div>
  )
}