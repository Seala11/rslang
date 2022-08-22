import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCurrentPageWords, selectCurrentPageWords } from 'src/store/wordsSlice';
import { useSearchParams } from 'react-router-dom';
import { IWord } from 'src/store/types';
import { Navigate } from 'src/helpers/constants';
import WordList from 'src/containers/word-list';
import GroupList from 'src/containers/group-list';
import styles from './Textbook.module.scss';

const Textbook = () => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);

  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get('group') ?? '1';
  const group = +groupParam;
  const unitParam = searchParams.get('unit') ?? '1';
  const unit = +unitParam;

  const [wordDetails, setWordDetails] = useState<IWord | null>(null);

  useEffect(() => {
    setWordDetails(currentPageWords[0]);
  }, [currentPageWords]);

  useEffect(() => {
    dispatch(fetchCurrentPageWords(`${group - 1}`, `${unit - 1}`));
  }, [dispatch, group, unit]);

  const handleGroupClick = (groupNumber: number) => {
    setSearchParams({ group: `${groupNumber}`, unit: `${unit}` });
  };

  const handlePaginationClick = (pageNumber: number) => {
    setSearchParams({ group: `${group}`, unit: `${pageNumber}` });
  };

  const handlePageNavigate = (navigation: Navigate) => {
    switch (navigation) {
      case Navigate.PREV:
        setSearchParams({ group: `${group}`, unit: `${unit - 1}` });
        break;

      case Navigate.NEXT:
        setSearchParams({ group: `${group}`, unit: `${unit + 1}` });
        break;

      default:
        break;
    }
  };

  const handleWordClick = (word: IWord) => {
    setWordDetails(word);
  };

  return (
    <main className={styles.main}>
      <div className={`${styles.container} ${styles[`group_${group}`]}`}>
        <h1 className={styles.title}>Учебник</h1>
        <GroupList onGroupClick={handleGroupClick} group={group} />
        <h2 className={`${styles.title} ${styles.titleColor}`}>Слова</h2>
        <WordList
          unit={unit}
          words={currentPageWords}
          wordDetails={wordDetails}
          onWordClick={handleWordClick}
          onPageNavigate={handlePageNavigate}
          onPaginationClick={handlePaginationClick}
        />
        <h2 className={styles.title}>Игры</h2>
      </div>
    </main>
  );
};

export default Textbook;
