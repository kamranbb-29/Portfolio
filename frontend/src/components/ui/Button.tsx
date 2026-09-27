import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-matrix-500 hover:bg-matrix-400 text-[#0a0a0a] font-bold shadow-glow hover:shadow-glow-lg transition-all duration-200",
  secondary:
    "bg-transparent border border-matrix-500 text-matrix-400 hover:bg-matrix-500/10 hover:text-matrix-300 transition-all duration-200",
  danger:
    "bg-red-500 hover:bg-red-400 text-[#0a0a0a] font-bold shadow-[0_0_5px_theme(colors.red.400)] hover:shadow-[0_0_10px_theme(colors.red.300)] transition-all duration-200",
  ghost:
    "bg-transparent text-[#e0e0e0] hover:bg-[#1a1a1a] transition-all duration-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded font-medium focus:outline-none focus:ring-2 focus:ring-matrix-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
