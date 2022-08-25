/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { fetchWords } from 'src/store/sprintSlice';
import styles from './Sprint.module.scss';

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

  const onGroupClick = (idGroup: number) => {
    dispath(fetchWords(`${idGroup}`, `1`));
  };

  return (
    <div>
      <h1 className={styles.title}>Спринт</h1>
      <span className={styles.caption}>Выберите сложность игры</span>
      <div className={styles.groups}>
        {GROUPS.map((value, i) => (
          <button
            className={`${styles.btn}`}
            type='button'
            onClick={() => onGroupClick(i)}
            key={value.id}
          >
            <span className={styles.level}>{value.level}</span>
            <h3 className={styles.title}>{value.description}</h3>
          </button>
        ))}
      </div>
      <div className={styles.start}>
        <button className={styles.btn} type='button'>
          Старт
        </button>
      </div>
    </div>
  );
};

export default Sprint;
