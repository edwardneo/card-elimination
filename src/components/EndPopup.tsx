import { ReactNode } from 'react';

interface EndPopupProps {
  children: ReactNode;
}

export function EndPopup({ children }: EndPopupProps) {
  return (
    <div>
      <div id='end-popup'>
        {children}
      </div>
      <div id='end-popup-overlay' />
    </div>
  )
}