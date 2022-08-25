/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchWords } from 'src/store/sprintSlice';

const GROUPS = [
  { id: 1, level: 'Level 1', description: 'Easy' },
  { id: 2, level: 'Level 2', description: 'Easy' },
  { id: 3, level: 'Level 3', description: 'Medium' },
  { id: 4, level: 'Level 4', description: 'Medium' },
  { id: 5, level: 'Level 5', description: 'Hard' },
  { id: 6, level: 'Level 6', description: 'Hard' },
];

const Sprint = () => {
  const dispath = useAppDispatch();

  const clickHandler = () => {
    dispath(fetchWords(`1`, `1`));
  };

  return (
    <div>
      {GROUPS.map((value) => (
        <div>
          <span>{value.level}</span>
          <span>{value.description}</span>
        </div>
      ))}
    </div>
  );
};

export default Sprint;
