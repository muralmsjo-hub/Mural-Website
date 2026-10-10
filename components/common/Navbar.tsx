"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/categories", labelKey: "categories" },
  { href: "/products", labelKey: "products" },
  { href: "/partners", labelKey: "partners" },
  { href: "/careers", labelKey: "careers" },
];

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/logo-hor.png"
            alt="Mural Medical Supply"
            width={180}
            height={50}
            className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150",
                  active
                    ? "text-[#0b8b99] bg-[#0b8b99]/10"
                    : "text-slate-700 hover:text-[#0b8b99] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60",
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Language Switcher & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Sheet / Drawer */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle navigation menu"
                className="text-slate-700 dark:text-slate-200 hover:text-[#0b8b99] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={locale === "ar" ? "left" : "right"}
              className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6 pt-2">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/logo-hor.png"
                    alt="Mural Medical Supply"
                    width={160}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                </Link>

                <nav className="flex flex-col gap-2 mt-4">
                  {NAV_LINKS.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between",
                          active
                            ? "text-[#0b8b99] bg-[#0b8b99]/10"
                            : "text-slate-700 hover:text-[#0b8b99] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800",
                        )}
                      >
                        <span>{t(link.labelKey)}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t("language")}
                </span>
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
