import React from 'react';
import { UrlPath } from 'src/requests/interfaceAPI';
import { useAppSelector } from 'src/store/hooks';
import { selectCurrentPageWords } from 'src/store/wordsSlice';

function WordsByGroup() {
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  return (
    <div>
      {currentPageWords.map((word, i) => (
        <div key={i}>
          <div>{word.word}</div>
          <div>{word.wordTranslate}</div>
          <img src={`${UrlPath.base}/${word.image}`} alt={word.word} />
        </div>
      ))}
    </div>
  );
}

export default WordsByGroup;
