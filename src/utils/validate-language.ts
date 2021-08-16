import { Language } from '../types';

export function validateLanguage(given: string): asserts given is Language {
  if (LANGUAGES.includes(given)) {
    return;
  }
  throw new Error(`Not supported language: ${given}`);
}

const LANGUAGES = [
  'crystal',
  'csharp',
  'elixir',
  'elm',
  'haskell',
  'java',
  'javascript',
  'julia',
  'prolog',
  'python',
  'ruby',
  'swift',
  'typescript',
  'c',
  'coffeescript',
  'cpp',
  'go',
  'groovy',
  'php',
  'rust',
  'dart',
  'kotlin',
  'nasm',
  'pascal',
  'r',
  'scala',
  'clojure',
  'factor',
  'fsharp',
  'lua',
  'nim',
  'powershell',
  'racket',
  'raku',
  'shell',
  'objc',
  'purescript',
  'reason',
  'sql',
  'cfml',
  'fortran',
  'ocaml',
  'perl',
  'commonlisp',
  'forth',
  'vb',
  'haxe',
  'solidity',
];
