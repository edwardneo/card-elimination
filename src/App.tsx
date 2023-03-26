import { useState, useEffect } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { EndPage } from './pages/EndPage';

import './css/App.css';

import { layouts } from './data/Layouts';

function App() {
  type PageType = 'start' | 'game' | 'end';

  const [page, setPage] = useState<PageType>('start');
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const [moveOrders, setMoveOrders] = useState<string[]>([]);
  const [gameHands, setGameHands] = useState<number[][]>([]);

  useEffect(() => {
    document.title = 'Card Elimination';
  }, []);

  const startGame = () => {
    setLayoutIndex(0);
    setPage('game');
  }

  const addGameData = (moveOrder: string, handLengths: number[]) => {
    setMoveOrders(moveOrders.concat([moveOrder]));
    setGameHands(gameHands.concat([handLengths]));
  }

  const nextLayout = (layoutIndex: number) => {
    if (layoutIndex + 1 < layouts.length) {
      setLayoutIndex(layoutIndex + 1);
    } else {
      setPage('end');
    }
  }

  const renderPage = (page: PageType) => {
    switch(page) {
      case 'start':
        return (<StartPage startGame={startGame} />);
      case 'game':
        return (<GamePage key={layoutIndex} layoutIndex={layoutIndex} addGameData={addGameData} nextLayout={nextLayout} />);
      case 'end':
        return (<EndPage moveOrders={moveOrders} gameHands={gameHands} />);
    }
  }
  
  return renderPage(page);
}

export default App;
