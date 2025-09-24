const MAX_DESCRIPTION_LENGTH = 150;

export const getShorterDescription = (
  description: string | null,
  limit = MAX_DESCRIPTION_LENGTH
) => {
  function cutString(s: string, n: number) {
    const text = s.replaceAll('\n', ' ');
    const cut = text.indexOf('. ', n);
    return cut === -1 ? text : `${text.substring(0, cut)}.`;
  }

  return description ? cutString(description, limit) || '' : '';
};

export default getShorterDescription;
