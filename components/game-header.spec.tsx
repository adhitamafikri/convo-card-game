import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameHeader } from "./game-header";

describe("GameHeader", () => {
  it("renders with default room name", () => {
    const mockOnExit = vi.fn();
    render(<GameHeader onExit={mockOnExit} />);

    expect(screen.getByText("SambungRasa")).toBeInTheDocument();
  });

  it("renders with custom room name", () => {
    const mockOnExit = vi.fn();
    render(<GameHeader onExit={mockOnExit} roomName="Custom Room" />);

    expect(screen.getByText("Custom Room")).toBeInTheDocument();
  });

  it("renders exit button", () => {
    const mockOnExit = vi.fn();
    render(<GameHeader onExit={mockOnExit} />);

    expect(screen.getByRole("button", { name: /keluar/i })).toBeInTheDocument();
  });

  it("calls onExit when exit button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnExit = vi.fn();
    render(<GameHeader onExit={mockOnExit} />);

    const exitButton = screen.getByRole("button", { name: /keluar/i });
    await user.click(exitButton);

    expect(mockOnExit).toHaveBeenCalledTimes(1);
  });

  it("renders logo icon", () => {
    const mockOnExit = vi.fn();
    const { container } = render(<GameHeader onExit={mockOnExit} />);

    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();
  });
});
