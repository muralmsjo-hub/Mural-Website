import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { Navbar, Footer } from "@/components/common";
import { generateSiteMetadata } from "@/lib/constants/metadata";
import { Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateSiteMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <div dir={dir} className="flex-1 flex flex-col w-full min-h-screen">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dir='${dir}';document.documentElement.lang='${locale}';`,
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        {children}
        <Footer isAr={isArabic} />
        <Toaster dir={dir} />
      </NextIntlClientProvider>
    </div>
  );
}
