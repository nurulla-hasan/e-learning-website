import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type TProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LngLayout({ children, params }: TProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }
  const messages = (
    await import(`../../../messages/${locale}.json`)
  ).default;
  return (
    <div lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}