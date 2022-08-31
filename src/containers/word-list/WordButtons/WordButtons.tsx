/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { IUserWordOptions } from 'src/helpers/constRequestsAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCreateUserWord } from 'src/store/userWordsSlice';
import { selectWordDetails } from 'src/store/wordsSlice';
import { IWordButtonsProps } from './IWordButtonsProps';
import styles from './WordButtons.module.scss';

const WordButtons: React.FC<IWordButtonsProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const wordDetails = useAppSelector(selectWordDetails);

  const [diffWord, setDiffWord] = useState(false);
  const [learnedWord, setLearnedWord] = useState(false);

  const addDiffWord = () => {
    dispatch(
      fetchCreateUserWord(getUserId(), word?._id,  getUserToken(), `${word?.group}`, IUserWordOptions.DIFFICULT, undefined, `${word?.page}`,)
    );
    setDiffWord(() => true);
    setLearnedWord(() => false);
  };

  const addLearnedWord = () => {
    console.log('add to learned', word);
    dispatch(
      fetchCreateUserWord(getUserId(), word?._id,  getUserToken(), `${word?.group}`, IUserWordOptions.LEARNED, undefined, `${word?.page}`,)
    );
    setDiffWord(() => false);
    setLearnedWord(() => true);
  };

  useEffect(() => {
    const wordIsDiff =
      wordDetails?.userWord?.optional.difficult || word?.userWord?.optional.difficult;
    if (wordIsDiff) setDiffWord(() => true);
    if (!wordIsDiff) setDiffWord(() => false);
  }, [word, setDiffWord, wordDetails]);

  useEffect(() => {
    const wordIsLearned =
      wordDetails?.userWord?.optional.learned || word?.userWord?.optional.learned;
    if (wordIsLearned) setLearnedWord(() => true);
    if (!wordIsLearned) setLearnedWord(() => false);
  }, [word, setLearnedWord, wordDetails]);

  return (
    <div className={styles.wordButtons}>
      <button type='button' onClick={addDiffWord} className={styles.wordButton} disabled={diffWord}>
        Сложное слово
      </button>
      <button type='button' onClick={addLearnedWord} className={styles.wordButton} disabled={learnedWord}>
        Изученное слово
      </button>
    </div>
  );
};

export default WordButtons;
