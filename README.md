# `card-elimination`
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is written in Typescript.

## Primary Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run watch`

Runs the app in the development mode and updates after file and folder changes. Use this primarily in development.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run deploy`

Builds the app for production, pushes it to the `gh-pages` branch, and deploys app to Github Pages.\
Open [https://edwardneo.github.io/card-elimination/](https://edwardneo.github.io/card-elimination/) to view it in the browser.

## File structure

### `/App.tsx`

**Types and Interfaces**
- `type PageType: 'start' | 'game' | 'end'` | Represents different page statuses

#### `App`

*Handles all of the higher level logic and renders the pages*

**States**
- `page: PageType` | Displayed page
- ```layoutIndex: number``` | Index of displayed layout
- ```moveOrders: string[]``` | Array containing every round's move order (a round's move order is represented by a string)
- `gameHands: number[][]` | Array containing the changing hand length of every round (a round's hand length is represented by an array of numbers)

**Functions**
- ```startGame() -> null``` | Sets layout to start page
- ```addGameData(moveOrder: string, handLengths: number[]) -> null``` | Adds game data to `moveOrders` and `gameHands`
- ```nextLayout(layoutIndex: number) -> null``` | Renders next layout or end page (depending on `layoutIndex`)
- ```renderPage(page: pageType) -> JSX.Element``` | Renders respective page according to current state

### `/pages/StartPage.tsx`

**Types and Interfaces**
- `interface StartProps` | Props for `StartPage`
  - `startGame() -> void` | Callback function to start the game and render first layout

#### `StartPage`

*Has static title and game information, and a button that calls back to change to game layouts*

### `/pages/GamePage.tsx`

**Types and Interfaces**
- `interface GameProps` | Props for `GamePage`
  - `layoutIndex: number` | Index of currently displayed layout from `/data/Layouts`
  - `addGameData(moveOrder: string, handLengths: number[]) -> void` | Callback function to update gameplay data
  - `nextLayout(layoutIndex: number) -> void` | Callback function to change to next layout or end page

#### `GamePage`

*Has board, hand, and end popup*

**States**
- `board: string[][]` | Array of current card stacks on the board, where each stack is an array of names of colors and the last entry is the card on the top of the stack
- `hand: HandObject` | `HandObject` (found in `/components/Hand.tsx`) instance representing current hand
- `move: string` | String of moves, where the nth character corresponds to the stack a card was pulled from on the nth move
- `handLengths: number[]` | Array of changing hand lengths throughout the round
- `gameEndPopup: boolean` | Boolean representing if the current round has ended or not

**Functions**
- `takeCard(rowId: number) -> void` | Handles changing all of the states after a card is taken from the board

### `/pages/EndPage.tsx`

**Types and Interfaces**
- `interface EndProps` | Props for `EndPage`
  - `moveOrders: string[]` | Array of move orders from each layout, represented by strings where the nth character corresponds to the stack a card was pulled from on the nth move
  - `gameHands: number[][]` | Array of hand length changes from each layout, where each round's hand lengths are represented by an array of hand lengths

#### `EndPage`

*Has text representing gameplay, a Google Form to record data, and Qualtrics integration*

**States**
- `board: string[][]` | Array of current card stacks on the board, where each stack is an array of names of colors and the last entry is the card on the top of the stack
- `hand: HandObject` | `HandObject` (found in `/components/Hand.tsx`) instance representing current hand
- `move: string` | String of moves, where the nth character corresponds to the stack a card was pulled from on the nth move
- `handLengths: number[]` | Array of changing hand lengths throughout the round
- `gameEndPopup: boolean` | Boolean representing if the current round has ended or not

**Functions**
- `takeCard(rowId: number) -> void` | Handles changing all of the states after a card is taken from the board

### `/components/Board.tsx`

**Types and Interfaces**
- `interface BoardProps` | Props for `Board`
  - `board: string[][]` | Array of current card stacks on the board, where each stack is an array of names of colors and the last entry is the card on the top of the stack
  - `takeCard(rowId: number) -> void` | Handles changing all of the states after a card is taken from the board
- `interface RowProps` | Props for `Row`
  - `cardColors: string[]` | Array of card colors in stack
  - `takeCard() -> void` | Handles changing all of the states after a card is taken from this row

#### `Board`

*Has rows holding card stacks and countdown timer*

#### `Row`

*Has card stack*

**Functions**
- `createCards(cardColors: string[]) -> JSX.Element[]` | Returns array of card components to render

### `/components/Card.tsx`

**Types and Interfaces**
- `interface CardProps` | Props for `Card`
  - `className?: string` | Classes added to parent `div`
  - `index?: number` | Index of card in row for shifting position for stack visual effect
  - `color?: string` | Background color of card
  - `onClick?() -> void` | Callback function when card is clicked

#### `Card`

*Has card shaped `div` with passed in background color and uses `onClick()` callback function*

### `/components/EndPopup.tsx`

**Types and Interfaces**
- `interface EndPopupProps` | Props for `EndPopup`
  - `children: ReactNode` | Children of EndPopup component

#### `EndPopup`

*Has centered popup containing children components*

### `/components/Hand.tsx`

**Types and Interfaces**
- `interface HandObject` | Interface representing a hand
  - `[key: string]: number` | Key-value pair of how many cards the hand has for each color
- `interface HandProps` | Props for `Hand`
  - `hand: HandObject` | Current hand being displayed
  - `maxHand: number` | Current max hand reached so far

#### `Hand`

*Has cards in hand sorted by color and counter logging current max hand*

**Functions**
- `createHand(hand: HandObject) -> JSX.Element[]` | Returns array of card components to render

### `/components/Timer.tsx`

#### `Timer`

*Has timer counting down from two minutes*

**States**
- `timer: string` | String of timer display

**References**
- `endTime: React.MutableRefObject<number>` | Ending time for timer in seconds since epoch

**Functions**
- `updateTime() -> void` | Updates timer state and is called every second by `useInterval`

### `/css/App.css`

*General button and page CSS*

### `/css/End.css`

*End page CSS for title, instructions, container elements, and copy button*

### `/css/Game.css`

*Game CSS for board, timer, hand, card, and end popup*

### `/css/Start.css`

*Start page CSS for title, instructions, and layout selection container*

### `/data/Layouts.tsx`

*Layouts displayed in game*

**Types and Interfaces**
- `interface LayoutType` | Interface representing a layout
  - `board: string[]` | Array of stacks in layout, where each stack is represented by a string of digits and equal digits represent one card type
  - `elimNum: number` | Threshold number when cards are eliminated in the hand

**Statics**
- `layouts: LayoutType[]` | Array of layouts in game