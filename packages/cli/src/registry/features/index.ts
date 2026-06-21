export interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'auth' | 'payments' | 'analytics' | 'email' | 'storage' | 'other';
  status: 'stable' | 'beta' | 'alpha';
}

export const featuresRegistry: Feature[] = [
  {
    id: 'payments-stripe',
    name: 'Payments',
    description: 'Stripe Payments integration',
    category: 'payments',
    status: 'stable'
  },
  {
    id: 'analytics-posthog',
    name: 'Analytics',
    description: 'PostHog Analytics integration',
    category: 'analytics',
    status: 'stable'
  },
  {
    id: 'email-resend',
    name: 'Email',
    description: 'Resend transactional email integration',
    category: 'email',
    status: 'stable'
  },
  {
    id: 'storage-s3',
    name: 'Storage',
    description: 'AWS S3 / Supabase Storage integration',
    category: 'storage',
    status: 'stable'
  }
];

export const getFeatures = () => featuresRegistry;
export const getFeatureById = (id: string) => featuresRegistry.find(f => f.id === id);
