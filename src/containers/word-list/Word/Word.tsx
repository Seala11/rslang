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
//   console.log(word, wordDetails?.id, word._id);
//   console.log(userIsLogged(userData?.message));

  if (userIsLogged(userData?.message))
    return (
      <div
        className={`${wordDetails?._id === word._id || wordDetails?.id === word._id ? styles.active : ''} ${styles.word}`}
        key={word._id}
        onClick={() => onWordClick(word)}
        aria-hidden
      >
        <span className={styles.original}>{word.word}</span>
        <span className={styles.translate}>{word.wordTranslate}</span>
        {word.userWord?.optional.difficult ? <span>difficult</span> : ''}
      </div>
    );

  return (
    <div
      className={`${wordDetails?.id === word.id || wordDetails?.id === word._id ? styles.active : ''} ${styles.word}`}
      key={word.id}
      onClick={() => onWordClick(word)}
      aria-hidden
    >
      <span className={styles.original}>{word.word}</span>
      <span className={styles.translate}>{word.wordTranslate}</span>
      {word.userWord?.optional.difficult ? <span>difficult</span> : ''}
    </div>
  );
};

export default Word;
