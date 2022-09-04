import React, { useState } from 'react';
import LayoutMain from 'src/containers/LayoutMain';
import GROUPS from 'src/data/groups';
import styles from './Levels.module.scss';

interface ILevelsProps {
  onStartClick: (id: number) => void;
  title: string;
}

const Levels: React.FC<ILevelsProps> = ({ onStartClick, title }) => {
  const [groupId, setGroupId] = useState(0);

  const handleGroupClick = (id: number) => {
    setGroupId(id);
  };

  return (
    <LayoutMain>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subtitle}>Выберите сложность игры</h3>
        <div className={styles.cards}>
          {GROUPS.map((value, i) => (
            <button
              className={`${i === groupId ? styles.active : ''} ${styles.btn}`}
              type='button'
              key={value.id}
              onClick={() => handleGroupClick(i)}
            >
              <span className={styles.level}>{value.level}</span>
              <h3 className={styles.titleCard}>{value.description}</h3>
            </button>
          ))}
        </div>
        <button className={styles.start} type='button' onClick={() => onStartClick(groupId)}>
          Старт
        </button>
      </div>
    </LayoutMain>
  );
};

export default Levels;
