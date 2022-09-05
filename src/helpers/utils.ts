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

  for (let i = 0; i < words.length; i += 1) {
    const newWord = { ...words[i] };
    delete newWord.wrongTranslate;
    delete newWord.choice;

    newWords.push(newWord);
  }

  return newWords;
};

const isNewWord = (word: IWord) => {
  if (!word.userWord) return true;

  return (
    word.userWord?.optional.sprint.right === 0 &&
    word.userWord?.optional.sprint.wrong === 0 &&
    word.userWord?.optional.audio.right === 0 &&
    word.userWord?.optional.audio.wrong === 0
  );
};

export const getNumberOfNewWords = (words: IWord[]) =>
  words.filter((word) => isNewWord(word)).length;

const isLearnedWord = (word: IWord) => !word.userWord || !word.userWord.optional.learned;

export const getNumberOfLearnedWords = (words: IWord[]) =>
  words.filter((word) => isLearnedWord(word)).length;

export const createPagesFilter = (group: number, currPage: number, maxPage = 20) => {
  const arr = Array(maxPage).fill(null);

  const res = arr.map((_, i) => {
    let page = currPage - i;
    page = i <= currPage ? page : maxPage + page;

    return { group, page };
  });

  return res;
};
