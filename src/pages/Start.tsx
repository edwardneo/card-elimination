import React from "react";
import '../css/Start.css'

interface StartProps {
  numSetups: number,
  selectSetup(setupIndex: number): void
}

export function Start({ numSetups, selectSetup }: StartProps) {
  const generateSetups = (numSetups: number, selectSetup: (setupIndex: number) => void) => {
    const setups: JSX.Element[] = [];

    for (let i = 0; i < numSetups; i++) {
      setups.push(
        <SetupButton key={i} selectSetup={() => selectSetup(i)}>
          <p className='setupLabel'>
            {`Setup ${i + 1}`}
          </p>
        </SetupButton>
      );
    }

    return setups;
  }

  return (
    <div className='startPage'>
      <h1 className='title'>Card Elimination</h1>
      <p className='instructions'>
        Goal: Keep your maximum hand size low. <br />
        How to play: Take cards from the top of the stacks and match three-of-a-kind of one color in your hand to eliminate them. <br />
        Choose one of the setups to get started!
      </p>
      <div className='setups'>
        {generateSetups(numSetups, selectSetup)}
      </div>
    </div>
  );
}

interface SetupButtonProps {
  selectSetup(): void,
  children: JSX.Element
}

function SetupButton({ selectSetup, children }: SetupButtonProps) {
  return (
    <button className='setup' onClick={selectSetup}>
      {children}
    </button>
  )
}