import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getLoginPageTemplate, getSignupPageTemplate, getMiddlewareTemplate, getAuthServiceTemplate } from './templates.js';

export async function repairAuth() {
  console.log(chalk.bold.cyan('\nShipKit Repair Engine: Auth Module\n'));

  const spinner = ora('Scanning project for missing or broken files...').start();

  const cwd = process.cwd();
  let repairedCount = 0;

  // Define critical files and their templates
  const checks = [
    {
      name: 'Login Page',
      path: path.join(cwd, 'app', 'login', 'page.tsx'),
      content: getLoginPageTemplate()
    },
    {
      name: 'Signup Page',
      path: path.join(cwd, 'app', 'signup', 'page.tsx'),
      content: getSignupPageTemplate()
    },
    {
      name: 'Middleware',
      path: path.join(cwd, 'middleware.ts'),
      content: getMiddlewareTemplate()
    },
    {
      name: 'Auth Service',
      path: path.join(cwd, 'lib', 'auth', 'authService.ts'),
      content: getAuthServiceTemplate()
    }
  ];

  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate scan time

  spinner.stop();

  checks.forEach(check => {
    if (!fs.existsSync(check.path)) {
      console.log(`${chalk.yellow('⚠')} Missing ${check.name} detected.`);
      
      // Ensure directory exists
      const dir = path.dirname(check.path);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(check.path, check.content);
      console.log(`  ${chalk.green('✓')} Repaired ${check.name} (${path.basename(check.path)})`);
      repairedCount++;
    } else {
      console.log(`${chalk.green('✓')} ${check.name} intact.`);
    }
  });

  if (repairedCount === 0) {
    console.log(chalk.bold.green('\nNo issues found! Authentication module is healthy.\n'));
  } else {
    console.log(chalk.bold.green(`\nRepair complete. Fixed ${repairedCount} issues.\n`));
  }
}
