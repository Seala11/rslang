import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  addWordDetails,
  fetchCurrentPageWords,
  getLoading,
  selectCurrentPageWords,
  selectWordDetails,
} from 'src/store/wordsSlice';
import { useSearchParams } from 'react-router-dom';
import { IWord } from 'src/store/types';
import { Navigate } from 'src/helpers/constants';
import WordList from 'src/containers/word-list';
import GroupList from 'src/containers/group-list';
import LayoutMain from 'src/containers/LayoutMain';
import DifficultWords from 'src/containers/DifficultWords';
import { getUserData, getUserIsLoading } from 'src/store/userSlice';
import { getUserId, getUserToken, userIsInStorage, userIsLogged } from 'src/helpers/storage';
import { fetchGetUserWords } from 'src/store/userWordsSlice';
import Loading from 'src/components/Loading';
import styles from './Textbook.module.scss';

enum TextbookSections {
  TEXTBOOK = 'textbook',
  DIFF_WORDS = 'diff-words',
}

const Textbook = () => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  const userData = useAppSelector(getUserData);
  const wordDetails = useAppSelector(selectWordDetails);
  const userIsLoggedLoading = useAppSelector(getUserIsLoading);
  const textBookIsLoading = useAppSelector(getLoading);

  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get('group') ?? '1';
  const group = +groupParam;
  const unitParam = searchParams.get('unit') ?? '1';
  const unit = +unitParam;

  const [sectionDisplay, setSectionDisplay] = useState(TextbookSections.TEXTBOOK);

  useEffect(() => {
    if (currentPageWords.length === 0 || userIsLoggedLoading) return;
    if (wordDetails?.group !== group - 1 || wordDetails?.page !== unit - 1) {
      dispatch(addWordDetails(currentPageWords[0]));
    }
  }, [
    currentPageWords,
    dispatch,
    wordDetails,
    group,
    unit,
    userIsLoggedLoading,
    textBookIsLoading,
  ]);

  useEffect(() => {
    if (userIsLoggedLoading || (userIsInStorage() && !userData)) return;

    // TODO: ask Marsel for the better solution)
    if (group === 7) setSectionDisplay(TextbookSections.DIFF_WORDS);

    if (!userIsLogged(userData?.message))
      dispatch(fetchCurrentPageWords(`${group - 1}`, `${unit - 1}`));

    if (userIsLogged(userData?.message))
      dispatch(fetchGetUserWords(getUserId(), getUserToken(), `${group - 1}`, `${unit - 1}`));
  }, [dispatch, group, unit, userData, userIsLoggedLoading]);

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
      // no default
    }
  };

  const handleWordClick = (word: IWord) => {
    dispatch(addWordDetails(word));
  };

  const handleDisplay = (
    event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }
  ) => {
    switch (event.target.name) {
      case TextbookSections.TEXTBOOK:
        // TODO: ask Marsel for the better solution)
        setSectionDisplay(() => TextbookSections.TEXTBOOK);
        setSearchParams({ group: `${1}`, unit: `${1}` });
        break;
      case TextbookSections.DIFF_WORDS:
        // TODO: ask Marsel for the better solution)
        setSectionDisplay(() => TextbookSections.DIFF_WORDS);
        setSearchParams({ group: `${7}`, unit: `${1}` });
        break;
      // no default
    }
  };

  if (userIsLoggedLoading || (userIsInStorage() && !userData))
    return (
      <LayoutMain>
        <Loading />
      </LayoutMain>
    );

  return (
    <LayoutMain>
      <div
        className={`${
          sectionDisplay === TextbookSections.TEXTBOOK
            ? `${styles.container} ${styles[`group_${group}`]}`
            : `${styles.container_diffwords}`
        }`}
      >
        <div className={styles.wrapper}>
          <button
            type='button'
            name={`${TextbookSections.TEXTBOOK}`}
            className={`${styles.title} ${
              sectionDisplay === TextbookSections.TEXTBOOK ? styles.title_active : ''
            }`}
            onClick={handleDisplay}
          >
            Учебник
          </button>
          {userIsLogged(userData?.message) ? (
            <button
              type='button'
              name={`${TextbookSections.DIFF_WORDS}`}
              className={`${styles.title} ${
                sectionDisplay === TextbookSections.DIFF_WORDS ? styles.title_active : ''
              }`}
              onClick={handleDisplay}
            >
              Сложные слова
            </button>
          ) : (
            ''
          )}
        </div>

        {sectionDisplay === TextbookSections.TEXTBOOK ? (
          <>
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
          </>
        ) : (
          <DifficultWords />
        )}
      </div>
    </LayoutMain>
  );
};

export default Textbook;
