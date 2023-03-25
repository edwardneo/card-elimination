import { ReactElement } from 'react';
import { Copy } from '@emotion-icons/boxicons-regular/Copy';

import '../css/End.css';

interface EndProps {
  setups: string[][];
  moveOrders: string[];
  maxHands: number[];
}

export function EndPage({ setups, moveOrders, maxHands }: EndProps) {
  const makeGameArr = (setups: string[][], moveOrders: string[], maxHands: number[]) => {
    const gameArr: string[] = [];
    for (let i = 0; i < setups.length; i++) {
      let setupStr = '';
      setupStr += `${setups[i].length} ${setups[i][0].length} `;
      setupStr += setups[i].reduce((setupStr, row) => setupStr + row, '');
      let dataStr = `${moveOrders[i]} ${maxHands[i]}`;

      gameArr.push(setupStr);
      gameArr.push(dataStr);
    }
    return gameArr;
  }

  const gameArr = makeGameArr(setups, moveOrders, maxHands);

  return (
    <div className='page'>
      <h1 id='end-title'>
        Thanks for playing!
      </h1>
      <p id='end-instructions'>
        Please copy the text below and paste it into the following Google Form (logged into your Berkeley email): <a href='google.com'>google.com</a>
      </p>

      <div id='game-str-container'>
        <p>{gameArr.flatMap(line => [line, <br />]).slice(0, -1)}</p>
        <button id='copy-btn' onClick={() => navigator.clipboard.writeText(gameArr.join('\n'))}>
          <Copy size='30' />
        </button>
      </div>
    </div>
  )
}