import { Command } from 'commander';
import { AbstractCommand, Input } from './interface';

export class NextCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('next <library>')
      .allowUnknownOption()
      .description('Adds support for an external library to your project.')
      .option(
        '-d, --dry-run',
        'Report actions that would be performed without writing out results.'
      )
      .option('-p, --project [project]', 'Project in which to generate files.')
      .usage('<library> [options] [library-specific-options]')
      .action(async (library: string, command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({
          name: 'project',
          value: command.project,
        });

        const inputs: Input[] = [];
        inputs.push({ name: 'library', value: library });

        const flags = getRemainingFlags(program);
        try {
          await this.action.handle(inputs, options, flags);
        } catch (err) {
          process.exit(0);
        }
      });
  }
}
