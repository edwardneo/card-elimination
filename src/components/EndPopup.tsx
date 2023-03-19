interface EndPopupProps {
  moveOrder: string;
  maxHand: number;
}

export function EndPopup({ moveOrder, maxHand }: EndPopupProps) {
  return (
    <div>
      <div id='end-popup'>
        <h1>Nice!</h1>
        <h3>
          Move Order: {moveOrder}<br />
          Max Hand Used: {maxHand}
        </h3>
      </div>
      <div id='end-popup-overlay' />
    </div>
  )
}