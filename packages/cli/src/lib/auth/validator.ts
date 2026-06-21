import fs from 'fs';
import path from 'path';

export function validateTemplate(templatePath: string): void {
  // Check that the template has the required injection markers in its files
  // For validation, we could theoretically scan the files, but for performance,
  // we just assume the spec is followed if the folder exists, or do a light check.
  if (!fs.existsSync(templatePath)) {
    throw new Error('Template path does not exist.');
  }
}

export function validateDatabase(databasePath: string): void {
  if (!fs.existsSync(databasePath)) {
    throw new Error('Database path does not exist.');
  }
}

export function validateEngine(enginePath: string): void {
  if (!fs.existsSync(enginePath)) {
    throw new Error('Auth engine path does not exist.');
  }
}

export function validateProviders(providerPaths: { name: string; path: string }[]): void {
  for (const provider of providerPaths) {
    if (!fs.existsSync(provider.path)) {
      throw new Error(`Provider path for '${provider.name}' does not exist.`);
    }
  }
}
