import '../css/Start.css';

interface StartProps {
  startGame(): void;
}

export function StartPage({ startGame }: StartProps) {
  return (
    <div className='page'>
      <h1 className='title'>Card Elimination</h1>
      <p className='instructions'>
        <span className='bold'>Goal:</span> Keep your maximum hand size low. <br />
        <span className='bold'>How to play:</span> Take cards from the top of the stacks and match three-of-a-kind of one color in your hand to eliminate them. <br />
      </p>
      <button id='start-btn' onClick={startGame}>
        <p id='start-btn-label'>
          Start
        </p>
      </button>
    </div>
  );
}