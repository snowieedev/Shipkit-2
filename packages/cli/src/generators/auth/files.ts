import fs from 'fs';
import path from 'path';
import { getLoginPageTemplate, getSignupPageTemplate, getMiddlewareTemplate, getAuthServiceTemplate } from './templates.js';

export async function writeFiles(options: any) {
  const cwd = process.cwd();
  
  // Create directories
  const appDir = path.join(cwd, 'app');
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  const loginDir = path.join(appDir, 'login');
  if (!fs.existsSync(loginDir)) fs.mkdirSync(loginDir);
  
  const signupDir = path.join(appDir, 'signup');
  if (!fs.existsSync(signupDir)) fs.mkdirSync(signupDir);

  const libAuthDir = path.join(cwd, 'lib', 'auth');
  if (!fs.existsSync(libAuthDir)) fs.mkdirSync(libAuthDir, { recursive: true });

  // Write Pages
  fs.writeFileSync(path.join(loginDir, 'page.tsx'), getLoginPageTemplate());
  fs.writeFileSync(path.join(signupDir, 'page.tsx'), getSignupPageTemplate());

  // Write Backend Services
  fs.writeFileSync(path.join(libAuthDir, 'authService.ts'), getAuthServiceTemplate());

  // Write Middleware
  fs.writeFileSync(path.join(cwd, 'middleware.ts'), getMiddlewareTemplate());
}

export async function updateEnv(options: any) {
  const envPath = path.join(process.cwd(), '.env');
  const envLocalPath = path.join(process.cwd(), '.env.local');

  let envContent = '';
  if (fs.existsSync(envLocalPath)) {
    envContent = fs.readFileSync(envLocalPath, 'utf8');
  }

  // Helper to safely add var
  const addVar = (key: string, value: string) => {
    if (!envContent.includes(key + '=')) {
      envContent += `\n${key}=${value}`;
    }
  };

  addVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000');
  
  if (options.providers.includes('google') && options.google) {
    addVar('GOOGLE_CLIENT_ID', options.google.clientId);
    addVar('GOOGLE_CLIENT_SECRET', options.google.clientSecret);
  }

  if (options.providers.includes('github') && options.github) {
    addVar('GITHUB_CLIENT_ID', options.github.clientId);
    addVar('GITHUB_CLIENT_SECRET', options.github.clientSecret);
  }

  fs.writeFileSync(envLocalPath, envContent.trim() + '\n');
}

export async function generateTests(options: any) {
  const testsDir = path.join(process.cwd(), 'tests', 'auth');
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir, { recursive: true });
  }

  const testContent = `import { describe, it, expect } from 'vitest';

describe('Authentication Flow', () => {
  it('should allow user signup', () => {
    expect(true).toBe(true); // Placeholder for actual implementation
  });

  it('should allow user login', () => {
    expect(true).toBe(true);
  });
});
`;

  fs.writeFileSync(path.join(testsDir, 'auth.test.ts'), testContent);
}
