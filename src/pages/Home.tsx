import React from 'react';
import { UrlPath } from 'src/requests/interfaceAPI';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  addCustomWord,
  clearAll,
  fetchCurrentPageWords,
  selectCurrentPageWords,
  selectCustomWord,
} from 'src/store/wordsSlice';
import Button from 'src/components/button';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const customWord = useAppSelector(selectCustomWord);
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  return (
    <>
      <Button disabled>Example</Button>
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
        {currentPageWords.map((word) => (
          <div key={word.word}>
            <div>{word.word}</div>
            <div>{word.wordTranslate}</div>
            <img src={`${UrlPath.base}/${word.image}`} alt={word.word} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
