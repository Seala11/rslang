import React, { useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectWords } from 'src/store/sprintSlice';
import Timer from 'src/containers/SprintGame/Timer';
import Result from 'src/containers/SprintGame/Result';
import styles from './SprintGame.module.scss';

const SECONDS = 30;

const SprintGame = () => {
  const words = useAppSelector(selectWords);
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState({ value: 0, weight: 1 });
  const [progress, setProgress] = useState(0);
  const [finishGame, setFinishGame] = useState(false);

  const handleAnswerClick = (choice: number) => {
    if (words[step].choice === choice) {
      if (progress === 3) {
        setProgress(0);

        if (points.weight !== 8) setPoints((prev) => ({ ...prev, weight: prev.weight * 2 }));
      } else {
        setProgress((prev) => prev + 1);
      }
      setPoints((prev) => ({ ...prev, value: prev.value + 10 * prev.weight }));
    } else {
      setProgress(0);
      setPoints((prev) => ({ ...prev, weight: 1 }));
    }

    setStep((prev) => prev + 1);
  };

  const handleTimerFinish = () => {
    setFinishGame(true);
  };

  return (
    <div>
      <div className={styles.controlls}>
        <button className={styles.btn} type='button'>
          close
        </button>
        <button className={styles.btn} type='button'>
          sound
        </button>
        <button className={styles.btn} type='button'>
          fullscreen
        </button>
      </div>
      {finishGame ? (
        <Result />
      ) : (
        <div className={styles.proccess}>
          <div className={styles.shape}>
            <div className={styles.points}>
              <span>Очки: {points.value}</span>
              <span>Weight: x{points.weight}</span>
              <span>Прогресс: {progress}</span>
            </div>
            <div className={styles.words}>
              <span>{words[step].word}</span>
              <span>
                {words[step].choice ? words[step].wordTranslate : words[step].wrongTranslate}
              </span>
            </div>
            <div>
              <button
                className={`${words[step].choice === 1 ? styles.active : ''} ${styles.btn}`}
                type='button'
                onClick={() => handleAnswerClick(1)}
              >
                верно
              </button>
              <button
                className={`${words[step].choice === 0 ? styles.active : ''} ${styles.btn}`}
                type='button'
                onClick={() => handleAnswerClick(0)}
              >
                неверно
              </button>
            </div>
          </div>
          <div className={styles.timer}>
            <Timer onTimerFinish={handleTimerFinish} seconds={SECONDS} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintGame;
