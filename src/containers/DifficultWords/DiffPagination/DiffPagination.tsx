/* eslint-disable no-console */
import React from 'react';
import styles from 'src/containers/DifficultWords/DiffPagination/DiffPagination.module.scss';
import { Navigate } from 'src/helpers/constants';
import { IDiffPaginationProps } from './IDiffPaginationProps';

const DiffPagination: React.FC<IDiffPaginationProps> = ({ unit, onClick, onPageNavigate, words }) => {
  console.log(unit, words.length);
  return (
    <div className={styles.wrapper}>
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

      {words.map((page, index) => (
        <button
          key={page[0].word}
          className={`${index + 1 === unit ? styles.active : ''} ${styles.btn}`}
          type='button'
          onClick={() => onClick(index + 1)}
        >
          {`${index + 1}`}
        </button>
      ))}

      <button
        className={`${styles.next} ${styles.btn}`}
        type='button'
        onClick={() => onPageNavigate(Navigate.NEXT)}
        disabled={unit === words.length}
      >
        <svg
          focusable='false'
          aria-hidden='true'
          viewBox='0 0 24 24'
          data-testid='NavigateBeforeIcon'
        >
          <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
        </svg>
      </button>
    </div>
  );
};

export default DiffPagination;
