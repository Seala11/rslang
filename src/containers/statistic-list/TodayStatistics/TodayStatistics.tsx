/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { fetchGetTodayStatistics, getStatistics } from 'src/store/statisticsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IDayStatistic, IGameStatistics } from 'src/requests/interfaceAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import styles from 'src/containers/statistic-list/TodayStatistics/TodayStatistics.module.scss';
import Loading from 'src/components/Loading';
import GameStatistics from '../GameStatistics';

const TodayStatistics = () => {
  const dispatch = useAppDispatch();
  const userStatistics = useAppSelector(getStatistics);
  const [todayStatistic, setTodayStatistic] = useState<IGameStatistics | null>(null);

  useEffect(() => {
    const currentDay = new Date();
    const date: keyof IDayStatistic = new Intl.DateTimeFormat('en-GB').format(currentDay);
    console.log(date);
    console.log(userStatistics);
    if (!userStatistics || !userStatistics.optional[date]) {
      console.log('should update redux');
      dispatch(fetchGetTodayStatistics(getUserId(), getUserToken()));
    } else {
      setTodayStatistic(userStatistics.optional[date]);
    }
    console.log(todayStatistic);
  }, [userStatistics, dispatch, todayStatistic]);

  if (!todayStatistic) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.today}>Сегодня</p>
      <div className={styles.statistics}>
        <div className={styles.general_wrapper}>
          <div className={styles.item}>
            <p className={styles.item_subtitle}>Изучено слов</p>
            <p className={styles.number}>
              {todayStatistic.audio.learned +
                todayStatistic.sprint.learned +
                todayStatistic.textbook}
            </p>
          </div>

          <div className={`${styles.item} ${styles.border}`}>
            <p className={styles.item_subtitle}>Новых слов</p>
            <p className={styles.number}>{todayStatistic.audio.new + todayStatistic.sprint.new}</p>
          </div>

          <div className={styles.item}>
            <p className={styles.item_subtitle}>Правильных ответов</p>
            <p className={styles.number}>
              {Math.floor(
                ((todayStatistic.audio.right + todayStatistic.sprint.right) /
                  (todayStatistic.audio.right +
                    todayStatistic.sprint.right +
                    todayStatistic.sprint.wrong +
                    todayStatistic.audio.wrong)) *
                  100
              )}
              %
            </p>
          </div>
        </div>

        <div className={styles.game_wrapper}>
          <GameStatistics
            name='Спринт'
            newWords={todayStatistic.sprint.new}
            rigthAnswers={Math.floor(
              (todayStatistic.sprint.right /
                (todayStatistic.sprint.right + todayStatistic.sprint.wrong)) *
                100
            )}
            strike={todayStatistic.sprint.strike}
          />

          <GameStatistics
            name='Аудиовызов'
            newWords={todayStatistic.audio.new}
            rigthAnswers={Math.floor(
              (todayStatistic.audio.right /
                (todayStatistic.audio.right + todayStatistic.audio.wrong)) *
                100
            )}
            strike={todayStatistic.audio.strike}
          />
        </div>
      </div>
    </div>
  );
};

export default TodayStatistics;
