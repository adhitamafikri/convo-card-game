# Iteration 2

The core objective of this iteration is to create the core mechanics of the game

---

## Reference Docs

> Use these reference docs to know the specifications and constraints of the system and contents that we are going to implement

- `docs/v0/2026-02-05-prd-and-system-design.md` - "### The Game Mechanics"

## Execution Plan

### Phase 1 - Game Room UI Overhaul

> This phase basically focuses on redesigning the game room page based on the lofi wireframe of `lofi-wireframe-game-room-page.png`

Status: **Not Done**
Actions:

- Read the wireframe `./lofi-wireframe-game-room-page.png` to better understand the layouts, the items, and the actions that the room has to have
- Scrap the current page design and improve them based on the `./lofi-wireframe-game-room-page.png`
- Adjust the existing logic to cater the new behaviors presented in the wireframe

### Phase 2 - Actual Core Game Mechanics

Status: **Not Done**
Actions:

- Create core `GameSessionContext` for manage game states and actions
- Create hook `useGameSession` to access the states and actions from the context
- Wiring up contexts and hooks to the whole application
- TBD
