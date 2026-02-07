import { Logo } from "./logo";

interface HeaderProps {
  onAboutClick?: () => void;
  onHowToPlayClick?: () => void;
}

export function Header({ onAboutClick, onHowToPlayClick }: HeaderProps) {
  return (
    <header className="h-[68px] w-full px-6 md:px-8 flex items-center justify-between bg-transparent">
      <Logo size="md" />
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
