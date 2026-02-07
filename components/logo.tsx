import { HTMLAttributes } from "react";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  size?: LogoSize;
}

const sizeClasses = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-base",
  },
  md: {
    container: "w-10 h-10",
    icon: "w-6 h-6",
    text: "text-xl",
  },
  lg: {
    container: "w-14 h-14",
    icon: "w-8 h-8",
    text: "text-2xl",
  },
  xl: {
    container: "w-20 h-20",
    icon: "w-12 h-12",
    text: "text-3xl",
  },
};

export function Logo({ size = "md", className = "", ...props }: LogoProps) {
  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`} {...props}>
      <div
        className={`${sizes.container} rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${sizes.icon} text-primary-content`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
      <h1 className={`font-bold text-primary ${sizes.text}`}>SambungRasa</h1>
    </div>
  );
}
