"use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className="flex items-center gap-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#0b8b99] hover:border-[#0b8b99]/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors cursor-pointer"
          aria-label={t("language")}
        >
          <Globe className="h-4 w-4 text-[#0b8b99]" />
          <span className="font-medium text-xs sm:text-sm">
            {locale === "ar" ? "العربية" : "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
      >
        <DropdownMenuItem
          onClick={() => handleLocaleChange("en")}
          className="flex items-center justify-between cursor-pointer text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <span>English</span>
          {locale === "en" && <Check className="h-4 w-4 text-[#0b8b99]" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLocaleChange("ar")}
          className="flex items-center justify-between cursor-pointer text-xs sm:text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <span>العربية</span>
          {locale === "ar" && <Check className="h-4 w-4 text-[#0b8b99]" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
