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
    // TODO: check if we need to refresh if word details changes
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
    // if (wordDetails?.userWord?.optional.audio) {
    //     setAudioAnswers({
    //       right: wordDetails?.userWord?.optional.audio.right,
    //       wrong: wordDetails?.userWord?.optional.audio.wrong,
    //     });
    //   }
    // if (wordDetails?.userWord?.optional.sprint) {
    //     setSprintAnswers({
    //       right: wordDetails?.userWord?.optional.sprint.right,
    //       wrong: wordDetails?.userWord?.optional.sprint.wrong,
    //     });
    //   }
  }, [word, wordDetails]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Статистика</p>
      <div className={styles.game}>
        <p className={styles.subtitle}>Аудиовызов</p>
        <div className={styles.statistic}>
          <p className={styles.statistic_title}>Правильных ответов:</p>
          <span>{audioAnswers.right}</span>
        </div>
        <div className={styles.statistic}>
          <p className={styles.statistic_title}>Неправильных ответов:</p>
          <span>{audioAnswers.wrong}</span>
        </div>
      </div>

      <div>
        <p className={styles.subtitle}>Спринт</p>
        <div className={styles.statistic}>
          <p className={styles.statistic_title}>Правильных ответов:</p>
          <span>{sprintAnswers.right}</span>
        </div>
        <div className={styles.statistic}>
          <p className={styles.statistic_title}>Неправильных ответов:</p>
          <span>{sprintAnswers.wrong}</span>
        </div>
      </div>
    </div>
  );
};

export default WordStatistic;
