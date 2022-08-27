/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCreateDiffWord } from 'src/store/userWordsSlice';
import { selectWordDetails } from 'src/store/wordsSlice';
import { IWordButtonsProps } from './IWordButtonsProps';
import styles from './WordButtons.module.scss';

const WordButtons: React.FC<IWordButtonsProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const wordDetails = useAppSelector(selectWordDetails);

  const [diffWord, setDiffWord] = useState(false);

  const addDiffWord = () => {
    dispatch(
      fetchCreateDiffWord(getUserId(), word?._id, `${word?.group}`, `${word?.page}`, getUserToken())
    );
    setDiffWord(() => true);
  };

  const addLearnedWord = () => {
    console.log('add to learned', word);
  };

  useEffect(() => {
    const wordIsDiff =
      wordDetails?.userWord?.optional.difficult || word?.userWord?.optional.difficult;
    if (wordIsDiff) setDiffWord(() => true);
    if (!wordIsDiff) setDiffWord(() => false);
  }, [word, setDiffWord, wordDetails]);

  return (
    <div className={styles.wordButtons}>
      <button type='button' onClick={addDiffWord} className={styles.wordButton} disabled={diffWord}>
        Сложное слово
      </button>
      <button type='button' onClick={addLearnedWord} className={styles.wordButton}>
        Изученное слово
      </button>
    </div>
  );
};

export default WordButtons;
