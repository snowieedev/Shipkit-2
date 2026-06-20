import { Command } from 'commander';
import chalk from 'chalk';
import { AuthGuard } from '../lib/authGuard.js';
import { generateAuth } from '../generators/auth/index.js';

export const addCommand = new Command('add')
  .description('Add a pre-built module to your project')
  .argument('<module>', 'The module to add (e.g., auth)')
  .action(async (moduleName: string) => {
    AuthGuard.requireFullyAuthenticated();

    if (moduleName.toLowerCase() === 'auth') {
      await generateAuth();
    } else {
      console.log(`\n${chalk.red('✗')} Unknown module: ${chalk.bold(moduleName)}`);
      console.log(`Currently supported modules: ${chalk.cyan('auth')}\n`);
      process.exit(1);
    }
  });
