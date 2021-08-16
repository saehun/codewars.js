export function toFileName(text: string): string {
  return text
    .replace(/[^A-Za-z0-9 ]/g, '')
    .replace(/ /g, '-')
    .toLowerCase();
}

export function stripExample(text: string): string {
  const startAt = text.search(/examples?:/i);
  if (startAt < 0) {
    return text;
  }
  return text.slice(0, startAt);
}

export function wrapText(text: string, length = 80) {
  let cursor = 0;
  let lastNewLineAt = 0;
  const lines = [];
  while (cursor < text.length) {
    const spaceAt = text.indexOf(' ', cursor);
    const newLineAt = text.indexOf('\n', cursor);

    if (spaceAt < 0) {
      lines.push(text.slice(lastNewLineAt));
      break;
    }

    if (newLineAt > 0 && newLineAt < spaceAt) {
      lines.push(text.slice(lastNewLineAt, newLineAt));
      lastNewLineAt = newLineAt;
      cursor = newLineAt + 1;
      continue;
    }

    if (spaceAt - lastNewLineAt >= length) {
      lines.push(text.slice(lastNewLineAt, spaceAt));
      lastNewLineAt = spaceAt;
    }

    cursor = spaceAt + 1;
  }
  return lines.map(line => line.replace(/^\s/, '')).join('\n');
}
