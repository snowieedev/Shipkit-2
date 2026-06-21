import { Command } from 'commander';
import { authCommand } from './add/auth.js';

export const addCommand = new Command('add')
  .description('Add a new feature to your ShipKit project');

addCommand.addCommand(authCommand);
