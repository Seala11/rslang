/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchWordsArr,
  fetchisLoading,
  fetchUserWordsArr,
  updateGroup,
} from 'src/store/audioSlice';
import Loading from 'src/components/Loading';
import Levels from 'src/containers/Levels';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { getUserData } from 'src/store/userSlice';
import AudioGame from '../../containers/AudioGame/AudioGame';

const Audio = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const loading = useAppSelector(fetchisLoading);
  const [page, setPage] = useState('main');

  const setWords = async (group: number) => {
    dispatch(updateGroup(group));

    if (!loading) {
      setPage('loading');
      const randomPage = Math.floor(Math.random() * 30);

      if (userIsLogged(userData?.message)) {
        await dispatch(fetchUserWordsArr(getUserId(), getUserToken(), `${group}`, `${randomPage}`));
      } else {
        await dispatch(fetchWordsArr(`${group}`, `${randomPage}`));
      }
    }

    setPage('game');
  };

  return page === 'main' ? (
    <Levels onStartClick={setWords} title='Аудиовызов' />
  ) : page === 'loading' ? (
    <Loading />
  ) : (
    <AudioGame setPage={setPage} onStartClick={setWords} />
  );
};

export default Audio;
