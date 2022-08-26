/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
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
    console.log('ADD TO DIFF', word?._id, `${word?.group}`, `${word?.page}`);
    dispatch(fetchCreateDiffWord(getUserId(), word?._id, `${word?.group}`, `${word?.page}`,  getUserToken()));
  };

  const addLearnedWord = () => {
    console.log('add to leafned', word);
  };

  useEffect(() => {
    // console.log(word);
    const wordIsAdded = userDiffWords.some((userWord) => userWord.id === word?.id || userWord.id === word?._id);
    // console.log(wordIsAdded);
    if (wordIsAdded) setDiffWord(() => true);
    if (!wordIsAdded) setDiffWord(() => false);
  }, [userDiffWords, setDiffWord, word, diffWord]);

  return (
    <div className={styles.wordButtons}>
      <button type='button' onClick={addDiffWord} className={styles.wordButton} disabled={diffWord || word?.userWord?.optional.difficult}>
        Сложное слово
      </button>
      <button type='button' onClick={addLearnedWord} className={styles.wordButton}>
        Изученное слово
      </button>
    </div>
  );
};

export default WordButtons;


// word?.userWord?.optional.difficult