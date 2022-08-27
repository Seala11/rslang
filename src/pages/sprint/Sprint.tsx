import React from 'react';
import SprintGame from 'src/containers/SprintGame';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchWords, selectWords } from 'src/store/sprintSlice';
import Levels from './Levels';

const Sprint = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const handleStartClick = async (groupId: number) => {
    dispatch(fetchWords(`${groupId}`, `${Math.floor(Math.random() * 30)}`));
  };

  return words.length ? <SprintGame /> : <Levels onStartClick={handleStartClick} />;
};

export default Sprint;
