export type AuthToken = { csrfToken: string; jwt: string };

export type KataInfo = {
  success: boolean; // true;
  strategy: string; // 'default';
  language: string; // 'javascript';
  slice: any; // {};
  id: string; // '5324945e2ece5e1f32000370';
  name: string; // 'Sum Strings as Numbers';
  description: string; // 'Given the string representations of two integers, return the string representation of the sum of those integers.\n\nFor example:\n```javascript\nsumStrings(\'1\',\'2\') // => \'3\'\n```\n```c\nstrsum("1", "2")    /* => 3 */\n```\n\nA string representation of an integer will contain no characters besides the ten numerals "0" to "9".';
  systemTags: string[]; // ['Algorithms', 'Strings', 'Data Types', 'Arithmetic', 'Mathematics', 'Logic', 'Numbers', 'Big Integers', 'Integers', 'Utilities'];
  rank: number; // -4;
  rankName: string; // '4 kyu';
  rankingHtml: string; // '<div class="small-hex is-extra-wide is-blue-rank"><div class="inner-small-hex is-extra-wide "><span>4 kyu</span></div></div>';
  href: string; // '/kata/5324945e2ece5e1f32000370';
};

export type Language =
  | 'crystal'
  | 'csharp'
  | 'elixir'
  | 'elm'
  | 'haskell'
  | 'java'
  | 'javascript'
  | 'julia'
  | 'prolog'
  | 'python'
  | 'ruby'
  | 'swift'
  | 'typescript'
  | 'c'
  | 'coffeescript'
  | 'cpp'
  | 'go'
  | 'groovy'
  | 'php'
  | 'rust'
  | 'dart'
  | 'kotlin'
  | 'nasm'
  | 'pascal'
  | 'r'
  | 'scala'
  | 'clojure'
  | 'factor'
  | 'fsharp'
  | 'lua'
  | 'nim'
  | 'powershell'
  | 'racket'
  | 'raku'
  | 'shell'
  | 'objc'
  | 'purescript'
  | 'reason'
  | 'sql'
  | 'cfml'
  | 'fortran'
  | 'ocaml'
  | 'perl'
  | 'commonlisp'
  | 'forth';
