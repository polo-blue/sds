export const text2paragraphs = (text: string, firstLineBottomMargin: boolean = false) => {
  // return '<p class="mb-2">' + text.split(/[\n\r]+/g).join('</p><p>') + '</p>'
  let out =
    '<p' +
    (firstLineBottomMargin ? 'class="mb-3"' : '') +
    '>' +
    text.split('\n').join('</p><p>') +
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
