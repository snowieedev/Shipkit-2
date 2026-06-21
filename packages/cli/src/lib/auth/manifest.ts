import fs from 'fs';
import path from 'path';

export interface AuthManifest {
  framework: string;
  database: string;
  engine: string;
  providers: string[];
  generatedAt: string;
  version: string;
}

export function generateManifest(
  targetDir: string,
  options: {
    framework: string;
    database: string;
    engine: string;
    providers: string[];
  }
): void {
  const manifest: AuthManifest = {
    ...options,
    generatedAt: new Date().toISOString(),
    version: '1.0.0', // Standardized to 1.0.0
  };

  fs.writeFileSync(
    path.join(targetDir, 'shipkit.manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}
