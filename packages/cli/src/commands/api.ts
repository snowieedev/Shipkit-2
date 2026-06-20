import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { api } from '../lib/api.js';
import { AuthGuard } from '../lib/authGuard.js';
import { APIKeyManager } from '../lib/apiKeyManager.js';

export const apiCommand = new Command('api')
  .description('Connect a ShipKit API key to the local CLI')
  .action(async () => {
    const auth = AuthGuard.requireAuth();

    console.log(`\nShipKit API Connection\n`);

    const answers = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter API Key\n›',
        mask: '*',
        validate: (input) => {
          if (!input || !input.startsWith('sk_live_')) {
            return 'Please enter a valid live ShipKit API key (starts with sk_live_)';
          }
          return true;
        }
      }
    ]);

    console.log('');
    const spinner = ora('Verifying API key...').start();

    try {
      const response = await api.verifyApiKey(answers.apiKey);
      
      if (response.success) {
        APIKeyManager.setApiKey(answers.apiKey, auth.user.id);
        
        spinner.stop();
        
        console.log(`${chalk.green('✓')} API key verified\n`);
        console.log(`Connected to ShipKit.`);
        console.log(`Project access enabled.`);
        console.log(`Provider access enabled.`);
        console.log(`\n${chalk.dim('CLI ready.')}\n`);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      spinner.stop();
      
      console.log(`${chalk.red('✗')} Invalid API key\n`);
      console.log(`The supplied API key could not be verified.`);
      console.log(`${chalk.dim('Please check your dashboard and try again.')}\n`);
      process.exit(1);
    }
  });
