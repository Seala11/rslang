/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Loading from 'src/components/Loading';
import { getLoading } from 'src/store/wordsSlice';
import {
  difficultSectionIsEmpty,
  fetchGetAllDiffWords,
  getDifficultWords,
} from 'src/store/userWordsSlice';
import styles from 'src/containers/DifficultWords/DifficultWords.module.scss';
import DifficultWord from './DifficultWord/DifficultWord';

const DifficultWords = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const difficultWords = useAppSelector(getDifficultWords);
  const empty = useAppSelector(difficultSectionIsEmpty);

  useEffect(() => {
    if (loading || empty) return;
    if (difficultWords.length === 0) dispatch(fetchGetAllDiffWords(getUserId(), getUserToken()));
  }, [dispatch, difficultWords, loading, empty]);

  if (empty) return <h1 className={styles.empty}>В данном разделе пока нет слов</h1>;

  return (
    <div className={styles.wrapper}>
      {loading && difficultWords.length === 0 ? (
        <Loading />
      ) : (
        difficultWords.map((word) => <DifficultWord key={word._id} word={word} />)
      )}
    </div>
  );
};

export default DifficultWords;
