import { type ReactNode, type HTMLAttributes } from "react";

type BadgeVariant = "primary" | "secondary" | "tech" | "status";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    "bg-matrix-500/20 text-matrix-300 border border-matrix-500/40",
  secondary:
    "bg-[#111] text-[#999] border border-[#333]",
  tech: "bg-matrix-900/50 text-matrix-400 border border-matrix-500/30",
  status: "bg-accent-500/20 text-accent-300 border border-accent-500/40",
};

export const Badge = ({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) => {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
