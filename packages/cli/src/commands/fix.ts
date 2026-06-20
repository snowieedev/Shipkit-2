import { Command } from 'commander';
import chalk from 'chalk';
import { AuthGuard } from '../lib/authGuard.js';
import { repairAuth } from '../generators/auth/repair.js';

export const fixCommand = new Command('fix')
  .description('Detect and repair issues in a ShipKit module')
  .argument('<module>', 'The module to fix (e.g., auth)')
  .action(async (moduleName: string) => {
    AuthGuard.requireFullyAuthenticated();

    if (moduleName.toLowerCase() === 'auth') {
      await repairAuth();
    } else {
      console.log(`\n${chalk.red('✗')} Unknown module: ${chalk.bold(moduleName)}`);
      console.log(`Currently supported modules to fix: ${chalk.cyan('auth')}\n`);
      process.exit(1);
    }
  });
