
export const toSentenceCase = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/(^\s*|\.\s*|[!|?]\s*)([a-z])/g, (match) => match.toUpperCase());
};

export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const toAlternatingCase = (text: string): string => {
  return text
    .split('')
    .map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
    .join('');
};

export const toInverseCase = (text: string): string => {
  return text
    .split('')
    .map(char => {
      if (char === char.toUpperCase()) return char.toLowerCase();
      return char.toUpperCase();
    })
    .join('');
};

export const cleanExtraSpaces = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};
