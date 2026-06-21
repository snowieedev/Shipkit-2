import fs from 'fs';
import path from 'path';
import { ResolvedModules } from './resolver.js';
import { generateManifest } from './manifest.js';

function copyRecursiveSync(src: string, dest: string, exclude: string[] = []) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats && stats.isDirectory();
  
  if (exclude.includes(path.basename(src))) return;

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), exclude);
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'dist') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function processTemplatePlaceholders(targetDir: string, modules: ResolvedModules) {
  const files = getAllFiles(targetDir);

  const engineName = path.basename(modules.enginePath);
  const dbName = path.basename(modules.databasePath);
  const providerNames = modules.providerPaths.map(p => p.name).join(', ');

  files.forEach((file) => {
    if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.md')) {
      let content = fs.readFileSync(file, 'utf-8');
      let modified = false;

      // Replace Placeholders
      if (content.includes('{{AUTH_ENGINE}}')) {
        content = content.replace(/\{\{AUTH_ENGINE\}\}/g, engineName);
        modified = true;
      }
      if (content.includes('{{DATABASE_ADAPTER}}')) {
        content = content.replace(/\{\{DATABASE_ADAPTER\}\}/g, dbName);
        modified = true;
      }
      if (content.includes('{{PROVIDERS}}')) {
        content = content.replace(/\{\{PROVIDERS\}\}/g, providerNames);
        modified = true;
      }

      // Handle simple injection markers by injecting imports/exports if needed
      if (content.includes('DATABASE_ADAPTER_INJECTION')) {
        content = content.replace(/\/\/ DATABASE_ADAPTER_INJECTION/g, `export * from './database-adapter/adapter';`);
        modified = true;
      }
      if (content.includes('AUTH_ENGINE_INJECTION') && !content.includes('AUTH_ENGINE_INJECTION:')) {
        content = content.replace(/\/\/ AUTH_ENGINE_INJECTION/g, `export * from '../lib/auth-engine/exports';`);
        modified = true;
      }
      if (content.includes('PROVIDER_REGISTRATION_INJECTION')) {
        let imports = modules.providerPaths.map(p => `import { createProvider as create${p.name}Provider } from './providers-impl/${p.name}/provider';`).join('\n');
        content = content.replace(/\/\/ PROVIDER_REGISTRATION_INJECTION/g, imports);
        modified = true;
      }

      // Very specific replace for NextJS/React mocked provider array
      if (content.includes('// Providers injected by ShipKit')) {
        let injectedProviders = modules.providerPaths.map(p => `  create${p.name}Provider(),`).join('\n');
        content = content.replace(/\/\/ Providers injected by ShipKit/g, injectedProviders);
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
      }
    }
  });
}

function mergeDependencies(targetDir: string, modules: ResolvedModules) {
  const targetPackageJsonPath = path.join(targetDir, 'package.json');
  let targetPackageJson = { dependencies: {}, devDependencies: {} };

  if (fs.existsSync(targetPackageJsonPath)) {
    targetPackageJson = JSON.parse(fs.readFileSync(targetPackageJsonPath, 'utf-8'));
  }

  const allModulePaths = [modules.templatePath, modules.databasePath, modules.enginePath, ...modules.providerPaths.map(p => p.path)];

  allModulePaths.forEach((modPath) => {
    const pkgPath = path.join(modPath, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.dependencies) {
        targetPackageJson.dependencies = { ...targetPackageJson.dependencies, ...pkg.dependencies };
      }
      if (pkg.devDependencies) {
        targetPackageJson.devDependencies = { ...targetPackageJson.devDependencies, ...pkg.devDependencies };
      }
    }
  });

  fs.writeFileSync(targetPackageJsonPath, JSON.stringify(targetPackageJson, null, 2), 'utf-8');
}

function mergeEnvVariables(targetDir: string, modules: ResolvedModules) {
  const targetEnvPath = path.join(targetDir, '.env.example');
  const envVars = new Set<string>();

  const allModulePaths = [modules.templatePath, modules.databasePath, modules.enginePath, ...modules.providerPaths.map(p => p.path)];

  allModulePaths.forEach((modPath) => {
    const envPath = path.join(modPath, '.env.example');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      content.split('\n').forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
          envVars.add(line.trim());
        }
      });
    }
  });

  const sortedEnvVars = Array.from(envVars).sort().join('\n');
  fs.writeFileSync(targetEnvPath, sortedEnvVars, 'utf-8');
}

export async function authAssembler(
  targetDir: string,
  modules: ResolvedModules
): Promise<void> {
  const excludeFromCopy = ['node_modules', 'dist', '.next'];

  // STEP 1: Load & Copy Template
  copyRecursiveSync(modules.templatePath, targetDir, excludeFromCopy);

  // STEP 2 & 3: Load & Inject Database Adapter
  const dbTarget = path.join(targetDir, 'src/lib/database-adapter');
  copyRecursiveSync(path.join(modules.databasePath, 'Database'), dbTarget, excludeFromCopy);

  // STEP 4 & 5: Load & Inject Auth Engine
  const engineTarget = path.join(targetDir, 'src/lib/auth-engine');
  copyRecursiveSync(path.join(modules.enginePath, 'AuthEngine'), engineTarget, excludeFromCopy);

  // STEP 6 & 7: Load & Register Providers
  const providersTarget = path.join(targetDir, 'src/auth/providers-impl');
  modules.providerPaths.forEach((provider) => {
    const providerDir = path.join(providersTarget, provider.name);
    copyRecursiveSync(path.join(provider.path, 'Provider'), providerDir, excludeFromCopy);
  });

  // Perform Injection Replacements
  processTemplatePlaceholders(targetDir, modules);

  // STEP 8: Merge Environment Variables
  mergeEnvVariables(targetDir, modules);

  // STEP 9: Merge Dependencies
  mergeDependencies(targetDir, modules);

  // STEP 10: Generate Output Manifest
  generateManifest(targetDir, {
    framework: path.basename(modules.templatePath),
    database: path.basename(modules.databasePath),
    engine: path.basename(modules.enginePath),
    providers: modules.providerPaths.map(p => p.name)
  });
}
