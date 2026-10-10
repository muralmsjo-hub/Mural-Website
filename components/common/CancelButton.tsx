import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function CancelButton({
  href,
  children = "Cancel",
  icon,
  iconPosition = "left",
  className,
  size = "md",
  fullWidth = false,
  ...props
}: CancelButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5 rounded-lg",
    md: "px-6 py-3 text-sm gap-2 rounded-lg",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-xl",
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 shadow-xs",
    "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0 flex items-center">{icon}</span>}
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0 flex items-center">{icon}</span>}
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
    <button type="button" className={baseClasses} {...props}>
      {content}
    </button>
  );
}
