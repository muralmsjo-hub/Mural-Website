"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import Logo from "@/public/logo-hor.png";

export function Footer({ isAr }: { isAr: boolean }) {
  const t = useTranslations("Footer");

  // Import contact variables from env with fallback
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@muralmedical.com";
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE || "+966 11 000 0000";
  const contactLocation =
    process.env.NEXT_PUBLIC_CONTACT_LOCATION ||
    "Riyadh, Kingdom of Saudi Arabia";

  const navLinks = [
    { href: "/", label: t("LINKS_HOME") },
    { href: "/about", label: t("LINKS_ABOUT") },
    { href: "/categories", label: t("LINKS_CATEGORIES") },
    { href: "/products", label: t("LINKS_PRODUCTS") },
    { href: "/partners", label: t("LINKS_PARTNERS") },
    { href: "/careers", label: t("LINKS_CAREERS") },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedin className="w-4 h-4" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <FaTwitter className="w-4 h-4" />,
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebook className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <FaInstagram className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="relative bg-[#062b56] text-white pt-10 pb-5 overflow-hidden border-t border-slate-800">
      <div className="relative max-w-[94%] mx-auto px-4 sm:px-6 lg:px-4">
        {/* 3 Columns Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-8 border-b border-white/10">
          {/* Column 1: Footer Logo & Description & Badges */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block shrink-0">
              {/* Uses logo-footer.png directly on dark background with brightness invert for crisp white contrast */}
              <Image
                src={Logo.src}
                alt="Mural Medical Supply"
                width={300}
                height={90}
                className="h-32 w-auto object-contain brightness-0 invert transition-transform duration-300 hover:scale-105 "
                priority
              />
            </Link>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white tracking-wide relative inline-block">
              {t("LINKS_TITLE")}
              <span className="block w-10 h-0.5 bg-[#0b8b99] mt-1 rounded-full" />
            </h3>

            <ul className="space-y-2">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-[#0b8b99] transition-colors duration-150"
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-[#0b8b99] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${isAr ? "rotate-180" : ""} transition-transform duration-150 shrink-0`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details (No Cards/Borders) & Social Badges */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-white tracking-wide relative inline-block">
              {t("CONTACT_TITLE")}
              <span className="block w-10 h-0.5 bg-[#0b8b99] mt-1 rounded-full" />
            </h3>

            {/* Clean Contact Details List (Without Card Borders) */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0b8b99] shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-[#0b8b99] transition-colors duration-150 text-slate-200 truncate"
                >
                  {contactEmail}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0b8b99] shrink-0" />
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="hover:text-[#0b8b99] transition-colors duration-150 text-slate-200"
                >
                  <span dir="ltr" className="inline-block">
                    {contactPhone}
                  </span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#0b8b99] shrink-0" />
                <span className="text-slate-200">
                  {t("LOCATION_VALUE") || contactLocation}
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                {t("FOLLOW_US")}
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0b8b99] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-150"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-5 flex items-center justify-center text-xs text-slate-400">
          <p className="text-center">
            @Mural. All rights reserved. Powered by{" "}
            <a
              href="https://nuremberg-group.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-[#0b8b99] underline transition-colors font-medium"
            >
              Nuremberg Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
