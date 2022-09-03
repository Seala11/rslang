import { ISprintWord, IWord } from 'src/store/types';

export const shuffle = <T>(arr: T[]) => {
  const array = arr;

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const adaptToLocalSprintWords = (words: IWord[]) =>
  words.map((word, i) => ({
    ...word,
    wrongTranslate: words[(i + 1) % words.length].wordTranslate,
    choice: Math.round(Math.random()),
  }));

export const adaptToServerSprintWords = (words: ISprintWord[]) => {
  const newWords = [];

  // console.log(111);

  for (let i = 0; i < words.length; i += 1) {
    const newWord = { ...words[i] };
    delete newWord.wrongTranslate;
    delete newWord.choice;

    newWords.push(newWord);
  }

  // console.log(newWords);

  return newWords;
};

// words.map((word) => {
//   const sprintWord = { ...word };

//   console.log(sprintWord);

//   delete sprintWord.wrongTranslate;
//   delete sprintWord.choice;

//   return sprintWord;
// });
