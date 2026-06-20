import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { AuthGuard } from '../../lib/authGuard.js';
import { api } from '../../lib/api.js';
import { writeFiles, updateEnv, generateTests } from './files.js';
import { provisionDatabase } from './database.js';

export async function generateAuth() {
  console.log(chalk.bold.cyan('\nShipKit Authentication Module (V1)\n'));

  // 1. Preflight Verification
  const { auth, apiKeyData } = AuthGuard.requireFullyAuthenticated();

  // Verify project exists
  const configPath = path.join(process.cwd(), 'shipkit.config.json');
  if (!fs.existsSync(configPath)) {
    console.log(`\n${chalk.red('✗')} No active project found.\n\nRun:\n  ${chalk.cyan('shipkit init')}\n`);
    process.exit(1);
  }

  // 2. Authentication Wizard
  const { authType } = await inquirer.prompt([
    {
      type: 'select',
      name: 'authType',
      message: 'Select Authentication Type:',
      choices: [
        'Email + Password',
        'Google',
        'GitHub',
        'Microsoft',
        'Multiple Providers'
      ]
    }
  ]);

  const providers = [];
  if (authType === 'Multiple Providers') {
    const multi = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'providers',
        message: 'Select Providers:',
        choices: ['Email + Password', 'Google', 'GitHub', 'Microsoft'],
        validate: (input) => input.length > 0 ? true : 'Please select at least one provider'
      }
    ]);
    providers.push(...multi.providers);
  } else {
    providers.push(authType);
  }

  const { dbProvider } = await inquirer.prompt([
    {
      type: 'select',
      name: 'dbProvider',
      message: 'Database Provider:',
      choices: ['Supabase', 'PostgreSQL']
    }
  ]);

  // Provider specific questions
  const options: any = { dbProvider, providers: [] };

  if (providers.includes('Email + Password')) {
    const emailOpts = await inquirer.prompt([
      { type: 'confirm', name: 'emailVerification', message: 'Enable Email Verification?', default: true },
      { type: 'confirm', name: 'forgotPassword', message: 'Enable Forgot Password?', default: true },
      { type: 'select', name: 'sessionDuration', message: 'Session Duration:', choices: ['7 days', '30 days', 'custom'] }
    ]);
    options.email = emailOpts;
    options.providers.push('email');
  }

  if (providers.includes('Google')) {
    const googleOpts = await inquirer.prompt([
      { type: 'input', name: 'clientId', message: 'Google Client ID:' },
      { type: 'password', name: 'clientSecret', message: 'Google Client Secret:', mask: '*' }
    ]);
    options.google = googleOpts;
    options.providers.push('google');
  }

  if (providers.includes('GitHub')) {
    const githubOpts = await inquirer.prompt([
      { type: 'input', name: 'clientId', message: 'GitHub Client ID:' },
      { type: 'password', name: 'clientSecret', message: 'GitHub Client Secret:', mask: '*' }
    ]);
    options.github = githubOpts;
    options.providers.push('github');
  }

  if (providers.includes('Microsoft')) {
    const microsoftOpts = await inquirer.prompt([
      { type: 'input', name: 'clientId', message: 'Microsoft Client ID:' },
      { type: 'password', name: 'clientSecret', message: 'Microsoft Client Secret:', mask: '*' },
      { type: 'input', name: 'tenantId', message: 'Microsoft Tenant ID:' }
    ]);
    options.microsoft = microsoftOpts;
    options.providers.push('microsoft');
  }

  console.log('');
  const spinner = ora('Generating architecture...').start();

  try {
    // 3. Architecture Generation & 4. Provider Infrastructure
    await writeFiles(options);

    spinner.text = 'Provisioning database...';
    // 5. Database Provisioning
    await provisionDatabase(options);

    spinner.text = 'Updating environment...';
    // 6. Environment Management
    await updateEnv(options);

    spinner.text = 'Generating tests...';
    // 8. Auto Testing (generation part)
    await generateTests(options);

    spinner.stop();

    // Completion Report
    console.log(chalk.bold.green('\n✓ Authentication Module Installed\n'));
    console.log(chalk.bold('Pages Generated:'));
    console.log(` ${chalk.green('✓')} Login`);
    console.log(` ${chalk.green('✓')} Signup`);
    if (options.email?.forgotPassword) {
      console.log(` ${chalk.green('✓')} Forgot Password`);
      console.log(` ${chalk.green('✓')} Reset Password`);
    }
    if (options.email?.emailVerification) {
      console.log(` ${chalk.green('✓')} Verify Email`);
    }

    console.log(chalk.bold('\nDatabase:'));
    console.log(` ${chalk.green('✓')} Users Table`);
    console.log(` ${chalk.green('✓')} Sessions Table`);

    console.log(chalk.bold('\nProviders:'));
    options.providers.forEach((p: string) => {
      console.log(` ${chalk.green('✓')} ${p.charAt(0).toUpperCase() + p.slice(1)}`);
    });

    console.log(chalk.bold('\nTests:'));
    console.log(` ${chalk.green('✓')} Generated & Ready\n`);
    console.log(chalk.cyan('Ready for Production\n'));

  } catch (error: any) {
    spinner.stop();
    console.log(`\n${chalk.red('✗')} Failed to generate authentication module: ${error.message}\n`);
    process.exit(1);
  }
}
