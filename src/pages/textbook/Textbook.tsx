import React from 'react';
import { UrlPath } from 'src/requests/constantsAPI';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Words from 'src/pages/textbook/Words';
import styles from 'src/pages/textbook/Textbook.module.scss';
import {
  addCustomWord,
  clearAll,
  fetchCurrentPageWords,
  selectCurrentPageWords,
  selectCustomWord,
} from 'src/store/wordsSlice';

const Textbook: React.FC = () => {
  const dispatch = useAppDispatch();
  const customWord = useAppSelector(selectCustomWord);
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  return (
    <>
      <h1 className={`${styles.title}`}>Учебник</h1>
      <Words />
      <button type='button' onClick={() => dispatch(addCustomWord('hello'))}>
        Add Custom Word
      </button>
      <button type='button' onClick={() => dispatch(clearAll())}>
        Clear All Words
      </button>
      <button type='button' onClick={() => dispatch(fetchCurrentPageWords('2', '3'))}>
        Async Get Words
      </button>
      <div>{customWord}</div>
      <div>
        {currentPageWords.map((word) => (
          <div key={word.word}>
            <div>{word.word}</div>
            <div>{word.wordTranslate}</div>
            <img src={`${UrlPath.BASE}/${word.image}`} alt={word.word} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Textbook;
