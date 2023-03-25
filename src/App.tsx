import { useState, useEffect } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { EndPage } from './pages/EndPage';

import './css/App.css';

import { startingBoards } from './data/Setups';

function App() {
  type PageType = 'start' | 'game' | 'end';

  const [page, setPage] = useState<PageType>('start');
  const [setupIndex, setSetupIndex] = useState<number>(0);

  const [moveOrders, setMoveOrders] = useState<string[]>([]);
  const [maxHands, setMaxHands] = useState<number[]>([]);

  useEffect(() => {
    document.title = 'Card Elimination';
  }, []);

  const startGame = () => {
    setSetupIndex(0);
    setPage('game');
  }

  const addGameData = (moveOrder: string, maxHand: number) => {
    setMoveOrders(moveOrders.concat([moveOrder]));
    setMaxHands(maxHands.concat([maxHand]));
  }

  const nextSetup = (setupIndex: number) => {
    if (setupIndex + 1 < startingBoards.length) {
      setSetupIndex(setupIndex + 1);
    } else {
      setPage('end');
    }
  }

  const renderPage = (page: PageType) => {
    switch(page) {
      case 'start':
        return (<StartPage startGame={startGame} />);
      case 'game':
        return (<GamePage key={setupIndex} setupIndex={setupIndex} addGameData={addGameData} nextSetup={nextSetup} />);
      case 'end':
        return (<EndPage setups={startingBoards} moveOrders={moveOrders} maxHands={maxHands} />);
    }
  }
  
  return renderPage(page);
}

export default App;
