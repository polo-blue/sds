export const text2paragraphs = (text: string, firstLineBottomMargin: boolean = false) => {
  // Normalize line endings: convert \r\n to \n, then remove any remaining \r
  const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  let out =
    '<p' +
    (firstLineBottomMargin ? ' class="mb-3"' : '') +
    '>' +
    normalizedText.split('\n').join('</p><p>') +
    '</p>';
  return out.split('<p></p><p>').join('<p class="mt-3">');
};

export const countWords = (str: string) => {
  return str.trim().split(/\s+/).length;
};

export const firstSentence = (str: string) => {
  return str.split('.');
};

export const removeSemicolon = (name: string) => {
  return name.replace(';', '');
};
