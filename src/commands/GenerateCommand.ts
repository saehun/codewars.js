import { Command } from 'commander';
import { AbstractCommand, Input } from './interface';
import { validateLanguage } from '../utils/validate-language';
import { GenerateAction } from '../actions';

export class GenerateCommand extends AbstractCommand {
  constructor(protected readonly action: GenerateAction) {
    super(action);
  }

  public load(program: Command): void {
    program
      .command('generate <language> <id>')
      .allowUnknownOption()
      .description('Find generate kata for given language')
      .action(async (language: string, id: string) => {
        try {
          const inputs: Input[] = [];
          validateLanguage(language);
          inputs.push({ name: 'language', value: language });
          inputs.push({ name: 'id', value: id });
          await this.action.handle(inputs);
        } catch (err) {
          console.log(err.message);
          process.exit(0);
        }
      });
  }
}
