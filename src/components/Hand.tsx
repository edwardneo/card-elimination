import React, { useState } from 'react';
import { Card } from './Card';

export function Hand() {
  return (
    <div id="hand">
      <Card label="yellow" />
      <Card label="yellow" />
      <Card label="yellow" />
      <Card label="yellow" />
    </div>
  )
}