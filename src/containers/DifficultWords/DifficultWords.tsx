/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Loading from 'src/components/Loading';
import { fetchGetAllDiffWords, getDifficultWords } from 'src/store/userWordsSlice';
import styles from 'src/containers/DifficultWords/DifficultWords.module.scss';
import DifficultWord from './DifficultWord/DifficultWord';

const DifficultWords = () => {
  const dispatch = useAppDispatch();
  const difficultWords = useAppSelector(getDifficultWords);

  useEffect(() => {
    if (difficultWords.length === 0) dispatch(fetchGetAllDiffWords(getUserId(), getUserToken()));
  }, [dispatch, difficultWords]);

  return (
    <div className={styles.wrapper}>
      {difficultWords.length > 0 ? (
        difficultWords.map((word) => <DifficultWord key={word._id} word={word} />)
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DifficultWords;
