import React from 'react';
import getWordsAPI from 'src/requests/getWordsAPI';
import Button from 'src/components/button/Button';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addCustomWord, clearAll, selectCustomWord } from 'src/store/wordsSlice';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  const dispatch = useAppDispatch();
  const customWord = useAppSelector(selectCustomWord);

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
      <div>{customWord}</div>
    </>
  );
};

export default App;
