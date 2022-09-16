import React, { useState } from 'react';
import Loading from 'src/components/Loading';
import SprintGame from 'src/containers/SprintGame';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGroupUserWords,
  fetchGroupWords,
  selectWords,
  updateGroup,
} from 'src/store/sprintSlice';
import { getUserData } from 'src/store/userSlice';
import Levels from '../../containers/Levels';

const Sprint = () => {
  const words = useAppSelector(selectWords);
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleStartClick = async (id: number) => {
    setLoading(true);

    dispatch(updateGroup(id));

    if (userIsLogged(userData?.message)) {
      await dispatch(fetchGroupUserWords(getUserId(), getUserToken(), `${id}`));
    } else {
      await dispatch(fetchGroupWords(`${id}`));
    }

    setLoading(false);
  };

  const Game = words.length ? (
    <SprintGame onStartClick={handleStartClick} />
  ) : (
    <Levels onStartClick={handleStartClick} title='Спринт' />
  );

  return loading ? <Loading /> : Game;
};

export default Sprint;
