import React from 'react';
import Image from 'src/components/Image';
import styles from 'src/containers/statistic-list/GameStatistics/GameStatistics.module.scss';
import { IGameStatisticsProps } from './IGameStatisticsProps';

const GameStatistics: React.FC<IGameStatisticsProps> = ({
  name,
  newWords,
  rigthAnswers,
  strike,
}) => {
  const url = name === 'Спринт' ? '/assets/images/sprint.png' : '/assets/images/audio.png';

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Image {...{ altImg: name, srcImg: url, className: `${styles.image}` }} />
        <p className={styles.today}>{name}</p>
      </div>

      <div className={styles.item}>
        <span className={styles.number}>{newWords}</span>
        <p>Новых слов</p>
      </div>

      <div className={styles.item}>
        <span className={styles.number}>{rigthAnswers}%</span>
        <p>Правильных ответов</p>
      </div>

      <div className={styles.item}>
        <span className={styles.number}>{strike}</span>
        <p>Самая длинная серия правильных ответов</p>
      </div>
    </div>
  );
};

export default GameStatistics;
