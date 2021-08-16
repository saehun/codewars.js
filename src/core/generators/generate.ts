import { Language } from '../../types';
import { SkeletonGenerator } from './types';
import { JavascriptGenerator } from './javascript.generator';

export function combineGenerator(...generators: SkeletonGenerator[]) {
  return (language: Language) => {
    const target = generators.find(g => g.language === language);
    if (target == null) {
      throw new Error(`Skeleton generator for '${language}' is not supported`);
    }
    return target;
  };
}

export const generators = combineGenerator(new JavascriptGenerator());
