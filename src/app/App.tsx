import React from 'react';
import getWordsAPI from 'src/requests/getWordsAPI';
import Button from 'src/components/button/Button';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  addCustomWord,
  clearAll,
  fetchCurrentPageWords,
  selectCurrentPageWords,
  selectCustomWord,
} from 'src/store/wordsSlice';
import { UrlPath } from 'src/requests/interfaceAPI';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  const dispatch = useAppDispatch();
  const customWord = useAppSelector(selectCustomWord);
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  return (
    <>
      <Button text='Example' disabled={true}></Button>
      <div className='App'>App</div>
      <button type='button' onClick={() => dispatch(addCustomWord('hello'))}>
        Add Custom Word
      </button>
      <button type='button' onClick={() => dispatch(clearAll())}>
        Clear All Words
      </button>
      <button type='button' onClick={() => dispatch(fetchCurrentPageWords(2, 3))}>
        Async Get Words
      </button>
      <div>{customWord}</div>
      <div>
        {currentPageWords.map((word, i) => (
          <div key={i}>
            <div>{word.word}</div>
            <div>{word.wordTranslate}</div>
            <img src={`${UrlPath.base}/${word.image}`} alt={word.word} />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
