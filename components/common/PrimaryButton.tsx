import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function PrimaryButton({
  href,
  children,
  icon,
  iconPosition = "right",
  className,
  size = "md",
  fullWidth = false,
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5 rounded-lg",
    md: "px-6 py-3 text-sm gap-2 rounded-lg",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
  };

  const baseClasses = cn(
    // Base layout & typography
    "group relative inline-flex items-center justify-center font-semibold overflow-hidden",
    // Colors
    "bg-[#0b8b99] text-white",
    // Shadow
    "shadow-md shadow-[#0b8b99]/20",
    // Transitions
    "transition-all duration-300",
    // Hover: lift + deepen shadow + slightly lighten bg (only when not disabled)
    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0b8b99]/35 hover:bg-[#0a7f8c]",
    // Active
    "active:translate-y-0 active:scale-[0.98] active:shadow-md",
    // Cursor
    "cursor-pointer",
    // Disabled states
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0 disabled:scale-100",
    // In case aria-disabled or href styled as disabled
    props.disabled && "opacity-50 cursor-not-allowed pointer-events-none shadow-none translate-y-0 scale-100",
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {/* Shimmer sweep on hover (suppressed when disabled) */}
      {!props.disabled && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      {icon && iconPosition === "left" && <span className="relative shrink-0 flex items-center">{icon}</span>}
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
      {icon && iconPosition === "right" && <span className="relative shrink-0 flex items-center">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
