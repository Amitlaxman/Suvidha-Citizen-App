
"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Lightbulb, TrendingUp, Megaphone, CheckCircle, BarChart } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";


export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Logo />
         <Button asChild variant="secondary">
          <Link href="/login">{t('landing.loginButton')}</Link>
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex items-center justify-center py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 leading-tight">
                  {t('landing.title')}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {t('landing.subtitle')}
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/home">{t('landing.getStartedButton')}</Link>
                </Button>
              </div>
              <div>
                <Image
                  src="https://i.postimg.cc/3xBPPftv/image.png"
                  alt="Community illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="community people"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How Suvidha Works Section */}
        <section className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto max-w-5xl px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('landing.howItWorks.title')}</h2>
                    <p className="text-lg text-muted-foreground mt-2">{t('landing.howItWorks.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <Card>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <Megaphone className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">{t('landing.howItWorks.step1.title')}</h3>
                            <p className="text-muted-foreground">{t('landing.howItWorks.step1.description')}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                             <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <Users className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">{t('landing.howItWorks.step2.title')}</h3>
                            <p className="text-muted-foreground">{t('landing.howItWorks.step2.description')}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                             <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-2">{t('landing.howItWorks.step3.title')}</h3>
                            <p className="text-muted-foreground">{t('landing.howItWorks.step3.description')}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Community Impact Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('landing.communityImpact.title')}</h2>
                    <p className="text-lg text-muted-foreground mt-2">{t('landing.communityImpact.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                   <div className="p-6">
                        <Lightbulb className="h-10 w-10 text-accent mx-auto mb-4" />
                        <p className="text-4xl font-bold">1,234+</p>
                        <p className="text-muted-foreground">{t('landing.communityImpact.stat1')}</p>
                    </div>
                    <div className="p-6">
                        <BarChart className="h-10 w-10 text-accent mx-auto mb-4" />
                        <p className="text-4xl font-bold">5,000+</p>
                        <p className="text-muted-foreground">{t('landing.communityImpact.stat2')}</p>
                    </div>
                    <div className="p-6">
                        <TrendingUp className="h-10 w-10 text-accent mx-auto mb-4" />
                        <p className="text-4xl font-bold">92%</p>
                        <p className="text-muted-foreground">{t('landing.communityImpact.stat3')}</p>
                    </div>
                </div>
                 <div className="mt-12 text-center border-t pt-8">
                    <blockquote className="text-xl italic text-foreground">
                        &quot;{t('landing.communityImpact.testimonial.quote')}&quot;
                    </blockquote>
                    <p className="mt-4 text-muted-foreground">- {t('landing.communityImpact.testimonial.author')}</p>
                </div>
            </div>
        </section>

      </main>
       <footer className="bg-muted/50 py-6">
        <div className="container mx-auto max-w-5xl px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {t('appName')}. {t('landing.footer.rightsReserved')}
        </div>
      </footer>
    </div>
  );
}
