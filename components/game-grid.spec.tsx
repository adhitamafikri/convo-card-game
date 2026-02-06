import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameGrid } from "./game-grid";
import type { Card } from "@/types";

describe("GameGrid", () => {
  const mockCards: Card[] = [
    { id: "card-1", content: "Question 1", isOpening: false, isClosing: false },
    { id: "card-2", content: "Question 2", isOpening: false, isClosing: false },
    { id: "card-3", content: "Question 3", isOpening: false, isClosing: false },
    { id: "card-4", content: "Question 4", isOpening: false, isClosing: false },
  ];

  it("renders all cards", () => {
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
      />
    );

    const cards = container.querySelectorAll(".card");
    expect(cards).toHaveLength(4);
  });

  it("handles empty cards array", () => {
    const mockOnSelect = vi.fn();
    render(
      <GameGrid cards={[]} selectedCardId={null} onCardSelect={mockOnSelect} />
    );

    expect(screen.getByText("Belum ada kartu di meja")).toBeInTheDocument();
  });

  it("calls onCardSelect when card is clicked", async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
      />
    );

    const firstCard = container.querySelectorAll(".card")[0];
    await user.click(firstCard);

    expect(mockOnSelect).toHaveBeenCalledWith(mockCards[0]);
  });

  it("applies correct grid columns class for 2 columns", () => {
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
        columns={2}
      />
    );

    const grid = container.querySelector(".grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("applies correct grid columns class for 3 columns", () => {
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
        columns={3}
      />
    );

    const grid = container.querySelector(".grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("applies correct grid columns class for 4 columns", () => {
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
        columns={4}
      />
    );

    const grid = container.querySelector(".grid-cols-4");
    expect(grid).toBeInTheDocument();
  });

  it("highlights selected card", () => {
    const mockOnSelect = vi.fn();
    render(
      <GameGrid
        cards={mockCards}
        selectedCardId="card-2"
        onCardSelect={mockOnSelect}
      />
    );

    // Selected card should show its content
    expect(screen.getByText("Question 2")).toBeInTheDocument();
  });

  it("uses default 2 columns when not specified", () => {
    const mockOnSelect = vi.fn();
    const { container } = render(
      <GameGrid
        cards={mockCards}
        selectedCardId={null}
        onCardSelect={mockOnSelect}
      />
    );

    const grid = container.querySelector(".grid-cols-2");
    expect(grid).toBeInTheDocument();
  });
});
