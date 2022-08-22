import React from 'react';
import { IWordListProps } from './IWordListProps';
import Pagination from './Pagination';
import WordDetails from './WordDetails';
import styles from './WordList.module.scss';

const WordList: React.FC<IWordListProps> = ({
  onWordClick,
  words,
  unit,
  onPageNavigate,
  onPaginationClick,
  wordDetails,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.row}>
      <div className={styles.words}>
        {words.map((word) => (
          <div
            className={`${wordDetails?.id === word.id ? styles.active : ''} ${styles.word}`}
            key={word.id}
            onClick={() => onWordClick(word)}
            aria-hidden
          >
            <span className={styles.original}>{word.word}</span>
            <span className={styles.translate}>{word.wordTranslate}</span>
          </div>
        ))}
      </div>
      <div className={styles.details}>
        <WordDetails word={wordDetails} />
      </div>
    </div>
    <Pagination unit={unit} onPageNavigate={onPageNavigate} onPaginationClick={onPaginationClick} />
  </div>
);

export default WordList;
