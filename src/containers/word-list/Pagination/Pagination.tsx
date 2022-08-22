import React from 'react';
import { Navigate } from 'src/helpers/constants';
import styles from './Pagination.module.scss';
import { IPaginationProps } from './IPaginationProps';

const UNITS_TOTAL = 30;

const UNITS = Array(UNITS_TOTAL)
  .fill(null)
  .map((_, i) => i + 1);

const Pagination: React.FC<IPaginationProps> = ({ unit, onPageNavigate, onPaginationClick }) => {
  let pagination: number[] = [];

  if (unit <= 4) {
    pagination = [...UNITS.slice(0, 5), -1, UNITS_TOTAL];
  } else if (unit >= UNITS_TOTAL - 3) {
    pagination = [1, -1, ...UNITS.slice(UNITS_TOTAL - 5)];
  } else {
    pagination = [1, -1, unit - 1, unit, unit + 1, -2, UNITS_TOTAL];
  }

  return (
    <ul className={styles.pagination}>
      <li className={styles.value}>
        <button
          className={`${styles.prev} ${styles.btn}`}
          type='button'
          onClick={() => onPageNavigate(Navigate.PREV)}
          disabled={unit === 1}
        >
          <svg
            focusable='false'
            aria-hidden='true'
            viewBox='0 0 24 24'
            data-testid='NavigateBeforeIcon'
          >
            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
          </svg>
        </button>
      </li>
      {pagination.map((value) => (
        <li className={styles.value} key={value}>
          {value < 0 ? (
            <span className={styles.ellipsis}>...</span>
          ) : (
            <button
              className={`${value === unit ? styles.active : ''} ${styles.btn}`}
              type='button'
              onClick={() => onPaginationClick(value)}
            >
              {value}
            </button>
          )}
        </li>
      ))}
      <li className={styles.value}>
        <button
          className={`${styles.next} ${styles.btn}`}
          type='button'
          onClick={() => onPageNavigate(Navigate.NEXT)}
          disabled={unit === UNITS_TOTAL}
        >
          <svg
            focusable='false'
            aria-hidden='true'
            viewBox='0 0 24 24'
            data-testid='NavigateNextIcon'
          >
            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
