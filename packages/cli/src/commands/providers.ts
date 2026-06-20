import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { api } from '../lib/api.js';
import { getAuth } from '../lib/storage.js';

export const providersCommand = new Command('providers')
  .description('View connected providers')
  .action(async () => {
    const auth = getAuth();
    if (!auth || !auth.token) {
      console.log(`\n${chalk.red('✗')} Unauthorized\n\nPlease run ${chalk.cyan('shipkit login')} first.\n`);
      process.exit(1);
    }

    const spinner = ora('Fetching provider status...').start();

    try {
      const providers = await api.getProviders();
      spinner.stop();

      const allProviders = ['Supabase', 'Resend', 'PostHog', 'Razorpay', 'Stripe'];
      
      const connectedNames = providers.map((p: any) => p.provider_name.toLowerCase());

      console.log(`\nProviders\n`);
      console.log(`${'Name'.padEnd(12)}Status`);
      
      let connectedCount = 0;

      for (const pName of allProviders) {
        const isConnected = connectedNames.includes(pName.toLowerCase());
        if (isConnected) {
          console.log(`${pName.padEnd(12)}${chalk.green('Connected')}`);
          connectedCount++;
        } else {
          console.log(`${chalk.dim(pName.padEnd(12))}${chalk.dim('Missing')}`);
        }
      }

      console.log(`\n${chalk.dim(`${allProviders.length} Providers`)}`);
      console.log(`${chalk.dim(`${connectedCount} Connected`)}`);
      console.log(`${chalk.dim(`${allProviders.length - connectedCount} Missing`)}\n`);

    } catch (error: any) {
      spinner.stop();
      
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      
      console.log(`\n${chalk.red('✗')} Fetch failed\n`);
      console.log(`${errorMessage}\n`);
      process.exit(1);
    }
  });
