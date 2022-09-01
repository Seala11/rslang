import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { selectWords } from 'src/store/sprintSlice';
import Result from 'src/containers/SprintGame/Result';
import { ISprintWord } from 'src/store/types';
import styles from './SprintGame.module.scss';

const SECONDS = 600;
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
  const [time, setTime] = useState(SECONDS);

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

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      } else {
        setFinishGame(true);
      }
    }, 1000);

    return () => clearTimeout(timeId);
  }, [time]);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => err);
    } else {
      document.documentElement.requestFullscreen().catch((err) => err);
    }
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
    setTime(SECONDS);
  };

  const GameProccess = (
    <div className={styles.proccess}>
      <div className={styles.points}>
        <span className={styles.value}>{points.value}</span>
        <span className={styles.weight}>+ {points.weight * 10} очков</span>
        <div className={styles.progress}>
          <i className={`${progress > 0 ? styles.active : ''}`} />
          <i className={`${progress > 1 ? styles.active : ''}`} />
          <i className={`${progress > 2 ? styles.active : ''}`} />
        </div>
      </div>
      <div className={styles.shape}>
        <div className={styles.words}>
          <span className={styles.word}>{words[step]?.word}</span>
          <span className={styles.wordTranslate}>
            {words[step]?.choice ? words[step]?.wordTranslate : words[step]?.wrongTranslate}
          </span>
        </div>
        <div className={styles.btnWrapper}>
          <button
            className={`${words[step]?.choice === 1 ? styles.active : ''} ${styles.btn}`}
            type='button'
            onClick={() => handleAnswerClick(1)}
          >
            верно
          </button>
          <button
            className={`${words[step]?.choice === 0 ? styles.active : ''} ${styles.btnWrong}`}
            type='button'
            onClick={() => handleAnswerClick(0)}
          >
            неверно
          </button>
        </div>
      </div>
      <div className={styles.timerWrapper}>
        <span className={styles.timer}>{time}</span>
      </div>
    </div>
  );

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h1 className={styles.title}>Спринт</h1>
        <div className={styles.controlls}>
          <button className={styles.control} type='button' onClick={onGameClose}>
            <img src='/assets/icons/close.png' alt='close' />
          </button>
          <button className={styles.control} type='button' onClick={handleSoundToggle}>
            <img src='/assets/icons/unmute.png' alt='unmute' />
          </button>
          <button className={styles.control} type='button' onClick={handleFullScreen}>
            <img src='/assets/icons/screen.png' alt='screen' />
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
    </div>
  );
};

export default SprintGame;
