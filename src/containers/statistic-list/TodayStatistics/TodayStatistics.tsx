/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { fetchGetTodayStatistics, getStatistics } from 'src/store/statisticsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IDayStatistic, IGameStatistics } from 'src/requests/interfaceAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import styles from 'src/containers/statistic-list/TodayStatistics/TodayStatistics.module.scss';
import Loading from 'src/components/Loading';

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
    <div className={styles.statistics}>
      <p className={styles.today}>Сегодня</p>
      <p className={styles.today}>1. в краткосрочной статистике по словам указываются:</p>

      <p>
        1.1. количество новых слов за день
        <span className={styles.number}>
          {todayStatistic.audio.new + todayStatistic.sprint.new}
        </span>
      </p>

      <p>
        1.2. количество изученных слов за день
        <span className={styles.number}>
          {todayStatistic.audio.learned + todayStatistic.sprint.learned + todayStatistic.textbook}
        </span>
      </p>

      <p>
        1.3. процент правильных ответов за день
        <span className={styles.number}>
          {Math.floor(
            ((todayStatistic.audio.right + todayStatistic.sprint.right) /
              (todayStatistic.audio.right +
                todayStatistic.sprint.right +
                todayStatistic.sprint.wrong +
                todayStatistic.audio.wrong)) *
              100
          )}
          %
        </span>
      </p>

      <p className={styles.today}>2. Sprint</p>
      <p>
        2.1. количество новых слов за день
        <span className={styles.number}>{todayStatistic.sprint.new}</span>
      </p>

      <p>
        2.2. процент правильных ответов
        <span className={styles.number}>
          {Math.floor(
            (todayStatistic.sprint.right /
              (todayStatistic.sprint.right + todayStatistic.sprint.wrong)) *
              100
          )}
          %
        </span>
      </p>

      <p>
        2.3. самая длинная серия правильных ответов
        <span className={styles.number}>{todayStatistic.sprint.strike}</span>
      </p>

      <p className={styles.today}>3. Audio</p>
      <p>
        3.1. количество новых слов за день
        <span className={styles.number}>{todayStatistic.audio.new}</span>
      </p>

      <p>
        3.2. процент правильных ответов
        <span className={styles.number}>
          {Math.floor(
            (todayStatistic.audio.right /
              (todayStatistic.audio.right + todayStatistic.audio.wrong)) *
              100
          )}
          %
        </span>
      </p>

      <p>
        3.3. самая длинная серия правильных ответов
        <span className={styles.number}>{todayStatistic.audio.strike}</span>
      </p>
    </div>
  );
};

export default TodayStatistics;
