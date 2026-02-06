import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlayerList } from "./player-list";
import type { Player } from "@/types";

describe("PlayerList", () => {
  const mockPlayers: Player[] = [
    { id: "player-1", name: "Alice" },
    { id: "player-2", name: "Bob" },
    { id: "player-3", name: "Charlie" },
  ];

  it("renders all players", () => {
    render(<PlayerList players={mockPlayers} currentPlayerIndex={0} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("highlights the current player", () => {
    render(<PlayerList players={mockPlayers} currentPlayerIndex={1} />);

    const bobElement = screen.getByText("Bob");
    expect(bobElement).toHaveClass("text-primary");
    expect(bobElement).toHaveClass("font-bold");
  });

  it("shows indicator for current player", () => {
    const { container } = render(
      <PlayerList players={mockPlayers} currentPlayerIndex={0} />
    );

    const indicators = container.querySelectorAll(".text-primary");
    // Should have at least one visible indicator (the arrow)
    expect(indicators.length).toBeGreaterThan(0);
  });

  it("handles empty players array", () => {
    render(<PlayerList players={[]} currentPlayerIndex={0} />);

    expect(screen.getByText("Belum ada pemain")).toBeInTheDocument();
  });

  it("handles single player", () => {
    const singlePlayer: Player[] = [{ id: "player-1", name: "Solo" }];
    render(<PlayerList players={singlePlayer} currentPlayerIndex={0} />);

    expect(screen.getByText("Solo")).toBeInTheDocument();
  });

  it("handles last player as current", () => {
    render(<PlayerList players={mockPlayers} currentPlayerIndex={2} />);

    const charlieElement = screen.getByText("Charlie");
    expect(charlieElement).toHaveClass("text-primary");
  });

  it("renders player list title", () => {
    render(<PlayerList players={mockPlayers} currentPlayerIndex={0} />);

    expect(screen.getByText("Pemain")).toBeInTheDocument();
  });
});
