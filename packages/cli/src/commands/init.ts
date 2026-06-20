import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { api } from '../lib/api.js';
import { getAuth } from '../lib/storage.js';

export const initCommand = new Command('init')
  .description('Create a ShipKit project')
  .action(async () => {
    const auth = getAuth();
    if (!auth || !auth.token) {
      console.log(`\n${chalk.red('✗')} Unauthorized\n\nPlease run ${chalk.cyan('shipkit login')} first.\n`);
      process.exit(1);
    }

    console.log('');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name\n›',
        default: path.basename(process.cwd()),
        validate: (input) => {
          if (!input.trim()) return 'Project name is required';
          return true;
        }
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Framework\n›',
        choices: ['Next.js', 'React (Vite)', 'Vue', 'SvelteKit', 'Node.js Backend'],
        default: 'Next.js'
      },
      {
        type: 'checkbox',
        name: 'providers',
        message: 'Providers\n›',
        choices: ['Supabase', 'Resend', 'Stripe', 'PostHog', 'Vercel KV']
      }
    ]);

    console.log('');
    const spinner = ora('Creating project...').start();

    try {
      const project = await api.createProject(answers.projectName, `A ${answers.framework} project created via CLI`);
      
      const config = {
        projectId: project.id,
        framework: answers.framework,
        providers: answers.providers
      };

      fs.writeFileSync(
        path.join(process.cwd(), 'shipkit.config.json'),
        JSON.stringify(config, null, 2),
        'utf-8'
      );

      spinner.stop();

      console.log(`${chalk.green('✓')} Project created\n`);
      console.log(`Project ID\n${chalk.dim(project.id)}\n`);
      console.log(`Configuration written\n${chalk.dim('shipkit.config.json')}\n`);
      console.log(`${chalk.dim('Ready to build.')}\n`);

    } catch (error: any) {
      spinner.stop();
      
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      
      console.log(`${chalk.red('✗')} Project creation failed\n`);
      console.log(`${errorMessage}\n`);
      process.exit(1);
    }
  });
