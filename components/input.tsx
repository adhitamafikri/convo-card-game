import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="form-control w-full">
        {label && (
          <label className="label">
            <span className="label-text font-medium text-base-content dark:text-orange-200">
              {label}
            </span>
          </label>
        )}
        <input
          ref={ref}
          className={`input input-bordered w-full bg-white dark:bg-base-300 border-orange-200 dark:border-orange-800 focus:border-orange-500 focus:ring-orange-500 ${
            error ? "input-error border-rose-500 focus:border-rose-500 focus:ring-rose-500" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text text-rose-500 text-sm">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
