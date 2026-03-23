'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Shield } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <Shield className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Scope Creep Tracker</span>
            <span className="sm:hidden">SCT</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href={`/${locale}/app`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
