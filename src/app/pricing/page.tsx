import React from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for exploring ShipKit and personal projects.',
      price: '$0',
      period: 'forever',
      features: [
        '1 Project',
        'Unlimited local features',
        'Community registry access',
        'Basic CLI usage',
      ],
      notIncluded: [
        'Custom providers',
        'Team collaboration',
        'API Key rotation',
      ],
      cta: 'Get Started Free',
      href: '/signup',
      highlight: false,
    },
    {
      name: 'Pro',
      description: 'For independent developers shipping production apps.',
      price: '$29',
      period: 'per month',
      features: [
        'Up to 10 Projects',
        'Private feature registry',
        'Unlimited custom providers',
        'Advanced CLI workflows',
        'Priority support',
      ],
      notIncluded: [
        'Team collaboration',
        'SAML SSO',
      ],
      cta: 'Start Pro Trial',
      href: '/signup?plan=pro',
      highlight: true,
    },
    {
      name: 'Team',
      description: 'For growing teams needing collaboration and scale.',
      price: '$99',
      period: 'per month',
      features: [
        'Unlimited Projects',
        'Team collaboration',
        'API Key rotation policies',
        'Audit logs',
        'Custom SSO & SAML',
        'Dedicated success manager',
      ],
      notIncluded: [],
      cta: 'Contact Sales',
      href: '#contact',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Nav */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            ShipKit<span className="text-primary">.</span>
          </Link>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Whether you&apos;re hacking on a weekend project or scaling an enterprise platform, we have a plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.highlight
                  ? 'border-primary shadow-2xl shadow-primary/20 bg-background'
                  : 'border-border bg-card'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm min-h-[40px]">
                  {plan.description}
                </p>
              </div>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 opacity-50">
                    <X className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlight ? 'default' : 'outline'}
                className="w-full h-12"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Can I change plans later?</h4>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time from your dashboard settings. Prorated charges will be applied automatically.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">What happens when I hit my project limit?</h4>
              <p className="text-muted-foreground">You will not be able to create new projects until you upgrade your plan. Existing projects will continue to work perfectly.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Is the CLI open source?</h4>
              <p className="text-muted-foreground">Yes, the ShipKit CLI is completely open source and free to use. The pricing above applies to the hosted registry and dashboard features.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl bg-primary/5 border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to accelerate your workflow?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers using ShipKit to manage their application features.
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link href="/signup">
              Start Building Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
