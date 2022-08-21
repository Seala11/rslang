import { Navigate } from 'src/helpers/constants';

export interface IPaginationProps {
  unit: number;
  onPaginationClick: (page: number) => void;
  onPageNavigate: (navigation: Navigate) => void;
}
