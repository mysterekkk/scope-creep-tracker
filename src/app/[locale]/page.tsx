import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  Search,
  Clock,
  FileText,
  MessageSquare,
  DollarSign,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const featureIcons = [Search, Clock, FileText, MessageSquare, DollarSign, Shield];

const stepNumbers = ['01', '02', '03', '04'];

export default function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('landing');

  const features = [
    { icon: Search, titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: Clock, titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: FileText, titleKey: 'feature3Title', descKey: 'feature3Desc' },
    { icon: MessageSquare, titleKey: 'feature4Title', descKey: 'feature4Desc' },
    { icon: DollarSign, titleKey: 'feature5Title', descKey: 'feature5Desc' },
    { icon: Shield, titleKey: 'feature6Title', descKey: 'feature6Desc' },
  ];

  const steps = [
    { number: '01', key: 'step1' },
    { number: '02', key: 'step2' },
    { number: '03', key: 'step3' },
    { number: '04', key: 'step4' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/app`}>
                {t('heroButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            {t('featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.titleKey}
                  className="flex flex-col items-center text-center p-6 rounded-lg border bg-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(feature.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            {t('howItWorksTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.key} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t(`${step.key}Title`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`${step.key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t text-center text-sm text-muted-foreground">
        <p>{t('footerAuthor')}</p>
        <p className="mt-1">
          <a
            href="https://github.com/mysterekkk/scope-creep-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            {t('footerOpenSource')}
          </a>
          {' · '}
          MIT License
        </p>
      </footer>
    </div>
  );
}
