import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { api } from '../lib/api.js';
import { setAuth } from '../lib/storage.js';
import { APIKeyManager } from '../lib/apiKeyManager.js';

export const loginCommand = new Command('login')
  .description('Authenticate with ShipKit')
  .action(async () => {
    console.log(`\n● Welcome to ShipKit\n`);
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email\n›',
        validate: (input) => {
          if (!input || !input.includes('@')) return 'Please enter a valid email address';
          return true;
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password\n›',
        mask: '*',
        validate: (input) => {
          if (!input) return 'Password is required';
          return true;
        }
      }
    ]);

    console.log('');
    const spinner = ora('Authenticating...').start();

    try {
      const response = await api.login(answers.email, answers.password);
      
      if (response.success && response.session) {
        setAuth({
          token: response.session.access_token,
          user: response.user
        });

        spinner.stop();
        
        console.log(`${chalk.green('✓')} Authenticated successfully\n`);
        console.log(`Connected as:\n${chalk.cyan(response.user.email)}\n`);
        
        const apiKey = APIKeyManager.getApiKey();
        if (!apiKey) {
          console.log(`ℹ No API key connected.\n\nRun:\n  ${chalk.cyan('shipkit api')}\n\nto connect your ShipKit account.\n`);
        } else {
          console.log(`${chalk.dim('Account ready.')}\n`);
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      spinner.stop();
      
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      
      console.log(`${chalk.red('✗')} Authentication failed\n`);
      console.log(`${errorMessage}\n`);
      console.log(`${chalk.dim('Try again or reset your password from the dashboard.')}\n`);
      process.exit(1);
    }
  });
