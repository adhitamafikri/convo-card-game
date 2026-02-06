# PRD and System Design Document

This is the PRD and System Design for `v0` version of this game

---

## **Product Requirements**

### Inspirations

This project is heavilty inspired by **Obrolan Hati**, **Deep Talk**, or **Truth or Dare** conversation card game to make people's gathering more engaging.

Here are some examples of the physical products that is being used as inspirations:

- [https://tk.tokopedia.com/ZSa7qn3Ay/](https://tk.tokopedia.com/ZSa7qn3Ay/)
- [https://tk.tokopedia.com/ZSa7bjhyF/](https://tk.tokopedia.com/ZSa7bjhyF/)

### The Game Mechanics

Here are the important mechanics of the `v0` version of this game:

1. The player would see a simple splash screen and menu screen when they visit this game site
2. This game has 3 different themes of conversation cards that could be selected by the players

- Family
- Friends
- Couples

3. Each theme contains **30** cards of conversation-starting questions

- 1 "Opening" card (the purpose of this card is for Safety & Rules)
- 28 convo card (the core, exploration with questions based on selected theme)
- 1 "Closing" card (the purpose of this card is for the Aftercare & Exit)

4. Once the player selects a theme, player would be prompted to input the number of players. (2 player minimum, 4 player max)
5. After inputting the number of players, the game would display N number of text field components to input the players' name
6. After inputting the player names, the player should click on the "Begin" button and be redirected into a game room session
7. When the game room is open for the first time, the opening card would be displayed.
8. The primary _28_ cards would be shuffled, then drawn to the table. The amount of card drawn to the table, equals the amount of players that is registered in the current session
9. The player would take-turns to pick a card drawn to the table.
10. Once a card is picked by the player, the question will be revealed and the player will have to ask each players to answer it. An "End Turn" button would also be displayed
11. When the player is satisfied with the answers from the other players, they can click the "End Turn" button.
12. Another card would be drawn to the table so the amount of card would still match the number of players (as long as there is still enough cards in the stack)
13. The game would loop from `Step 8` to `Step 12` as long as there are remaining convo-cards in the stack
14. Once the convo-cards stack are empty, the "Closing" card would be displayed. Basically tells the player not to have any hard feelings or take any offense from the those questions. A "Back to Menu" button will be displayed
15. Player would be redirected back to Menu page after clicking "Back to Menu"
16. In the game room page, the player would see a "Force Stop Session" button to stop the current session and immediately back to main menu

### The Nature of Questions

Here are the important nature of the questions written on each card for every theme, ensuring that the game is engaging, fun, and does not offend the players' personal space:

1. Types of questions need to be included in the game:

- Icebreaker
- Humorous/Absurd

2. Types of questions need to be avoided:

- politics
- religion
- money/salary
- anything about sex, porn, anything vulgar (NON-NEGOTIABLE)

---

## **System Design**

### Functional Requirements

1. The index page of our game should display a splash screen and menu
   - Clicking "Play" button would display player input dialog, allowing the host to input number of players and name of players who want to join the session
2. The host player would first select a game theme from 3 available themes, then input the number of players (2-4 players), then input player names

### Non Functional Requirements

1. Performance: Smooth transitions, subtle animations with CSS solutions
2. Accessibility: Keyboard navigations
3. Scalability: Turn-based player in a single device, data persistence with localStorage, card theme and stack settings are hardcoded in a config .ts file.
4. Security: No external API calls, client-only

### Project Architecture

> Base path: **project root**

1. Pages structure

- Splash screen and main menu page: `app/page.tsx`
- Game room page: `app/game-room/page.tsx`
  - Only accessible if the `Session` data exists

2. Components Architecture

- Instead of writing all components into solely into the `pages.tsx` or `layout.tsx`, we need to create reusable components and put them in the `components/` directory.
  - `Input`
  - `Button`
  - `Modal`
  - `GameCard`
  - `CardStack`
  - `GameDeck`
  - `Header`
  - `Footer`

3. Content Management

- We will utilize simple configs for handling all of our core game contents

  - `configs/contents.ts`: In this file we will contain all the core game contents such as **Game Themes** and **Card Contents**

4. State Management

- React Context for easy access of all game state
  - Contexts:
    - `contexts/GameStateContext.tsx`
  - Hooks
    - `hooks/useGameState.tsx`

### Data Model

1. Player

```typescript
type Player = {
  id: string;
  name: string;
};
```

2. Game Theme

```typescript
type GameTheme = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

type GameThemes = Record<
  "family" | "friends" | "couples",
  GameTheme
>;

// Example
const gameThemes: GameThemes = {
  family: {
    id: "gt-01",
    name: "Family",
    slug: "family",
    description: "synthesized_content",
  },
  friends: {
    id: "gt-02",
    name: "Friends",
    slug: "friends",
    description: "synthesized_content",
  },
  couples: {
    id: "gt-03",
    name: "Couples",
    slug: "couples",
    description: "synthesized_content",
  },
};
```

3. Card

```typescript
type GameCardContent = {
  id: string;
  content: string;
  isOpening: boolean;
  isClosing: boolean;
};

type GameCardContents = Record<
  "family" | "friends" | "couples",
  GameCardContent[]
>;

// Example
const gameCardContents: GameCardContents = {
  family: [
    {
      id: "crd-01-gt-01",
      content: "synthesized_content",
      isOpening: true,
      isClosing: false,
    },
    ...
  ],
  ...
};
```

4. Session

```typescript
type Session = {
  id: string;
  players: Player[];
  currentPlayer: string; // id of current Player
  cardsOnStack: Card[];
  cardsOnDeck: Card[];
  selectedCard: Card;
  createdAt: string;
  updatedAt: string;
};
```

### State Management Design
> The whole state of the game would be handled by a single React Context and hook, allowing any pages and components to easily access and modify states

**State Management Context**
```typescript
type GameContextType = {
  // selected game theme state
  // selected game cards state
}
```

**State Management Hook**
```typescript
function useGameState() {}
```

### Interface Design

- All of the pages and components should be styled using TailwindCSS + daisyUI
- All of the pages have the same structures:
  - Header at the very top part of the page
  - Main content container spanning 100vw and with minimum height of the rest of the viewport height (100vh - height_of_header)
  - Footer at the very bottom part of the page

1. Splash Screen
   - This will be displayed at the Main Menu page. Think of it as the frontmost layer that is being displayed on the page
   - Splash screen only be displayed once, when the player visits the page for the first time
2. Main Menu Page
   - Contains a simple game menu, centered in the main content container.
   - The menu elements are placed vertically: Title of the game, "Play" button
   - Player Input Dialog
     - Contains Input field for number of players
     - Contains N number of Input fields for player names
     - Contains "Next" button that triggers Game Theme selection dialog and closes Player Input Dialog
   - Game Theme Selection Dialog
     - Displays 3 different themes horizontally
     - Each theme are represented with `title` and `description` of the game theme
     - Each theme has a radio button that could be used to select that theme
     - Contains a "Start Game" button that chooses the theme, establish all the game state, and redirect the player to the Game Room page
3. Game Room Page
   - Displays the "Opening" card content and "Begin" button
   - Displays the cards that is drawn to the deck using simple `GameCard` component its content hidden
   - When the player clicks on a `GameCard`, the content of that selected card would be revealed and displayed to the player
   - An "End Turn" button would be displayed when a `GameCard` content is being displayed
   - There is a "Force Stop Session" floating at the top-right position of the viewport
