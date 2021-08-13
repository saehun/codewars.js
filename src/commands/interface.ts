import { Command } from 'commander';
import { IAction } from '../actions/interface';

export abstract class AbstractCommand {
  constructor(protected action: IAction) {}
  public abstract load(program: Command): void;
}

export interface Input {
  name: string;
  value: boolean | string;
  options?: any;
}
