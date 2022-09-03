/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import styles from 'src/pages/audio/Audio.module.scss';
import {
  selectwordsArr,
  isDis,
  addDis,
  getAnswers,
  updateAnswers,
  getQuestion,
  updateQuestion,
} from 'src/store/audioSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { UrlPath } from 'src/helpers/constRequestsAPI';
import { NavLink } from 'react-router-dom';
import { IWord } from 'src/store/types';
import Result from 'src/components/Result';

let audioCounter = 0;
let player: HTMLAudioElement;
const audioCorrect = new Audio('/audio/correct.mp3');
const audioWrong = new Audio('/audio/wrong.mp3');

const AudioGame: React.FC<{ setPage: React.Dispatch<React.SetStateAction<string>> }> = ({
  setPage,
}) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector(isDis);
  const answers = useAppSelector(getAnswers);
  const wordsArr = useAppSelector(selectwordsArr);
  const words = wordsArr.map((item) => item.wordTranslate);
  const question = useAppSelector(getQuestion);
  const [answerStyle, setAnswerStyle] = useState('');
  const [nextBtn, setNextBtn] = useState<'Не знаю' | '➤'>('Не знаю');
  const [result, setResult] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [rightAnswers, setRightAnswers] = useState<IWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [muteStyles, setMuteStyles] = useState('unmute');
  const [strike, setStrike] = useState({ value: 0, temp: 0 });
  const [screenStyles, setScreenStyles] = useState('unfull');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionImg, setQuestionImg] = useState('');
  const [imgSize, setImgSize] = useState<'50%' | 'cover'>('50%');

  function collectAnswers() {
    const set: Set<string> = new Set();
    set.add(words[question]);
    while (set.size < 5) {
      set.add(words[Math.floor(Math.random() * 20)]);
    }
    const arr = Array.from(set);
    const res: Set<string> = new Set();
    while (res.size < 5) {
      res.add(arr[Math.floor(Math.random() * 5)]);
    }
    dispatch(updateAnswers(Array.from(res)));
  }

  function displayCorrectAnswer(e: EventTarget) {
    const targetElem = e as HTMLButtonElement;
    if (targetElem.textContent === wordsArr[question].wordTranslate) {
      targetElem.style.color = 'green';
      audioCorrect.muted = isMute;
      audioCorrect.play();
      setRightAnswers((prev) => [...prev, wordsArr[question]]);
      setStrike((prev) => ({ ...prev, temp: prev.temp + 1 }));
    } else {
      targetElem.style.color = 'red';
      targetElem.style.textDecoration = 'line-through';
      setAnswerStyle(styles.correct);
      audioWrong.muted = isMute;
      audioWrong.play();
      setWrongAnswers((prev) => [...prev, wordsArr[question]]);
      setStrike((prev) => ({ value: Math.max(prev.value, prev.temp), temp: 0 }));
    }
    dispatch(addDis(true));
    setQuestionTitle(words[question]);
    setQuestionImg(`url(${UrlPath.BASE}/${wordsArr[question].image})`);
    setImgSize('cover');
    setNextBtn('➤');
  }

  function nextQuestion() {
    if (nextBtn === '➤') {
      dispatch(addDis(false));
      setAnswerStyle('');
      setNextBtn('Не знаю');
      dispatch(updateAnswers([]));
      dispatch(updateQuestion(question + 1));
      setQuestionTitle('');
      setQuestionImg('');
      setImgSize('50%');
    } else {
      setAnswerStyle(styles.correct);
      audioWrong.muted = isMute;
      audioWrong.play();
      setWrongAnswers((prev) => [...prev, wordsArr[question]]);
      setStrike((prev) => ({ value: Math.max(prev.value, prev.temp), temp: 0 }));
      dispatch(addDis(true));
      setNextBtn('➤');
      setQuestionTitle(words[question]);
      setQuestionImg(`url(${UrlPath.BASE}/${wordsArr[question].image})`);
      setImgSize('cover');
    }
  }

  function changeScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  function closeGame() {
    dispatch(updateQuestion(0));
    dispatch(updateAnswers([]));
    dispatch(addDis(false));
    if (document.fullscreenElement) document.exitFullscreen();
    setPage('main');
  }

  const stopAudio = () => {
    player.pause();
    audioCounter = 0;
  };

  const playAudio = useCallback(async () => {
    const audioSources = [`${UrlPath.BASE}/${wordsArr[question]?.audio}`];

    if (audioCounter >= audioSources.length) {
      stopAudio();
      return;
    }

    player.src = audioSources[audioCounter];
    player.play().catch((err) => err);
    audioCounter += 1;
  }, [wordsArr[question]]);

  useEffect(() => {
    player = new Audio();

    const playerHandler = () => {
      playAudio();
    };

    player.addEventListener('ended', playerHandler);

    return () => {
      player.removeEventListener('ended', playerHandler);
      stopAudio();
    };
  }, [playAudio, wordsArr[question]]);

  const playClickHandler = () => {
    playAudio().catch((err) => err);
  };

  const handlePlayAgain = () => {
    dispatch(updateQuestion(0));
    dispatch(updateAnswers([]));
    dispatch(addDis(false));
    setResult(false);
    setRightAnswers([]);
    setWrongAnswers([]);
    playClickHandler();
    setStrike({ value: 0, temp: 0 });
  };

  useEffect(() => {
    if (answers.length === 0 && wordsArr[question]) {
      collectAnswers();
      playClickHandler();
    } else if (wordsArr[question] === undefined) {
      setResult(true);
      dispatch(addDis(false));
      setAnswerStyle('');
      setNextBtn('Не знаю');
    }
  }, [question]);

  useEffect(() => {
    const handleAnswerKeyup = (e: KeyboardEvent) => {
      const { code } = e;
      if (code.startsWith('Digit') || code.startsWith('Numpad')) {
        const index = +code.slice(-1) - 1;
        if (!Number.isNaN(index) && index >= 0 && index < 5) {
          document.getElementById(`${index}`)?.click();
        }
      }
    };
    document.addEventListener('keyup', handleAnswerKeyup);
    return () => {
      document.removeEventListener('keyup', handleAnswerKeyup);
    };
  }, [answers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Аудиовызов</h2>
        <div className={styles.controls}>
          <NavLink to='/games'>
            <button
              aria-label='close'
              type='button'
              className={styles.close}
              onClick={() => closeGame()}
            />
          </NavLink>
          <button
            aria-label='mute'
            type='button'
            className={muteStyles === 'mute' ? styles.mute : styles.unmute}
            onClick={() => {
              setIsMute(!isMute);
              if (muteStyles === 'mute') {
                setMuteStyles('unmute');
              } else {
                setMuteStyles('mute');
              }
            }}
          />
          <button
            aria-label='screen'
            type='button'
            className={screenStyles === 'full' ? styles.unfullscreen : styles.fullscreen}
            onClick={() => {
              changeScreen();
              if (screenStyles === 'full') {
                setScreenStyles('unfull');
              } else {
                setScreenStyles('full');
              }
            }}
          />
        </div>
      </div>
      {result ? (
        <Result
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          onPlayAgain={handlePlayAgain}
          strike={strike.value}
        />
      ) : (
        <div className={styles.field}>
          <button
            aria-label='sound'
            type='button'
            className={styles.sound}
            onClick={playClickHandler}
            disabled={disable}
            style={{ backgroundImage: questionImg, backgroundSize: imgSize }}
          />
          <div className={styles.cards}>
            <div className={styles.answerField}>
              <button
                aria-label='sound'
                type='button'
                disabled={!disable}
                onClick={playClickHandler}
                className={disable ? styles.sound_small : ''}
              />
              <div className={styles.question_title}>{questionTitle}</div>
            </div>
            <div className={styles.answers}>
              {answers.map((value, i) => (
                <button
                  id={`${i}`}
                  key={value}
                  className={`${styles.btn} ${
                    value === wordsArr[question].wordTranslate ? answerStyle : ''
                  }`}
                  type='button'
                  disabled={disable}
                  onClick={(event) => {
                    displayCorrectAnswer(event.target);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
            <button className={styles.start} type='button' onClick={() => nextQuestion()}>
              {nextBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioGame;
