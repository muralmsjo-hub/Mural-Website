import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "ghost" | "inverse";
  fullWidth?: boolean;
}

export function SecondaryButton({
  href,
  children,
  icon,
  iconPosition = "right",
  className,
  size = "md",
  variant = "outline",
  fullWidth = false,
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5 rounded-lg",
    md: "px-6 py-3 text-sm gap-2 rounded-lg",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
  };

  const variantClasses = {
    outline: cn(
      "bg-white text-[#062b56] border border-slate-200 shadow-xs",
      "hover:border-[#0b8b99]/60 hover:shadow-md hover:shadow-[#0b8b99]/10 hover:text-[#0b8b99]",
    ),
    ghost: "bg-slate-100 hover:bg-slate-200 text-[#062b56] hover:text-[#0b8b99]",
    inverse: cn(
      "bg-white/10 text-white border border-white/20 backdrop-blur-sm",
      "hover:bg-white/20 hover:border-white/35 hover:shadow-md hover:shadow-white/10",
    ),
  };

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center font-semibold overflow-hidden",
    "transition-all duration-300",
    "hover:-translate-y-0.5",
    "active:translate-y-0 active:scale-[0.98]",
    "cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {/* Subtle shimmer on outline variant */}
      {variant === "outline" && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-[#0b8b99]/8 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      {icon && iconPosition === "left" && <span className="relative shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {icon && iconPosition === "right" && <span className="relative shrink-0">{icon}</span>}
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
