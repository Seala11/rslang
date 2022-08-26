/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCreateDiffWord, getDifficultWords } from 'src/store/userWordsSlice';
import { IWordButtonsProps } from './IWordButtonsProps';
import styles from './WordButtons.module.scss';

const WordButtons: React.FC<IWordButtonsProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const userDiffWords = useAppSelector(getDifficultWords);

  const [diffWord, setDiffWord] = useState(false);

  const addDiffWord = () => {
    dispatch(
      fetchCreateDiffWord(getUserId(), word?._id, `${word?.group}`, `${word?.page}`, getUserToken())
    );
  };

  const addLearnedWord = () => {
    console.log('add to learned', word);
  };

  useEffect(() => {
    const wordIsAdded = userDiffWords.some(
      (userWord) => userWord.id === word?.id || userWord.id === word?._id
    );
    if (wordIsAdded) setDiffWord(() => true);
    if (!wordIsAdded) setDiffWord(() => false);
  }, [userDiffWords, setDiffWord, word, diffWord]);

  return (
    <div className={styles.wordButtons}>
      <button
        type='button'
        onClick={addDiffWord}
        className={styles.wordButton}
        disabled={diffWord || word?.userWord?.optional.difficult}
      >
        Сложное слово
      </button>
      <button type='button' onClick={addLearnedWord} className={styles.wordButton}>
        Изученное слово
      </button>
    </div>
  );
};

export default WordButtons;
