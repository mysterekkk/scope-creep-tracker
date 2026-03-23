import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import '@/app/globals.css';

import enMessages from '@/messages/en.json';
import plMessages from '@/messages/pl.json';
import esMessages from '@/messages/es.json';
import deMessages from '@/messages/de.json';
import frMessages from '@/messages/fr.json';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

const allMessages: Record<string, typeof enMessages> = {
  en: enMessages,
  pl: plMessages,
  es: esMessages,
  de: deMessages,
  fr: frMessages,
};

const locales = ['en', 'pl', 'es', 'de', 'fr'] as const;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = allMessages[locale] ?? allMessages.en;
  const meta = (messages as Record<string, Record<string, string>>).metadata ?? {};

  return {
    title: meta.title ?? 'Scope Creep Tracker',
    description: meta.description ?? 'Track scope creep in your projects',
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  const messages = allMessages[locale] ?? allMessages.en;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="min-h-screen">{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
