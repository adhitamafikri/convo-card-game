"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

interface ModalProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

interface ModalTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { openModal } = useModal();
  return <div onClick={openModal}>{children}</div>;
}

interface ModalContentProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  showCloseButton?: boolean;
}

export function Modal({
  children,
  title,
  showCloseButton = true,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: ModalContentProps) {
  const modalContext = useContext(ModalContext);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Use controlled props if provided, otherwise use context
  const isOpen = controlledIsOpen ?? modalContext?.isOpen ?? false;
  const closeModal = controlledOnClose ?? modalContext?.closeModal ?? (() => {});

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    dialog.addEventListener("keydown", handleEscape);
    return () => dialog.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="modal-box bg-base-200 border-2 border-primary/30 shadow-warm-lg max-w-2xl animate-slide-up">
        {title && (
          <h3 className="font-bold text-lg text-secondary mb-4">
            {title}
          </h3>
        )}
        {children}
        {showCloseButton && (
          <div className="modal-action mt-4">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

interface ModalActionProps {
  children: ReactNode;
  className?: string;
}

export function ModalAction({ children, className = "" }: ModalActionProps) {
  return <div className={`modal-action ${className}`}>{children}</div>;
}
