import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { api } from '../lib/api.js';
import { AuthGuard } from '../lib/authGuard.js';
import { APIKeyManager } from '../lib/apiKeyManager.js';

export const whoamiCommand = new Command('whoami')
  .description('Show currently authenticated ShipKit user')
  .action(async () => {
    // Require user to be logged in first
    AuthGuard.requireAuth();

    console.log('');
    const spinner = ora('Fetching profile...').start();

    try {
      const response = await api.whoami();
      
      if (response.success && response.user) {
        spinner.stop();
        
        const apiKey = APIKeyManager.getApiKey();
        const apiConnected = apiKey ? 'Yes' : 'No';

        console.log(`${chalk.bold(response.user.full_name)}\n`);
        console.log(`${chalk.cyan(response.user.email)}\n`);
        console.log(`User ID\n${chalk.dim(response.user.id)}\n`);
        console.log(`Plan\n${chalk.dim(response.user.plan || 'Pro')}\n`);
        console.log(`API Connected\n${apiKey ? chalk.green(apiConnected) : chalk.yellow(apiConnected)}\n`);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      spinner.stop();
      
      console.log(`${chalk.red('✗')} Failed to fetch profile\n`);
      console.log(`${error.message || 'Unknown error occurred'}\n`);
      process.exit(1);
    }
  });
