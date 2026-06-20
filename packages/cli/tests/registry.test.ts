import { describe, it, expect } from 'vitest';
import { getFeatures, getFeatureById } from '../src/registry/features/index.js';
import { getTemplates, getTemplateById } from '../src/registry/templates/index.js';

describe('Feature Registry', () => {
  it('should return all features', () => {
    const features = getFeatures();
    expect(features.length).toBeGreaterThan(0);
    expect(features[0]).toHaveProperty('id');
    expect(features[0]).toHaveProperty('name');
  });

  it('should return a specific feature by id', () => {
    const feature = getFeatureById('auth-supabase');
    expect(feature).toBeDefined();
    expect(feature?.name).toBe('Authentication');
  });

  it('should return undefined for non-existent feature', () => {
    const feature = getFeatureById('non-existent');
    expect(feature).toBeUndefined();
  });
});

describe('Template Registry', () => {
  it('should return all templates', () => {
    const templates = getTemplates();
    expect(templates.length).toBeGreaterThan(0);
    expect(templates[0]).toHaveProperty('id');
    expect(templates[0]).toHaveProperty('framework');
  });

  it('should return a specific template by id', () => {
    const template = getTemplateById('nextjs-saas');
    expect(template).toBeDefined();
    expect(template?.framework).toBe('Next.js');
  });

  it('should return undefined for non-existent template', () => {
    const template = getTemplateById('non-existent');
    expect(template).toBeUndefined();
  });
});
