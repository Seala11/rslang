import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { removeWords, selectWords } from 'src/store/sprintSlice';
import Result from 'src/components/Result';
import { ISprintWord } from 'src/store/types';
import { adaptToServerSprintWords } from 'src/helpers/utils';
import styles from './SprintGame.module.scss';

const SECONDS = 60;
const audioCorrect = new Audio('/audio/correct.mp3');
const audioWrong = new Audio('/audio/wrong.mp3');

interface ISprintGameProps {
  onStartClick: (id: number) => void;
}

const SprintGame: React.FC<ISprintGameProps> = ({ onStartClick }) => {
  const words = useAppSelector(selectWords);
  const group = useAppSelector((state) => state.sprint.group);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState({ value: 0, weight: 1 });
  const [progress, setProgress] = useState(0);
  const [finishGame, setFinishGame] = useState(false);
  const [rightAnswers, setRightAnswers] = useState<ISprintWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<ISprintWord[]>([]);
  const [time, setTime] = useState(SECONDS);
  const [isMuted, setIsMuted] = useState(false);
  const [strike, setStrike] = useState({ value: 0, temp: 0 });

  const handleAnswerClick = useCallback(
    (choice: number) => {
      if (words[step].choice === choice) {
        audioCorrect.pause();
        audioCorrect.currentTime = 0;
        audioCorrect.play().catch((error) => error);

        setStrike((prev) => ({ ...prev, temp: prev.temp + 1 }));

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

        setStrike((prev) => ({ value: Math.max(prev.value, prev.temp), temp: 0 }));
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
      setIsMuted(false);
    } else {
      audioCorrect.muted = true;
      audioWrong.muted = true;
      setIsMuted(true);
    }
  };

  const handleGameClose = () => {
    dispatch(removeWords());
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => err);
    }
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

  const GameResult = useMemo(
    () => (
      <Result
        rightAnswers={adaptToServerSprintWords(rightAnswers)}
        wrongAnswers={adaptToServerSprintWords(wrongAnswers)}
        onPlayAgain={() => onStartClick(group)}
        strike={strike.value}
      />
    ),
    [group, onStartClick, rightAnswers, strike.value, wrongAnswers]
  );

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h1 className={styles.title}>Спринт</h1>
        <div className={styles.controlls}>
          <button className={styles.control} type='button' onClick={handleGameClose}>
            <img src='/assets/icons/close.png' alt='close' />
          </button>
          <button className={styles.control} type='button' onClick={handleSoundToggle}>
            {isMuted ? (
              <svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.63 0.2925C0.24 0.6825 0.24 1.3125 0.63 1.7025L4.29 5.3625L4 5.6625H1C0.45 5.6625 0 6.1125 0 6.6625V10.6625C0 11.2125 0.45 11.6625 1 11.6625H4L7.29 14.9525C7.92 15.5825 9 15.1325 9 14.2425V10.0725L13.18 14.2525C12.69 14.6225 12.16 14.9325 11.58 15.1625C11.22 15.3125 11 15.6925 11 16.0825C11 16.8025 11.73 17.2625 12.39 16.9925C13.19 16.6625 13.94 16.2225 14.61 15.6825L15.95 17.0225C16.34 17.4125 16.97 17.4125 17.36 17.0225C17.75 16.6325 17.75 16.0025 17.36 15.6125L2.05 0.2925C1.66 -0.0975 1.03 -0.0975 0.63 0.2925ZM16 8.6625C16 9.4825 15.85 10.2725 15.59 11.0025L17.12 12.5325C17.68 11.3625 18 10.0525 18 8.6625C18 4.8325 15.6 1.5525 12.22 0.2625C11.63 0.0324998 11 0.4925 11 1.1225V1.3125C11 1.6925 11.25 2.0225 11.61 2.1625C14.18 3.2025 16 5.7225 16 8.6625ZM7.29 2.3725L7.12 2.5425L9 4.4225V3.0725C9 2.1825 7.92 1.7425 7.29 2.3725ZM13.5 8.6625C13.5 6.8925 12.48 5.3725 11 4.6325V6.4225L13.48 8.9025C13.49 8.8225 13.5 8.7425 13.5 8.6625Z'
                  fill='#6A6D9E'
                />
              </svg>
            ) : (
              <svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 6.99996V11C0 11.55 0.45 12 1 12H4L7.29 15.29C7.92 15.92 9 15.47 9 14.58V3.40996C9 2.51996 7.92 2.06996 7.29 2.69996L4 5.99996H1C0.45 5.99996 0 6.44996 0 6.99996ZM13.5 8.99996C13.5 7.22996 12.48 5.70996 11 4.96996V13.02C12.48 12.29 13.5 10.77 13.5 8.99996ZM11 1.44996V1.64996C11 2.02996 11.25 2.35996 11.6 2.49996C14.18 3.52996 16 6.05996 16 8.99996C16 11.94 14.18 14.47 11.6 15.5C11.24 15.64 11 15.97 11 16.35V16.55C11 17.18 11.63 17.62 12.21 17.4C15.6 16.11 18 12.84 18 8.99996C18 5.15996 15.6 1.88996 12.21 0.599963C11.63 0.369963 11 0.819963 11 1.44996Z'
                  fill='#6A6D9E'
                />
              </svg>
            )}
          </button>
          <button className={styles.control} type='button' onClick={handleFullScreen}>
            <img src='/assets/icons/screen.png' alt='screen' />
          </button>
        </div>
        {finishGame || step >= words.length ? GameResult : GameProccess}
      </div>
    </div>
  );
};

export default SprintGame;
