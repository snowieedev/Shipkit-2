import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves the AUTH directory from the compiled file in dist/registry/auth.js
export const AUTH_DIR = path.resolve(__dirname, '../../AUTH');

export interface AuthRegistry {
  templates: string[];
  engines: string[];
  databases: string[];
  providers: string[];
}

function getDirectories(source: string): string[] {
  if (!fs.existsSync(source)) {
    return [];
  }
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function getAuthRegistry(): AuthRegistry {
  return {
    templates: getDirectories(path.join(AUTH_DIR, 'Auth-Templates')),
    engines: getDirectories(path.join(AUTH_DIR, 'Auth-Engines')),
    databases: getDirectories(path.join(AUTH_DIR, 'Database')),
    providers: getDirectories(path.join(AUTH_DIR, 'Providers')),
  };
}

export function getTemplatePath(templateName: string): string {
  return path.join(AUTH_DIR, 'Auth-Templates', templateName);
}

export function getEnginePath(engineName: string): string {
  return path.join(AUTH_DIR, 'Auth-Engines', engineName);
}

export function getDatabasePath(databaseName: string): string {
  return path.join(AUTH_DIR, 'Database', databaseName);
}

export function getProviderPath(providerName: string): string {
  return path.join(AUTH_DIR, 'Providers', providerName);
}
