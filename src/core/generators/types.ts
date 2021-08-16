import { Language, Meta, SessionData } from '../../types';

export interface GenerationInput {
  session: SessionData;
  meta: Meta;
  basedir: string;
}

export interface SkeletonGenerator {
  language: Language;
  generate: (input: GenerationInput) => Promise<void>;
}
