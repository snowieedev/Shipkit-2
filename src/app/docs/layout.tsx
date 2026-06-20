import React from 'react';
import Link from 'next/link';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const sections = [
    {
      title: 'Getting Started',
      links: [
        { name: 'Introduction', href: '#introduction' },
        { name: 'Quick Start', href: '#quick-start' },
        { name: 'Installation', href: '#installation' },
      ],
    },
    {
      title: 'Core Concepts',
      links: [
        { name: 'Authentication', href: '#authentication' },
        { name: 'API Keys', href: '#api-keys' },
        { name: 'Creating Projects', href: '#projects' },
      ],
    },
    {
      title: 'Platform Features',
      links: [
        { name: 'Providers', href: '#providers' },
        { name: 'Registry', href: '#registry' },
        { name: 'Feature Installation', href: '#feature-installation' },
      ],
    },
    {
      title: 'Developer Tools',
      links: [
        { name: 'CLI Reference', href: '#cli' },
        { name: 'API Reference', href: '#api-reference' },
        { name: 'Troubleshooting', href: '#troubleshooting' },
        { name: 'FAQ', href: '#faq' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground mr-6">
            ShipKit<span className="text-primary">.</span>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <input 
                type="search" 
                placeholder="Search documentation..." 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px]"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-screen-2xl px-6 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8 overflow-y-auto">
            <div className="w-full">
              {sections.map((section, index) => (
                <div key={index} className="pb-4">
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    {section.title}
                  </h4>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {section.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={`/docs${link.href}`}
                        className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              {/* Optional right sidebar for "On this page" */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
