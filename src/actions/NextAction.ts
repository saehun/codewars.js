import { Input } from '../commands';
import { IAction } from './interface';

export class NextAction implements IAction {
  async handle(inputs: Input[], options: Input[]) {
    console.log(inputs, options);
    return;
  }
}
