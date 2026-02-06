import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ForceStopButton } from "./force-stop-button";

describe("ForceStopButton", () => {
  it("renders the button", () => {
    const mockOnForceStop = vi.fn();
    render(<ForceStopButton onForceStop={mockOnForceStop} />);

    expect(screen.getByRole("button", { name: /akhiri sesi/i })).toBeInTheDocument();
  });

  it("shows confirmation modal when clicked", async () => {
    const user = userEvent.setup();
    const mockOnForceStop = vi.fn();
    render(<ForceStopButton onForceStop={mockOnForceStop} />);

    const button = screen.getByRole("button", { name: /akhiri sesi/i });
    await user.click(button);

    expect(screen.getByText(/apakah anda yakin/i)).toBeInTheDocument();
    expect(screen.getByText(/semua progres akan hilang/i)).toBeInTheDocument();
  });

  it("closes modal when cancel is clicked", async () => {
    const user = userEvent.setup();
    const mockOnForceStop = vi.fn();
    render(<ForceStopButton onForceStop={mockOnForceStop} />);

    const button = screen.getByRole("button", { name: /akhiri sesi/i });
    await user.click(button);

    const cancelButton = screen.getByRole("button", { name: /batal/i });
    await user.click(cancelButton);

    expect(screen.queryByText(/apakah anda yakin/i)).not.toBeInTheDocument();
    expect(mockOnForceStop).not.toHaveBeenCalled();
  });

  it("calls onForceStop when confirmed", async () => {
    const user = userEvent.setup();
    const mockOnForceStop = vi.fn();
    render(<ForceStopButton onForceStop={mockOnForceStop} />);

    const button = screen.getByRole("button", { name: /akhiri sesi/i });
    await user.click(button);

    const confirmButton = screen.getByRole("button", { name: /ya, akhiri/i });
    await user.click(confirmButton);

    expect(mockOnForceStop).toHaveBeenCalledTimes(1);
  });

  it("closes modal after confirmation", async () => {
    const user = userEvent.setup();
    const mockOnForceStop = vi.fn();
    render(<ForceStopButton onForceStop={mockOnForceStop} />);

    const button = screen.getByRole("button", { name: /akhiri sesi/i });
    await user.click(button);

    const confirmButton = screen.getByRole("button", { name: /ya, akhiri/i });
    await user.click(confirmButton);

    expect(screen.queryByText(/apakah anda yakin/i)).not.toBeInTheDocument();
  });
});
