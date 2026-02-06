interface HeaderProps {
  onAboutClick?: () => void;
  onHowToPlayClick?: () => void;
}

export function Header({ onAboutClick, onHowToPlayClick }: HeaderProps) {
  return (
    <header className="h-[68px] w-full px-6 md:px-8 flex items-center justify-between bg-primary/0 backdrop-blur-none border-b-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h1 className="text-xl md:text-2xl font-accent font-semibold text-secondary italic">
        Kartu Obrolan
      </h1>
      {(onAboutClick || onHowToPlayClick) && (
        <nav className="flex gap-8">
          {onAboutClick && (
            <button
              onClick={onAboutClick}
              className="text-base-content hover:text-base-content/70 transition-colors text-sm md:text-base font-semibold uppercase tracking-wide"
            >
              About
            </button>
          )}
          {onHowToPlayClick && (
            <button
              onClick={onHowToPlayClick}
              className="text-base-content hover:text-base-content/70 transition-colors text-sm md:text-base font-semibold uppercase tracking-wide"
            >
              Cara Main
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
