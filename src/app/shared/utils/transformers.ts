export const capitalizeName = (str: string) => {
  if (typeof str === 'string') {
    return str
      .trim()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return str;
};
