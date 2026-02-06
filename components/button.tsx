import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "lg" | "md" | "sm" | "xs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, children, className = "", disabled, ...props }, ref) => {
    const variantClasses = {
      primary: "btn-primary bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 text-white",
      secondary: "btn-secondary bg-rose-500 border-rose-500 hover:bg-rose-600 hover:border-rose-600 text-white",
      outline: "btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
      ghost: "btn-ghost text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20",
    };

    const sizeClasses = {
      lg: "btn-lg",
      md: "",
      sm: "btn-sm",
      xs: "btn-xs",
    };

    return (
      <button
        ref={ref}
        className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
