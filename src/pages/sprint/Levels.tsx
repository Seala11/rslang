import React, { useState } from 'react';
import LayoutMain from 'src/containers/LayoutMain';
import styles from './Levels.module.scss';

const GROUPS = [
  { id: 1, level: 'Level 1', description: 'Easy' },
  { id: 2, level: 'Level 2', description: 'Easy' },
  { id: 3, level: 'Level 3', description: 'Medium' },
  { id: 4, level: 'Level 4', description: 'Medium' },
  { id: 5, level: 'Level 5', description: 'Hard' },
  { id: 6, level: 'Level 6', description: 'Hard' },
];

interface ILevels {
  onStartClick: (id: number) => void;
}

const Levels: React.FC<ILevels> = ({ onStartClick }) => {
  const [groupId, setGroupId] = useState(0);

  const handleGroupClick = (id: number) => {
    setGroupId(id);
  };

  return (
    <LayoutMain>
      <div>
        <h1 className={styles.title}>Спринт</h1>
        <span className={styles.caption}>Выберите сложность игры</span>
        <div className={styles.groups}>
          {GROUPS.map((value, i) => (
            <button
              className={`${i === groupId ? styles.active : ''} ${styles.btn}`}
              type='button'
              onClick={() => handleGroupClick(i)}
              key={value.id}
            >
              <span className={styles.level}>{value.level}</span>
              <h3 className={styles.title}>{value.description}</h3>
            </button>
          ))}
        </div>
        <div className={styles.start}>
          <button className={styles.btn} type='button' onClick={() => onStartClick(groupId)}>
            Старт
          </button>
        </div>
      </div>
    </LayoutMain>
  );
};

export default Levels;
