import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  })],
  vite: {
    define: {
      'AUTH_ENGINE': 'null',
      'DATABASE_ADAPTER': 'null',
      'PROVIDERS': 'null',
      'ENV_CONFIG': 'null'
    }
  }
});
