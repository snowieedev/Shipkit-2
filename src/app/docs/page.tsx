import React from 'react';

export default function DocsPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 id="introduction" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Introduction to ShipKit
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Welcome to the ShipKit documentation. ShipKit is a comprehensive developer platform that lets you discover, install, configure, and manage application features through an intuitive registry and powerful CLI.
      </p>

      <hr className="my-8" />

      <h2 id="quick-start" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">
        Quick Start
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        To get started quickly, you need to create a project in your dashboard, grab your API key, and authenticate your CLI.
      </p>
      <pre className="p-4 rounded-lg bg-muted text-sm my-4 overflow-x-auto">
        <code>
{`$ npm install -g shipkit-cli
$ shipkit login
$ shipkit init`}
        </code>
      </pre>

      <h2 id="installation" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Installation
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        ShipKit provides tools for both your server infrastructure and local development environment. Install the global CLI to begin managing your features.
      </p>

      <h2 id="authentication" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Authentication
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        All interactions with the ShipKit API and registry are authenticated. Learn how to manage your session and secure your endpoints.
      </p>

      <h2 id="api-keys" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        API Keys
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Create scoped API keys from your dashboard to grant your CI/CD pipelines or servers access to the registry. Never expose these keys in client-side code.
      </p>

      <h2 id="projects" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Creating Projects
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Projects act as isolated environments. You can have multiple projects for staging, production, or completely different applications.
      </p>

      <h2 id="providers" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Providers
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Configure external integrations like AWS, Stripe, or Vercel natively through ShipKit so your installed features can automatically inherit necessary secrets.
      </p>

      <h2 id="registry" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Registry
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Browse hundreds of pre-built, production-ready modules built by the community. You can also publish your own private modules on the Pro and Team plans.
      </p>

      <h2 id="feature-installation" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Feature Installation
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Once you find a feature in the registry, installing it is as simple as running a single command. ShipKit will handle scaffolding, dependency injection, and configuration automatically.
      </p>

      <h2 id="cli" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        CLI Reference
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        A complete list of all available commands, options, and flags in the ShipKit CLI.
      </p>

      <h2 id="api-reference" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        API Reference
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Interact programmatically with your projects, keys, and providers using our REST API.
      </p>

      <h2 id="troubleshooting" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        Troubleshooting
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Common issues, debugging steps, and solutions.
      </p>

      <h2 id="faq" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        FAQ
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Frequently asked questions about ShipKit, billing, and technical limitations.
      </p>
    </div>
  );
}
