import React, { useState } from 'react';
import LayoutMain from 'src/containers/LayoutMain';
import GROUPS from 'src/data/groups';
import styles from './Levels.module.scss';

interface ILevelsProps {
  onStartClick: (id: number) => void;
}

const Levels: React.FC<ILevelsProps> = ({ onStartClick }) => {
  const [groupId, setGroupId] = useState(0);

  const handleGroupClick = (id: number) => {
    setGroupId(id);
  };

  return (
    // <LayoutMain>
    //   <div>
    //     <h1 className={styles.title}>Спринт</h1>
    //     <span className={styles.caption}>Выберите сложность игры</span>
    //     <div className={styles.groups}>
    //       {GROUPS.map((value, i) => (
    //         <button
    //           className={`${i === groupId ? styles.active : ''} ${styles.btn}`}
    //           type='button'
    //           onClick={() => handleGroupClick(i)}
    //           key={value.id}
    //         >
    //           <span className={styles.level}>{value.level}</span>
    //           <h3 className={styles.title}>{value.description}</h3>
    //         </button>
    //       ))}
    //     </div>
    //     <div className={styles.start}>
    //       <button className={styles.btn} type='button' onClick={() => onStartClick(groupId)}>
    //         Старт
    //       </button>
    //     </div>
    //   </div>
    // </LayoutMain>
    <LayoutMain>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Спринт</h2>
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
