"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      position="bottom-right"
      closeButton
      richColors={false}
      icons={{
        success: (
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
        ),
        info: (
          <Info className="size-5 text-[#0b8b99] shrink-0 mt-0.5" />
        ),
        warning: (
          <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
        ),
        error: (
          <AlertCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />
        ),
        loading: (
          <Loader2 className="size-5 text-[#0b8b99] animate-spin shrink-0 mt-0.5" />
        ),
      }}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "group flex items-start gap-3 w-full p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all text-sm font-medium",
          title: "text-sm font-semibold text-slate-900 leading-snug",
          description: "text-xs text-slate-600 mt-1 leading-relaxed",
          actionButton:
            "bg-[#0b8b99] hover:bg-[#0a7f8c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors",
          cancelButton:
            "bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
          closeButton:
            "opacity-60 hover:opacity-100 transition-opacity !bg-transparent !border-none !text-slate-500 hover:!text-slate-800",
          success:
            "!bg-emerald-50/95 !border-emerald-200/80 !text-emerald-950 shadow-emerald-500/5",
          error:
            "!bg-rose-50/95 !border-rose-200/80 !text-rose-950 shadow-rose-500/5",
          warning:
            "!bg-amber-50/95 !border-amber-200/80 !text-amber-950 shadow-amber-500/5",
          info:
            "!bg-[#0b8b99]/10 !border-[#0b8b99]/25 !text-[#04172e] shadow-[#0b8b99]/5",
          default:
            "!bg-white/95 !border-slate-200/90 !text-slate-900 shadow-slate-900/5",
        },
      }}
      {...props}
    />
  );
};
