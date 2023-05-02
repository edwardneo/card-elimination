import React, { useState, useRef } from 'react';
import { useInterval } from 'usehooks-ts';

export function Timer() {
  const endTime = useRef(Date.now() + (120 + 1) * 1000);

  const [timer, setTimer] = useState('2:00');

  const updateTime = () => {
    const timeLeft = Math.floor((endTime.current - Date.now()) / 1000);

    if (timeLeft >= 0) {
      let newTime = '';
      newTime += Math.floor(timeLeft / 60);
      newTime += ':'
      if (timeLeft % 60 < 10) newTime += '0';
      newTime += timeLeft % 60;
      setTimer(newTime)
    } else {
      setTimer('0:00');
    }
  }

  useInterval(updateTime, 1000);

  return (
    <div id='timer'>
      <h1>{timer}</h1>
    </div>
  )
}