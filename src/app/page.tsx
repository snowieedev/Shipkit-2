'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Menu, X, Box, Key, FolderGit2, Puzzle, TerminalSquare, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// GridPattern Component
interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}

function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}`}
              width={width - 1}
              height={height - 1}
              x={sx * width + 1}
              y={sy * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

// Navigation Component
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
            ShipKit<span className="text-primary">.</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Workflow
            </a>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workflow
            </a>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 0.8px, transparent 0.8px)',
            backgroundSize: '14px 14px',
            maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
          }}
        />
        <div
          className={cn(
            'absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/.1),transparent_50%)]',
            'blur-[30px]',
          )}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-accent/50 backdrop-blur-sm">
          <span className="text-xs font-semibold text-primary">ShipKit v1.0 is out!</span>
          <Link href="/docs" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            Read the docs
            <ArrowRight size={12} />
          </Link>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Manage your application
          </span>
          <br />
          <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">
            features from CLI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover, install, configure, and manage features through a powerful registry system. The ultimate developer tool platform for SaaS architectures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20" asChild>
            <Link href="/signup">
              Start Building Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
            <Link href="/docs">View Documentation</Link>
          </Button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-primary" />
            <span>Open Source CLI</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-primary" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Grid Section
const FeatureGridSection = () => {
  const features = [
    {
      icon: <Box className="h-6 w-6" />,
      title: "Registry System",
      description: "Discover and install pre-built application features directly from our extensive community registry."
    },
    {
      icon: <Key className="h-6 w-6" />,
      title: "API Keys",
      description: "Secure your project integration with fine-grained API key management and automatic rotation."
    },
    {
      icon: <FolderGit2 className="h-6 w-6" />,
      title: "Project Management",
      description: "Organize your micro-apps, teams, and feature flags seamlessly inside isolated projects."
    },
    {
      icon: <Puzzle className="h-6 w-6" />,
      title: "Provider Integrations",
      description: "Connect to AWS, Vercel, Stripe, and other core providers securely from the dashboard."
    },
    {
      icon: <TerminalSquare className="h-6 w-6" />,
      title: "CLI Experience",
      description: "A robust developer CLI to fetch, sync, and deploy features right from your terminal."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Installation",
      description: "Install fully configured features into your codebase with a single CLI command."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 relative border-y border-border/50 bg-accent/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Developer-First Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ShipKit handles the infrastructure wiring so you can focus on writing product code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-6 rounded-2xl border border-border/50 bg-background hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      title: "Create Project",
      description: "Initialize your project on the ShipKit dashboard and generate your secure API keys.",
      benefits: ["Isolated environments", "Secure credentials"]
    },
    {
      title: "Connect CLI",
      description: "Authenticate your local development environment using the ShipKit CLI.",
      benefits: ["shipkit login", "shipkit init"]
    },
    {
      title: "Install Features",
      description: "Browse the registry and instantly add features to your codebase.",
      benefits: ["shipkit add auth", "shipkit add billing"]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            The ShipKit Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From creation to deployment in three simple steps.
          </p>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-[16.6667%] top-1/2 h-px w-[66.6667%] -translate-y-1/2 bg-border hidden md:block" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold ring-8 ring-background z-10 text-lg">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="p-8 rounded-2xl border border-border/50 bg-card"
            >
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground mb-6">{step.description}</p>
              <ul className="space-y-3 mt-auto">
                {step.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <code className="bg-accent px-1.5 py-0.5 rounded text-xs">{benefit}</code>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const FooterSection = () => {
  const sections = [
    {
      title: "Platform",
      links: [
        { name: "Registry", href: "#" },
        { name: "CLI Integration", href: "#" },
        { name: "Project Management", href: "#" },
        { name: "API Keys", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Pricing", href: "/pricing" },
        { name: "Community", href: "#" },
        { name: "GitHub", href: "#" }
      ]
    }
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              ShipKit<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate developer platform for managing features and APIs in your application.
            </p>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShipKit Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navigation />
      <main>
        <HeroSection />
        <FeatureGridSection />
        <HowItWorksSection />
      </main>
      <FooterSection />
    </div>
  );
}
