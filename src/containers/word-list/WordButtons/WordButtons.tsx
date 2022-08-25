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

  const checkWordIsDiff = () => {
    const wordIsAdded = userDiffWords.some((userWord) => userWord.id === word?.id);
    if (wordIsAdded) setDiffWord(() => true);
  };

  const addDiffWord = () => {
    console.log('add to diff', word);
    dispatch(fetchCreateDiffWord(getUserId(), word?.id, `${word?.group}`, getUserToken()));
    checkWordIsDiff();
  };

  const addLearnedWord = () => {
    console.log('add to leafned', word);
  };

  useEffect(() => {
    console.log(word);
    console.log(userDiffWords);
    const wordIsAdded = userDiffWords.some((userWord) => userWord.id === word?.id);
    console.log(wordIsAdded);
    if (wordIsAdded) setDiffWord(() => true);
    if (!wordIsAdded) setDiffWord(() => false);
  }, [userDiffWords, setDiffWord, word, diffWord]);

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
