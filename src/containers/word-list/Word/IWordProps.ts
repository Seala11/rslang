import { IWord } from 'src/store/types';

export interface IWordProps {
  onWordClick: (word: IWord) => void;
  word: IWord;
}