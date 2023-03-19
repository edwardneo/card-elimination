import { Card } from './Card';

export interface HandObject {
  [key: string]: number
}

interface HandProps {
  hand: HandObject;
  maxHand: number;
}

export function Hand({ hand, maxHand }: HandProps) {

  const createHand = (hand: HandObject) => {
    const handCards = [];
    for (const color in hand) {
      for (let i = 0; i < hand[color]; i++) {
        handCards.push(<Card
          key={handCards.length}
          color={color}
        />);
      }
    }
    return handCards;
  }

  return (
    <div id='hand'>
      {hand ? createHand(hand) : null}
      <div id='max-hand-counter'>
        <h5>{`Max Hand Used: ${maxHand}`}</h5>
      </div>
    </div>
  )
}