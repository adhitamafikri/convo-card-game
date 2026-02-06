import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameStats } from "./game-stats";

describe("GameStats", () => {
  it("renders all three stat categories", () => {
    render(
      <GameStats closedCardsCount={5} deckCardsCount={4} cardsInStackCount={20} />
    );

    expect(screen.getByText("Selesai")).toBeInTheDocument();
    expect(screen.getByText("Di Meja")).toBeInTheDocument();
    expect(screen.getByText("Tumpukan")).toBeInTheDocument();
  });

  it("displays correct counts", () => {
    render(
      <GameStats closedCardsCount={10} deckCardsCount={3} cardsInStackCount={15} />
    );

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("handles zero values", () => {
    render(
      <GameStats closedCardsCount={0} deckCardsCount={0} cardsInStackCount={0} />
    );

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(3);
  });

  it("handles large numbers", () => {
    render(
      <GameStats closedCardsCount={999} deckCardsCount={100} cardsInStackCount={500} />
    );

    expect(screen.getByText("999")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(
      <GameStats closedCardsCount={0} deckCardsCount={0} cardsInStackCount={0} />
    );

    expect(screen.getByText("Statistik")).toBeInTheDocument();
  });
});
