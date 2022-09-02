import React, { useEffect, useState } from 'react';
import styles from 'src/containers/word-list/WordStatistic/WordStatistic.module.scss';
import { useAppSelector } from 'src/store/hooks';
import { selectWordDetails } from 'src/store/wordsSlice';
import { IWordStatisticProps } from './IWordStatisticProps';

const WordStatistic: React.FC<IWordStatisticProps> = ({ word }) => {
  const wordDetails = useAppSelector(selectWordDetails);

  const [audioAnswers, setAudioAnswers] = useState({ right: 0, wrong: 0 });
  const [sprintAnswers, setSprintAnswers] = useState({ right: 0, wrong: 0 });

  useEffect(() => {
    if (word?.userWord?.optional.audio) {
      setAudioAnswers({
        right: word?.userWord?.optional.audio.right,
        wrong: word?.userWord?.optional.audio.wrong,
      });
    }
    if (word?.userWord?.optional.sprint) {
      setSprintAnswers({
        right: word?.userWord?.optional.sprint.right,
        wrong: word?.userWord?.optional.sprint.wrong,
      });
    }
    if (!word?.userWord) {
      setSprintAnswers({
        right: 0,
        wrong: 0,
      });
      setAudioAnswers({
        right: 0,
        wrong: 0,
      });
    }
  }, [word, wordDetails]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Статистика по играм</p>
      <div className={styles.game}>
        <p className={styles.subtitle}>Аудиовызов</p>
        <div className={styles.statistic}>
          <div className={`${styles.statistic_answer} ${styles.right}`}>
            <div className={styles.point} />
            <span>{audioAnswers.right}</span>
          </div>
          <div className={`${styles.statistic_answer} ${styles.wrong}`}>
            <div className={styles.cross} />
            <span>{audioAnswers.wrong}</span>
          </div>
        </div>
      </div>

      <div className={styles.game}>
        <p className={styles.subtitle}>Спринт</p>
        <div className={styles.statistic}>
          <div className={`${styles.statistic_answer} ${styles.right}`}>
            <div className={styles.point} />
            <span>{sprintAnswers.right}</span>
          </div>
          <div className={`${styles.statistic_answer} ${styles.wrong}`}>
            <div className={styles.cross} />
            <span>{sprintAnswers.wrong}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordStatistic;
