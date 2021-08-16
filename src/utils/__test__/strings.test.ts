import { stripExample, wrapText } from '../strings';

describe('strings', () => {
  it('stripExample', () => {
    const case01 = `lorem ipsum
Examples:
...
    `;
    const case02 = `lorem ipsum
example:
...
    `;
    const case03 = `lorem ipsum
`;
    const result01 = `lorem ipsum\n`;
    expect(stripExample(case01)).toEqual(result01);
    expect(stripExample(case02)).toEqual(result01);
    expect(stripExample(case03)).toEqual(result01);
  });

  it('wrapText', () => {
    const case01 =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque augue. Maecenas accumsan felis ac dui pellentesque vehicula. Donec et est blandit, egestas turpis in, sagittis ante. Suspendisse potenti. Suspendisse hendrerit enim in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula elit egestas. Proin sagittis viverra augue, ut commodo lorem condimentum nec. Donec quam orci, auctor eu pulvinar eget, finibus sed justo. Phasellus consequat odio vitae lobortis ullamcorper. Donec ac metus ante. Sed vulputate metus dapibus laoreet vehicula.';

    const result01 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque
augue. Maecenas accumsan felis ac dui pellentesque vehicula. Donec et est blandit,
egestas turpis in, sagittis ante. Suspendisse potenti. Suspendisse hendrerit enim
in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula elit egestas.
Proin sagittis viverra augue, ut commodo lorem condimentum nec. Donec quam orci,
auctor eu pulvinar eget, finibus sed justo. Phasellus consequat odio vitae lobortis
ullamcorper. Donec ac metus ante. Sed vulputate metus dapibus laoreet vehicula.
    `.trim();
    expect(wrapText(case01)).toEqual(result01);

    const case02 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque augue. Maecenas accumsan felis ac dui pellentesque vehicula. Donec et est blandit, egestas turpis in, sagittis ante. Suspendisse potenti. Suspendisse hendrerit enim in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula elit egestas. Proin sagittis viverra augue, ut commodo lorem condimentum nec.

Donec quam orci, auctor eu pulvinar eget, finibus sed justo. Phasellus consequat odio vitae lobortis ullamcorper.

Donec ac metus ante. Sed vulputate metus dapibus laoreet vehicula.`;
    const result02 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque
augue. Maecenas accumsan felis ac dui pellentesque vehicula. Donec et est blandit,
egestas turpis in, sagittis ante. Suspendisse potenti. Suspendisse hendrerit enim
in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula elit egestas.
Proin sagittis viverra augue, ut commodo lorem condimentum nec.

Donec quam orci, auctor eu pulvinar eget, finibus sed justo. Phasellus consequat
odio vitae lobortis ullamcorper.

Donec ac metus ante. Sed vulputate metus dapibus laoreet vehicula.
`.trim();

    const case03 =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque augue. Maecenas accumsan felis ac dui pellentesque vehicula. Donec et est blandit, egestas turpis in, sagittis ante. Suspendisse potenti. Suspendisse hendrerit enim in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula elit egestas. Proin sagittis viverra augue, ut commodo lorem condimentum nec. Donec quam orci, auctor eu pulvinar eget, finibus sed justo. Phasellus consequat odio vitae lobortis ullamcorper. Donec ac metus ante. Sed vulputate metus dapibus laoreet vehicula.';

    const result03 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae scelerisque augue. Maecenas accumsan
felis ac dui pellentesque vehicula. Donec et est blandit, egestas turpis in, sagittis ante. Suspendisse
potenti. Suspendisse hendrerit enim in posuere rutrum. Nulla tincidunt mauris ac ante sagittis, et vehicula
elit egestas. Proin sagittis viverra augue, ut commodo lorem condimentum nec. Donec quam orci, auctor
eu pulvinar eget, finibus sed justo. Phasellus consequat odio vitae lobortis ullamcorper. Donec ac metus
ante. Sed vulputate metus dapibus laoreet vehicula.
`.trim();
    expect(wrapText(case03, 100)).toEqual(result03);

    expect(wrapText(case02)).toEqual(result02);
    expect(wrapText('')).toEqual('');
    expect(wrapText('\n\n')).toEqual('\n');
  });
});
