import { useState, useEffect } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';

import './css/App.css';

import { layouts } from './data/Layouts';
import { Routes, Route } from 'react-router-dom';

function App() {
  type PageType = 'start' | 'game' | 'end';

  const [page, setPage] = useState<PageType>('start');
  const [layoutIndex, setLayoutIndex] = useState<number>(0);

  const [moveOrders, setMoveOrders] = useState<string[]>([]);
  const [gameHands, setGameHands] = useState<number[][]>([]);

  useEffect(() => {
    document.title = 'Card Elimination';
  }, []);

  const addGameData = (moveOrder: string, handLengths: number[]) => {
    setMoveOrders(moveOrders.concat([moveOrder]));
    setGameHands(gameHands.concat([handLengths]));
  }
  
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />
      <Route path=':layoutIndexStr' element={<GamePage addGameData={addGameData} />} />
    </Routes>
  );
}

export default App;
