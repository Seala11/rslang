import React from 'react';
import styles from './WordButtons.module.scss';

const WordButtons = () => {
  const addDiffWord = () => {
    console.log('add to diff');
  };

  const addLearnedWord = () => {
    console.log('add to leafned');
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
