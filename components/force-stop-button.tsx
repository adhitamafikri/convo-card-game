"use client";

import { useState } from "react";
import { Button } from "./button";
import { Modal } from "./modal";

interface ForceStopButtonProps {
  onForceStop: () => void;
}

export function ForceStopButton({ onForceStop }: ForceStopButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(false);
    onForceStop();
  };

  return (
    <>
      <Button
        variant="outline"
        size="md"
        className="w-full border-error/50 text-error hover:bg-error/10 hover:border-error"
        onClick={() => setShowConfirmation(true)}
      >
        Akhiri Sesi
      </Button>

      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Konfirmasi Akhiri Sesi"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <p className="text-base-content">
            Apakah Anda yakin ingin mengakhiri sesi permainan? Semua progres akan hilang.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowConfirmation(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="bg-error hover:bg-error/90 border-none"
              onClick={handleConfirm}
            >
              Ya, Akhiri
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
