import { Copy } from '@emotion-icons/boxicons-regular/Copy';

import '../css/End.css';

import { layouts, LayoutType } from '../data/Layouts';

interface EndProps {
  moveOrders: string[];
  gameHands: number[][];
}

export function EndPage({ moveOrders, gameHands }: EndProps) {
  const formLink = 'https://forms.gle/En87Gkd5iZLaf5jS7';

  const makeGameArr = (layouts: LayoutType[], moveOrders: string[], gameHands: number[][]) => {
    const gameArr: string[] = [];
    for (let i = 0; i < layouts.length; i++) {
      let layoutStr = '';
      layoutStr += `${layouts[i].board.length} ${layouts[i].board[0].length} `;
      layoutStr += layouts[i].board.reduce((layoutStr, row) => layoutStr + row, '');
      let dataStr = `${moveOrders[i]} ${gameHands[i].join('')} ${gameHands[i].length === 0 ? 0 : Math.max(...gameHands[i])}`;

      gameArr.push(layoutStr);
      gameArr.push(dataStr);
    }
    return gameArr;
  }

  const gameArr = makeGameArr(layouts, moveOrders, gameHands);
  const gameArrToSend = JSON.stringify(gameArr);
  console.log("Sending experiment result:", gameArrToSend);
  window.parent.postMessage({ type: 'gameArr', data: gameArrToSend }, '*');

  return (
    <div className='page'>
      <h1 id='end-title'>
        Thanks for playing!
      </h1>
      <p id='end-instructions'>
        Please copy the text below and paste it into the following Google Form (logged into your Berkeley email): <a href={formLink} target="_blank" rel="noopener noreferrer">{formLink}</a>
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