import React from 'react';
import SprintGame from 'src/containers/SprintGame';
import { useAppSelector } from 'src/store/hooks';
import { selectWords } from 'src/store/sprintSlice';
import Levels from '../../containers/Levels';

const Sprint = () => {
  const words = useAppSelector(selectWords);

  return words.length ? <SprintGame /> : <Levels />;
};

export default Sprint;
