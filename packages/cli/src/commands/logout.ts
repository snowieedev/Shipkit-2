import { Command } from 'commander';
import chalk from 'chalk';
import { clearAuth } from '../lib/storage.js';

export const logoutCommand = new Command('logout')
  .description('Remove local session')
  .action(() => {
    try {
      clearAuth();
      console.log(`\n${chalk.green('✓')} Logged out successfully\n\n${chalk.dim('Local credentials removed.')}\n`);
    } catch (error) {
      console.log(`\n${chalk.red('✗')} Failed to log out\n`);
      process.exit(1);
    }
  });
