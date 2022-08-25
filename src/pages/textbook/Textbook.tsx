import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCurrentPageWords, selectCurrentPageWords } from 'src/store/wordsSlice';
import { useSearchParams } from 'react-router-dom';
import { IWord } from 'src/store/types';
import { Navigate } from 'src/helpers/constants';
import WordList from 'src/containers/word-list';
import GroupList from 'src/containers/group-list';
import LayoutMain from 'src/containers/LayoutMain';
import DifficultWords from 'src/containers/DifficultWords';
import { getUserData } from 'src/store/userSlice';
import { userIsLogged } from 'src/helpers/storage';
import styles from './Textbook.module.scss';

enum TextbookSections {
  TEXTBOOK = 'textbook',
  DIFF_WORDS = 'diff-words',
}

const Textbook = () => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  const userData = useAppSelector(getUserData);

  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get('group') ?? '1';
  const group = +groupParam;
  const unitParam = searchParams.get('unit') ?? '1';
  const unit = +unitParam;

  const [wordDetails, setWordDetails] = useState<IWord | null>(null);

  const [sectionDisplay, setSectionDisplay] = useState(TextbookSections.TEXTBOOK);

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

  const handleDisplay = (
    event: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }
  ) => {
    switch (event.target.name) {
      case TextbookSections.TEXTBOOK:
        setSectionDisplay(() => TextbookSections.TEXTBOOK);
        break;
      case TextbookSections.DIFF_WORDS:
        setSectionDisplay(() => TextbookSections.DIFF_WORDS);
        break;
      // no default
    }
  };

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
