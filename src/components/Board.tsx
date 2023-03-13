import React, { useState } from 'react';
import { Card } from './Card';

export function Board() {
  return (
    <div id="board">
      <Stack />
      <Stack />
      <Stack />
    </div>
  )
}

function Stack() {
  const cards = ['red', 'blue', 'green'];

  return (
    <div className="stack">
      {cards ? cards.map(card => <Card label={card} />) : null}
    </div>
  )
}