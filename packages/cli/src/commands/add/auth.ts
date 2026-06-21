import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { getAuthRegistry } from '../../registry/auth.js';
import { resolveModules } from '../../lib/auth/resolver.js';
import { authAssembler } from '../../lib/auth/assembler.js';

export const authCommand = new Command('auth')
  .description('Add authentication to your project')
  .action(async () => {
    console.log(chalk.bold.cyan('\n🚀 ShipKit Auth Assembly\n'));

    const registry = getAuthRegistry();

    if (registry.templates.length === 0) {
      console.error(chalk.red('Error: No authentication templates found in registry.'));
      process.exit(1);
    }

    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Select Tech Stack:',
          choices: registry.templates,
        },
        {
          type: 'list',
          name: 'database',
          message: 'Select Database:',
          choices: registry.databases,
        },
        {
          type: 'list',
          name: 'engine',
          message: 'Select Auth Engine:',
          choices: registry.engines,
        },
        {
          type: 'checkbox',
          name: 'providers',
          message: 'Select Providers (Space to select, Enter to confirm):',
          choices: registry.providers,
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must choose at least one provider.';
            }
            return true;
          },
        },
      ]);

      console.log('\n' + chalk.blue('📦 Assembly Configuration:'));
      console.log(`${chalk.gray('Framework:')} ${answers.framework}`);
      console.log(`${chalk.gray('Database:')}  ${answers.database}`);
      console.log(`${chalk.gray('Engine:')}    ${answers.engine}`);
      console.log(`${chalk.gray('Providers:')} ${answers.providers.join(', ')}\n`);

      const resolveSpinner = ora('Resolving modules...').start();
      const modules = resolveModules(
        answers.framework,
        answers.database,
        answers.engine,
        answers.providers
      );
      resolveSpinner.succeed('Modules resolved successfully');

      const assembleSpinner = ora('Assembling authentication system...').start();
      
      const targetDir = process.cwd(); // Assume we are generating into the current directory
      
      await authAssembler(targetDir, modules);

      assembleSpinner.succeed('Authentication system generated successfully!');

      console.log('\n' + chalk.green('✨ Next Steps:'));
      console.log(`  1. Install dependencies: ${chalk.cyan('npm install')}`);
      console.log(`  2. Review the generated ${chalk.cyan('.env.example')} file and configure your environment`);
      console.log(`  3. Run the development server: ${chalk.cyan('npm run dev')}\n`);

    } catch (error: any) {
      console.error('\n' + chalk.red(`❌ Assembly failed: ${error.message}`));
      process.exit(1);
    }
  });
