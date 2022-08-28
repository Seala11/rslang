/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectWords } from 'src/store/sprintSlice';
import Timer from 'src/containers/SprintGame/Timer';
import Result from 'src/containers/SprintGame/Result';
import { ISprintWord } from 'src/store/types';
import styles from './SprintGame.module.scss';

const SECONDS = 30;
const audioCorrect = new Audio('/audio/correct.mp3');
const audioWrong = new Audio('/audio/wrong.mp3');

export interface ISprintGameProps {
  onGameClose: () => void;
}

const SprintGame: React.FC<ISprintGameProps> = ({ onGameClose }) => {
  const words = useAppSelector(selectWords);
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState({ value: 0, weight: 1 });
  const [progress, setProgress] = useState(0);
  const [finishGame, setFinishGame] = useState(false);
  const [rightAnswers, setRightAnswers] = useState<ISprintWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<ISprintWord[]>([]);

  const handleAnswerClick = useCallback(
    (choice: number) => {
      if (words[step].choice === choice) {
        audioCorrect.pause();
        audioCorrect.currentTime = 0;
        audioCorrect.play().catch((error) => error);

        if (progress === 3) {
          setProgress(0);

          if (points.weight !== 8) setPoints((prev) => ({ ...prev, weight: prev.weight * 2 }));
        } else {
          setProgress((prev) => prev + 1);
        }
        setPoints((prev) => ({ ...prev, value: prev.value + 10 * prev.weight }));
        setRightAnswers((prev) => [...prev, words[step]]);
      } else {
        audioWrong.pause();
        audioWrong.currentTime = 0;
        audioWrong.play().catch((error) => error);

        setProgress(0);
        setPoints((prev) => ({ ...prev, weight: 1 }));
        setWrongAnswers((prev) => [...prev, words[step]]);
      }

      setStep((prev) => prev + 1);
    },
    [points.weight, progress, step, words]
  );

  useEffect(() => {
    const handleAnswerKeyup = (e: KeyboardEvent) => {
      const { code } = e;

      if (code === 'ArrowLeft') {
        handleAnswerClick(1);
      } else if (code === 'ArrowRight') {
        handleAnswerClick(0);
      }
    };

    document.addEventListener('keyup', handleAnswerKeyup);

    if (finishGame || step >= words.length) {
      document.removeEventListener('keyup', handleAnswerKeyup);
    }

    return () => {
      document.removeEventListener('keyup', handleAnswerKeyup);
    };
  }, [finishGame, handleAnswerClick, step, words.length]);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => err);
    } else {
      document.documentElement.requestFullscreen().catch((err) => err);
    }
  };

  const handleTimerFinish = () => {
    setFinishGame(true);
  };

  const handleSoundToggle = () => {
    if (audioCorrect.muted) {
      audioCorrect.muted = false;
      audioWrong.muted = false;
    } else {
      audioCorrect.muted = true;
      audioWrong.muted = true;
    }
  };

  const handlePlayAgain = () => {
    setStep(0);
    setPoints({ value: 0, weight: 1 });
    setProgress(0);
    setFinishGame(false);
    setRightAnswers([]);
    setWrongAnswers([]);
  };

  const GameProccess = (
    <div className={styles.proccess}>
      <div className={styles.shape}>
        <div className={styles.points}>
          <span>Очки: {points.value}</span>
          <span>Weight: x{points.weight}</span>
          <span>Прогресс: {progress}</span>
        </div>
        <div className={styles.words}>
          <span>{words[step]?.word}</span>
          <span>
            {words[step]?.choice ? words[step]?.wordTranslate : words[step]?.wrongTranslate}
          </span>
        </div>
        <div>
          <button
            className={`${words[step]?.choice === 1 ? styles.active : ''} ${styles.btn}`}
            type='button'
            onClick={() => handleAnswerClick(1)}
          >
            верно
          </button>
          <button
            className={`${words[step]?.choice === 0 ? styles.active : ''} ${styles.btn}`}
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
  );

  return (
    <div>
      <div className={styles.controlls}>
        <button className={styles.btn} type='button' onClick={onGameClose}>
          close
        </button>
        <button className={styles.btn} type='button' onClick={handleSoundToggle}>
          sound
        </button>
        <button className={styles.btn} type='button' onClick={handleFullScreen}>
          fullscreen
        </button>
      </div>

      {finishGame || step >= words.length ? (
        <Result
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          onPlayAgain={handlePlayAgain}
        />
      ) : (
        GameProccess
      )}
    </div>
  );
};

export default SprintGame;
