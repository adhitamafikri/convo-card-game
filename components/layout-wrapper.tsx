"use client";

import { ReactNode, useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Modal } from "./modal";
import { AboutModalContent } from "./about-modal";
import { HowToPlayModalContent } from "./how-to-play-modal";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [showAbout, setShowAbout] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <>
      <Header
        onAboutClick={() => setShowAbout(true)}
        onHowToPlayClick={() => setShowHowToPlay(true)}
      />
      <main className="flex-1 w-full">{children}</main>
      <Footer />

      {/* Global Modals */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="Tentang Obrolan"
        showCloseButton={true}
      >
        <AboutModalContent />
      </Modal>

      <Modal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        title="Cara Main"
        showCloseButton={true}
      >
        <HowToPlayModalContent />
      </Modal>
    </>
  );
}
