import fs from 'fs';
import { 
  getTemplatePath, 
  getEnginePath, 
  getDatabasePath, 
  getProviderPath 
} from '../../registry/auth.js';

export interface ResolvedModules {
  templatePath: string;
  databasePath: string;
  enginePath: string;
  providerPaths: { name: string; path: string }[];
}

export function resolveModules(
  framework: string,
  database: string,
  engine: string,
  providers: string[]
): ResolvedModules {
  const templatePath = getTemplatePath(framework);
  const databasePath = getDatabasePath(database);
  const enginePath = getEnginePath(engine);
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template module '${framework}' not found.`);
  }

  if (!fs.existsSync(databasePath)) {
    throw new Error(`Database module '${database}' not found.`);
  }

  if (!fs.existsSync(enginePath)) {
    throw new Error(`Auth Engine module '${engine}' not found.`);
  }

  const providerPaths = providers.map((provider) => {
    const pPath = getProviderPath(provider);
    if (!fs.existsSync(pPath)) {
      throw new Error(`Provider module '${provider}' not found.`);
    }
    return { name: provider, path: pPath };
  });

  return {
    templatePath,
    databasePath,
    enginePath,
    providerPaths,
  };
}
