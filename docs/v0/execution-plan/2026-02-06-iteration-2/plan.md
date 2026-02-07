# Iteration 2

The core objective of this iteration is to create the core mechanics of the game

---

## Reference Docs

> Use these reference docs to know the specifications and constraints of the system and contents that we are going to implement

- `docs/v0/2026-02-05-prd-and-system-design.md` - "### The Game Mechanics"

## Execution Plan

### Phase 1 - Game Room UI Overhaul

> This phase basically focuses on redesigning the game room page based on the lofi wireframe of `lofi-wireframe-game-room-page.png`

Status: **DONE**
Actions:

- Read the wireframe `./lofi-wireframe-game-room-page.png` to better understand the layouts, the items, and the actions that the room has to have
- Scrap the current page design and improve them based on the `./lofi-wireframe-game-room-page.png`
- Adjust the existing logic to cater the new behaviors presented in the wireframe
- Provide better UI base, layouts, component structure, and colors

### Phase 2 - Actual Core Game Mechanics

> Objective more controlled

Status: **Not Done**
Actions:

- Install zustand
- Create `game-session-store.ts`, `card-store.ts`, `player-store.ts` that:
  - Manages active game session state
  - Manages selected game theme
  - Manages deck
  - Manages player data and turns
  - Manages game session stats
- Wire up the store to the components
- Implement continue game mechanic
- Implement `/game/[sessionId]/room` URL fragment as the game room URL. Replacing the old `/game-room` one, making it impossible for the players to access this page if they have no active game sessions
