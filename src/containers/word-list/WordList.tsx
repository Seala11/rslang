/* eslint-disable no-underscore-dangle */
import React from 'react';
import { IWordListProps } from './IWordListProps';
import Pagination from './Pagination';
import Word from './Word/Word';
import WordDetails from './WordDetails';
import styles from './WordList.module.scss';

const WordList: React.FC<IWordListProps> = ({
  onWordClick,
  words,
  unit,
  onPageNavigate,
  onPaginationClick,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.row}>
      <div className={styles.words}>
        {words.map((word) => (
          <Word key={word.word} {...{ onWordClick, word }} />
        ))}
      </div>
      <div className={styles.details}>
        <WordDetails />
      </div>
    </div>
    <Pagination unit={unit} onPageNavigate={onPageNavigate} onPaginationClick={onPaginationClick} />
  </div>
);

export default WordList;
