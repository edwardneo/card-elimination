import React, { useState } from 'react';
import { Card } from './Card';

interface HandProps {
  hand: string[];
}

export function Hand({ hand }: HandProps) {
  return (
    <div id="hand">
      {hand ? hand.map(card => <Card color={card} />) : null}
    </div>
  )
}