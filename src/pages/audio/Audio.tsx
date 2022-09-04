/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchWordsArr, fetchisLoading } from 'src/store/audioSlice';
import Loading from 'src/components/Loading';
import Levels from 'src/containers/Levels';
import AudioGame from '../../containers/AudioGame/AudioGame';

const Audio = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState('main');
  const loading = useAppSelector(fetchisLoading);

  const setWords = async (group: number) => {
    if (!loading) {
      setPage('loading');
      const randomPage = Math.floor(Math.random() * 30);
      await dispatch(fetchWordsArr(`${group}`, `${randomPage}`));
    }
    setPage('game');
  };

  return page === 'main' ? (
    <Levels onStartClick={setWords} title='Аудиовызов' />
  ) : page === 'loading' ? (
    <Loading />
  ) : (
    <AudioGame setPage={setPage} />
  );
};

export default Audio;
