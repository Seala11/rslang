/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Loading from 'src/components/Loading';
import { getLoading } from 'src/store/wordsSlice';
import {
  difficultSectionIsEmpty,
  fetchGetAllDiffWords,
  getDifficultWords,
} from 'src/store/userWordsSlice';
import { Navigate } from 'src/helpers/constants';
import styles from 'src/containers/DifficultWords/DifficultWords.module.scss';
import DifficultWord from './DifficultWord/DifficultWord';
import DiffPagination from './DiffPagination';
import { IPaginationProps } from '../word-list/Pagination/IPaginationProps';


const DifficultWords: React.FC<IPaginationProps> = ({
  unit,
  onPaginationClick,
  onPageNavigate,
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getLoading);
  const difficultWords = useAppSelector(getDifficultWords);
  const empty = useAppSelector(difficultSectionIsEmpty);

  const audio = useRef(new Audio());

  useEffect(() => {
    if (loading || empty) return;
    if (difficultWords.length === 0) dispatch(fetchGetAllDiffWords(getUserId(), getUserToken()));
    if (!difficultWords[unit - 1] && unit > 1) onPageNavigate(Navigate.PREV);
  }, [dispatch, difficultWords, loading, empty, onPageNavigate, unit]);

  if (empty) return <h1 className={styles.empty}>В данном разделе пока нет слов</h1>;

  if (loading && difficultWords.length === 0) {
    return (
      <div className={styles.wrapper}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {difficultWords[unit - 1]
        ? difficultWords[unit - 1].map((word) => (
            <DifficultWord key={word._id} word={word} audio={audio} />
          ))
        : difficultWords[unit - 2] &&
          difficultWords[unit - 2].map((word) => (
            <DifficultWord key={word._id} word={word} audio={audio} />
          ))}
      <DiffPagination
        unit={unit}
        onClick={onPaginationClick}
        onPageNavigate={onPageNavigate}
        words={difficultWords}
      />
    </div>
  );
};

export default DifficultWords;
