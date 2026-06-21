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
    description: 'A complete SaaS starter with billing and dashboard',
    framework: 'Next.js',
    features: ['payments-stripe', 'email-resend']
  },
  {
    id: 'nextjs-starter',
    name: 'Next.js Starter',
    description: 'A minimal Next.js starter',
    framework: 'Next.js',
    features: []
  },
  {
    id: 'api-backend',
    name: 'API Backend',
    description: 'A robust Node.js API backend template',
    framework: 'Node.js',
    features: ['storage-s3']
  }
];

export const getTemplates = () => templatesRegistry;
export const getTemplateById = (id: string) => templatesRegistry.find(t => t.id === id);
