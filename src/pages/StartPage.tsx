import { useNavigate } from 'react-router-dom';
import '../css/Start.css';
import { layouts } from '../data/Layouts';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <div className='page'>
      <h1 className='title'>Card Elimination</h1>
      <p className='instructions'>
        <span className='bold'>Goal:</span> Keep your maximum hand size low. <br />
        <span className='bold'>How to play:</span> Take cards from the top of the stacks and match three-of-a-kind of one color in your hand to eliminate them. <br />
      </p>
      <div className='layouts'>
        {layouts.map((layout, index) => 
          <button id='start-btn' onClick={() => navigate(index.toString())}>
            <p id='start-btn-label'>
              Layout {index + 1}
            </p>
          </button>
        )}
      </div>
    </div>
  );
}