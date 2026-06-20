export interface Template {
  id: string;
  name: string;
  description: string;
  framework: string;
  features: string[];
}

export const templatesRegistry: Template[] = [
  {
    id: 'nextjs-saas',
    name: 'Next.js SaaS',
    description: 'A complete SaaS starter with authentication, billing, and dashboard',
    framework: 'Next.js',
    features: ['auth-supabase', 'payments-stripe', 'email-resend']
  },
  {
    id: 'nextjs-starter',
    name: 'Next.js Starter',
    description: 'A minimal Next.js starter with authentication',
    framework: 'Next.js',
    features: ['auth-supabase']
  },
  {
    id: 'api-backend',
    name: 'API Backend',
    description: 'A robust Node.js API backend template',
    framework: 'Node.js',
    features: ['auth-supabase', 'storage-s3']
  }
];

export const getTemplates = () => templatesRegistry;
export const getTemplateById = (id: string) => templatesRegistry.find(t => t.id === id);
