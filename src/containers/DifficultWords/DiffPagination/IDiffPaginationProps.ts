import { IWord } from 'src/requests/interfaceAPI';

export interface IDiffPaginationProps {
  unit: number;
  onClick: (page: number) => void;
  onPageNavigate: (page: number) => void;
  words: IWord[][];
}
