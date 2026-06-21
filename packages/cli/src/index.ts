#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { loginCommand } from './commands/login.js';
import { logoutCommand } from './commands/logout.js';
import { initCommand } from './commands/init.js';
import { providersCommand } from './commands/providers.js';
import { apiCommand } from './commands/api.js';
import { whoamiCommand } from './commands/whoami.js';
import { addCommand } from './commands/add.js';

const program = new Command();

const displayBanner = () => {
  console.log('\n');
  console.log(
    gradient.pastel.multiline(
      figlet.textSync('ShipKit', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
    )
  );
  console.log(chalk.bold.cyan('Build Faster. Ship Smarter.\n'));
};

program
  .name('shipkit')
  .description('ShipKit CLI\n\nBuild Faster. Ship Smarter.')
  .version('1.4.1', '-v, --version', 'Display CLI version')
  .helpOption('-h, --help', 'Display help information');

program.addHelpText('beforeAll', () => {
  displayBanner();
  return '';
});

program.addHelpText('afterAll', () => {
  return `\nDocumentation\n\n  https://docs.shipkit.dev\n`;
});

program.addCommand(loginCommand);
program.addCommand(logoutCommand);
program.addCommand(initCommand);
program.addCommand(providersCommand);
program.addCommand(apiCommand);
program.addCommand(whoamiCommand);
program.addCommand(addCommand);

program.parse(process.argv);
