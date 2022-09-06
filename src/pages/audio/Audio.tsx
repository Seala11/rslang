/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchWordsArr,
  fetchUserWordsArr,
  updateGroup,
  selectwordsArr,
} from 'src/store/audioSlice';
import Loading from 'src/components/Loading';
import Levels from 'src/containers/Levels';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { getUserData } from 'src/store/userSlice';
import AudioGame from '../../containers/AudioGame/AudioGame';

const Audio = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const wordsArr = useAppSelector(selectwordsArr);
  const [loading, setLoading] = useState(false);

  const setWords = async (group: number) => {
    setLoading(true);

    dispatch(updateGroup(group));

    const randomPage = Math.floor(Math.random() * 30);

    if (userIsLogged(userData?.message)) {
      await dispatch(fetchUserWordsArr(getUserId(), getUserToken(), `${group}`, `${randomPage}`));
    } else {
      await dispatch(fetchWordsArr(`${group}`, `${randomPage}`));
    }

    setLoading(false);
  };

  const Game = wordsArr.length ? (
    <AudioGame onStartClick={setWords} />
  ) : (
    <Levels onStartClick={setWords} title='Аудиовызов' />
  );

  return loading ? <Loading /> : Game;
};

export default Audio;
