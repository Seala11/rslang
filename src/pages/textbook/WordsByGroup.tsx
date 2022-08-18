import React from 'react';
import { UrlPath } from 'src/requests/interfaceAPI';
import { useAppSelector } from 'src/store/hooks';
import { selectCurrentPageWords } from 'src/store/wordsSlice';

const WordsByGroup = () => {
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  return (
    <div>
      {currentPageWords.map((word) => (
        <div key={word.word}>
          <div>{word.word}</div>
          <div>{word.wordTranslate}</div>
          <img src={`${UrlPath.base}/${word.image}`} alt={word.word} />
        </div>
      ))}
    </div>
  );
};

export default WordsByGroup;