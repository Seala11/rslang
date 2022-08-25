import React from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCreateDiffWord } from 'src/store/userWordsSlice';
import { IWordButtonsProps } from './IWordButtonsProps';
import styles from './WordButtons.module.scss';

const WordButtons: React.FC<IWordButtonsProps> = ({ word }) => {
  const dispatch = useAppDispatch();

  const addDiffWord = () => {
    console.log('add to diff', word);
    dispatch(fetchCreateDiffWord(getUserId(), word?.id, `${word?.group}`, getUserToken()));
  };

  const addLearnedWord = () => {
    console.log('add to leafned', word);
  };

  return (
    <div className={styles.wordButtons}>
      <button type='button' onClick={addDiffWord} className={styles.wordButton}>
        Сложное слово
      </button>
      <button type='button' onClick={addLearnedWord} className={styles.wordButton}>
        Изученное слово
      </button>
    </div>
  );
};

export default WordButtons;
