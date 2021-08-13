import { Input } from '../commands';

export interface IAction {
  handle: (inputs?: Input[], options?: Input[], extraFlags?: string[]) => Promise<void>;
}
