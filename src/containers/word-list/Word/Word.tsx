/* eslint-disable no-underscore-dangle */
import React from 'react';
import styles from 'src/containers/word-list/Word/Word.module.scss';
import { userIsLogged } from 'src/helpers/storage';
import { useAppSelector } from 'src/store/hooks';
import { getUserData } from 'src/store/userSlice';
import { selectWordDetails } from 'src/store/wordsSlice';
import { IWordProps } from './IWordProps';

const Word: React.FC<IWordProps> = ({ onWordClick, word }) => {
  const userData = useAppSelector(getUserData);
  const wordDetails = useAppSelector(selectWordDetails);

  if (userIsLogged(userData?.message))
    return (
      <div
        className={`${
          wordDetails?.id === word._id || wordDetails?._id === word._id ? styles.active : ''
        } ${styles.word}`}
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

  return (
    <div
      className={`${wordDetails?.id === word.id ? styles.active : ''} ${styles.word}`}
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
