"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrimaryButton } from "@/components/common";
import { createContactSchema, ContactFormValues } from "./validators";
import { sendContactEmail } from "./contactAction";
import { Locale } from "@/types";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

export default function ContactFormSection({ locale }: { locale: Locale }) {
  const t = useTranslations("AboutPage.ContactForm");
  const [submitted, setSubmitted] = useState(false);
  const isAr = locale === "ar";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@muralmedical.com";
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE || "+966 11 000 0000";

  const contactSchema = createContactSchema((key) => t(key));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await sendContactEmail(data);
      if (response.success) {
        setSubmitted(true);
        toast.success(t("successToast"));
      } else {
        toast.error(response.error || t("errorToast"));
      }
    } catch (error) {
      toast.error(t("errorToast"));
    }
  };

  return (
    <section
      id="contact-us"
      className="py-20 sm:py-24 bg-white border-t border-slate-200 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Center Aligned */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] border border-[#0b8b99]/20">
              <MessageSquare className="w-3.5 h-3.5 text-[#0b8b99]" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl font-bold text-[#062b56] tracking-tight mt-3"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed max-w-2xl"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Content Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="bg-[#f0fafb]/60 border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Direct Contact Info Column */}
            <div className="lg:col-span-5 space-y-6 rtl:text-right ltr:text-left bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-[#062b56]">
                {t("contactInfoTitle")}
              </h3>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[#0b8b99]/10 border border-[#0b8b99]/20 text-[#0b8b99] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold">
                      {t("emailTitle")}
                    </h4>
                    <p className="text-sm font-semibold text-[#062b56] mt-0.5">
                      {contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[#062b56]/10 border border-[#062b56]/20 text-[#062b56] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold">
                      {t("phoneTitle")}
                    </h4>
                    <p className="text-sm font-semibold text-[#062b56] mt-0.5">
                      <span dir="ltr" className="inline-block">
                        {contactPhone}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-[#0b8b99]/10 border border-[#0b8b99]/20 text-[#0b8b99] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 font-semibold">
                      {t("addressTitle")}
                    </h4>
                    <p className="text-sm font-semibold text-[#062b56] mt-0.5">
                      Riyadh, Kingdom of Saudi Arabia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#062b56]">
                      {t("successToast")}
                    </h3>
                    <PrimaryButton
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        reset();
                      }}
                      className="mt-4"
                    >
                      Send another message
                    </PrimaryButton>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 rtl:text-right ltr:text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("nameLabel")} *
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/40 focus:border-[#0b8b99] bg-white transition-all duration-200"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("emailLabel")} *
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/40 focus:border-[#0b8b99] bg-white transition-all duration-200"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("organizationLabel")}
                        </label>
                        <input
                          type="text"
                          {...register("organization")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/40 focus:border-[#0b8b99] bg-white transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          {t("subjectLabel")}
                        </label>
                        <input
                          type="text"
                          {...register("subject")}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/40 focus:border-[#0b8b99] bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        {t("messageLabel")} *
                      </label>
                      <textarea
                        rows={4}
                        {...register("message")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/40 focus:border-[#0b8b99] bg-white transition-all duration-200"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <PrimaryButton
                        type="submit"
                        disabled={isSubmitting}
                        icon={
                          !isSubmitting ? (
                            <Send className={`w-4 h-4 ${isAr ? "rotate-270":""}`} />
                          ) : undefined
                        }
                        className="w-xl"
                      >
                        {isSubmitting ? t("submitting") : t("submitButton")}
                      </PrimaryButton>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
