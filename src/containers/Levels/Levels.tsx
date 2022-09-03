import React, { useState } from 'react';
import Loading from 'src/components/Loading';
import LayoutMain from 'src/containers/LayoutMain';
import GROUPS from 'src/data/groups';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchUserWords, fetchWords } from 'src/store/sprintSlice';
import { getUserData } from 'src/store/userSlice';
import styles from './Levels.module.scss';

const Levels = () => {
  const [groupId, setGroupId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const handleGroupClick = (id: number) => {
    setGroupId(id);
  };

  const handleStartClick = async (id: number) => {
    setLoading(true);
    if (userIsLogged(userData?.message)) {
      await dispatch(
        fetchUserWords(getUserId(), getUserToken(), `${id}`, `${Math.floor(Math.random() * 30)}`)
      );
    } else {
      await dispatch(fetchWords(`${id}`, `${Math.floor(Math.random() * 30)}`));
    }
    setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
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
          <button className={styles.start} type='button' onClick={() => handleStartClick(groupId)}>
            Старт
          </button>
        </div>
      )}
    </LayoutMain>
  );
};

export default Levels;
