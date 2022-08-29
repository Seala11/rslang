/* eslint-disable import/prefer-default-export */

export const shuffle = <T>(arr: T[]) => {
  const array = arr;

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
