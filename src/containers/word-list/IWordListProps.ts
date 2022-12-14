import { IPaginationProps } from 'src/containers/word-list/Pagination/IPaginationProps';
import { IWord } from 'src/store/types';

export interface IWordListProps extends IPaginationProps {
  onWordClick: (word: IWord) => void;
  words: IWord[];
  wordDetails: IWord | null;
}
