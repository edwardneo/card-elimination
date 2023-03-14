import React, { useState } from 'react';

interface CardProps {
  color: string,
  onClick?(): void
}

export function Card({ color, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick ? onClick : () => {}} style={{backgroundColor: color}} />
  );
}