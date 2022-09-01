/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import styles from 'src/containers/word-list/Word/Word.module.scss';
import { userIsLogged } from 'src/helpers/storage';
import { useAppSelector } from 'src/store/hooks';
import { getUserData } from 'src/store/userSlice';
import { getCurrPageLearned } from 'src/store/userWordsSlice';
import { selectWordDetails } from 'src/store/wordsSlice';
import { IWordProps } from './IWordProps';

const Word: React.FC<IWordProps> = ({ onWordClick, word }) => {
  const userData = useAppSelector(getUserData);
  const wordDetails = useAppSelector(selectWordDetails);
  const currPageLearned = useAppSelector(getCurrPageLearned);

  useEffect(() => {}, [currPageLearned]);

  if (userIsLogged(userData?.message))
    return (
      <div
        className={`${
          (wordDetails?.id && wordDetails?.id === word._id) ||
          (wordDetails?._id && wordDetails?._id === word._id)
            ? styles.active
            : ''
        } 
        ${currPageLearned ? styles.page_learned : ''}
        ${styles.word}`}
        key={word.id}
        onClick={() => onWordClick(word)}
        aria-hidden
      >
        <div className={styles.container}>
          <span className={styles.original}>{word.word}</span>
          <span className={styles.translate}>{word.wordTranslate}</span>
        </div>
        <div className={styles.options}>
          {word.userWord?.optional.difficult || word.userWord?.optional.learned ? (
            <div
              className={`${word.userWord?.optional.difficult ? styles.wrapper_difficult : ''} ${
                word.userWord?.optional.learned ? styles.wrapper_learned : ''
              } ${styles.wrapper}`}
            >
              <div
                className={`${word.userWord?.optional.difficult ? styles.difficult : ''} ${
                  word.userWord?.optional.learned ? styles.learned : ''
                } ${styles.selected}`}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );

  return (
    <div
      className={`${wordDetails?.id && wordDetails?.id === word.id ? styles.active : ''} ${
        styles.word
      }`}
      key={word.id}
      onClick={() => onWordClick(word)}
      aria-hidden
    >
      <div className={styles.container}>
        <span className={styles.original}>{word.word}</span>
        <span className={styles.translate}>{word.wordTranslate}</span>
      </div>
      <div className={styles.wrapper}>
        {word.userWord?.optional.difficult ? (
          <div className={`${styles.difficult} ${styles.selected}`} />
        ) : (
          <div className={styles.difficult} />
        )}

        {word.userWord?.optional.difficult ? (
          <div className={`${styles.learned} ${styles.selected}`} />
        ) : (
          <div className={styles.learned} />
        )}
      </div>
    </div>
  );
};

export default Word;
