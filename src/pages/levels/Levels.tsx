import React, { useState, useEffect } from 'react';
import styles from 'src/pages/levels/Levels.module.scss';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCurrentPageWords } from 'src/store/audioSlice';
import Audio from '../audio/Audio';

const levels = [
  { id: 1, level: 'Level 1', description: 'Easy' },
  { id: 2, level: 'Level 2', description: 'Easy' },
  { id: 3, level: 'Level 3', description: 'Medium' },
  { id: 4, level: 'Level 4', description: 'Medium' },
  { id: 5, level: 'Level 5', description: 'Hard' },
  { id: 6, level: 'Level 6', description: 'Hard' },
];

const Levels: React.FC<{ game: string }> = ({ game }) => {
  const dispatch = useAppDispatch();
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState('main');

  useEffect(() => {
    dispatch(fetchCurrentPageWords(`${group}`, `${0}`));
  }, [dispatch, group]);

  return page === 'main' ? (
    <main className='main'>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{game}</h2>
        <h3 className={styles.subtitle}>Выберите сложность игры</h3>
        <div className={styles.cards}>
          {levels.map((value, i) => (
            <button
              className={`${i === group ? styles.active : ''} ${styles.btn}`}
              type='button'
              key={value.id}
              onClick={() => setGroup(i)}
            >
              <span className={styles.level}>{value.level}</span>
              <h3 className={styles.titleCard}>{value.description}</h3>
            </button>
          ))}
        </div>
        <button onClick={() => setPage('game')} className={styles.start} type='button'>
          Старт
        </button>
      </div>
    </main>
  ) : (
    <Audio />
  );
};

export default Levels;
