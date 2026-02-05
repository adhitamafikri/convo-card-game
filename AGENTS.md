---
description: Fun game to make your gathering more engaging, fun, and enjoyable
alwaysApply: true
---

# Obrolan Card Game

**Digitalized "Obrolan Kita" type of card game**

https://github.com/kjonexa/obrolan-card-game (Private)

---

## Tech Stacks
- Frontend: NextJS 16.x (app router) + Typescript
- Bundler: Turbopack
- Package Manager and Runner: Bun ~1.3 (as mentioned in .prototools), use this for installing and updating project dependencies
- Styling and UI Kit: TailwindCSS + DaisyUI
- Unit testing: vitest + testing-library/react
- Code Quality: eslint

## Documentations
This project's documentations live in `./docs` and `./notes` directories with some distinctions
- **./docs**: This is where the developer writes the documentation by hand. It is expected that this directory contains the ideas, thoughts, and plans from the developer.
    - **Examples**
        - PRD,
        - System Design Documents
        - Feature execution plans
        - .etc
    - **What you can do**
        - Help developer review and refine the documents
        - Help developer refine and iterate with their plans
- **./notes**: This is where you, the *AI AGENT* write your documents/notes autonomously
    - **Notes naming convention**
        - **ALWAYS use YYYY-MM-DD-slug.md format** for all documentation files
        - Get current date from system: `date +%Y-%m-%d`
        - Never assume or hardcode dates
        - Use lowercase with hyphens for slugs (e.g., `2025-11-05-feature-implementation.md`)
        - Examples:
          - ✅ `2025-11-07-docker-compose-setup.md`
          - ✅ `2025-10-22-ui-audit-results.md`
          - ❌ `setup.md` (missing date)
          - ❌ `IMPROVEMENTS.md` (missing date, uppercase)
          - ❌ `FINAL_AUDIT_2025-10-22.md` (date in wrong position)
    - **What you can do**
        - Write system analysis documents
        - Write bug investigation or RCA documents
        - Write suggestions on how developer could improve the system, fix the problem, or implement the new feature

## NextJS File and Component Naming Conventions

### Handling NextJS Pages and Layouts
- In NextJS 16.x, we can create new url fragments by creating directories with a `page.tsx` file inside the `app/` directory. Example:
    - `/game-room` -> `app/game-room/page.tsx`
    - `/game-room/:gameRoomId/summary` -> `app/game-room/[gameRoomId]/summary/page.tsx`

### Handling NextJS Components
- Always look for the existing components in the `components/` directory to make sure that we are not remaking or duplicating components
- It is preferrable to use kebab-case format for component file naming and camelCase for actual component naming inside the file. Example:
    - `game-card.tsx` as file name
    - `GameCard` as the actual component name in the file

## Unit Testing
It is important for us to do unit testing

### Test File Naming Convention and Placement
- Put the test file in same directory as the files they are testing
- Test files should have named with the format of `file-name.spec.ts`

### Using the Right Tool For the Testing Type
- Utilize `vitest` for simple unit testing
- Utilize `testing-library/react` for unit testing files that contains React components, contexts, or hooks
