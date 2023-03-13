import React, { useState } from 'react';

interface CardProps {
  label: string
}

export function Card({ label }: CardProps) {
  return (
    <div className="card">
      {label}
    </div>
  );
}