import React, { useState } from 'react';
import { Start } from './pages/Start';
import { Game } from './pages/Game';

function App() {
  const startingBoards = [
    [
      '131242',
      '412323',
      '142243',
      '443131',
    ]
  ]

  type PageType = 'start' | 'game';

  const [page, setPage] = useState<PageType>('start');
  const [setupIndex, setSetupIndex] = useState(0);

  const startGame = (setupIndex: number) => {
    setSetupIndex(setupIndex);
    setPage('game');
  }

  const renderPage = (page: PageType) => {
    switch(page) {
      case 'start':
        return (<Start numSetups={startingBoards.length} selectSetup={startGame} />);
      case 'game':
        return (<Game boardArray={startingBoards[setupIndex]} />);
    }
  }
  
  return renderPage(page);
}

export default App;
