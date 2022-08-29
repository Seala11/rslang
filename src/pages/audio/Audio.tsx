/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import styles from 'src/pages/audio/Audio.module.scss';
import { selectwordsArr, isDis, addDis, getAnswers, updateAnswers, getQuestion, updateQuestion } from 'src/store/audioSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { UrlPath } from 'src/helpers/constRequestsAPI';
import { NavLink } from 'react-router-dom';

let audioCounter = 0;
let player: HTMLAudioElement;

const AudioGame: React.FC<{ setPage: React.Dispatch<React.SetStateAction<string>> }> = ({
  setPage,
}) => {
  const dispatch = useAppDispatch();
  const disable = useAppSelector(isDis);
  const answers = useAppSelector(getAnswers);
  const wordsArr = useAppSelector(selectwordsArr);
  const words = wordsArr.map(item => item.wordTranslate);
  const question =useAppSelector(getQuestion);
  const [answerStyle, setAnswerStyle] = useState('');
  const [nextBtn, setNextBtn] = useState<'Не знаю'|'->'>('Не знаю');
  const [result, setResult] = useState(false);
  
  function collectAnswers() {
    const set: Set<string> = new Set();
    set.add(words[question])
    while(set.size < 5) {
      set.add(words[Math.floor(Math.random() * 20)])
    }
    const arr = Array.from(set);
    const res: Set<string> = new Set();
    while(res.size < 5) {
      res.add(arr[Math.floor(Math.random() * 5)])
    }
    dispatch(updateAnswers(Array.from(res)))
    console.log(answers)
  }

  function displayCorrectAnswer(e: EventTarget) {
    const targetElem = (e as HTMLButtonElement);
    if(targetElem.textContent === wordsArr[question].wordTranslate) {
      targetElem.style.color = 'green'
    } else {
      targetElem.style.color = 'red'
      targetElem.style.textDecoration = 'line-through'
      setAnswerStyle(styles.correct);
    }
    dispatch(addDis(true));
    setNextBtn('->');
  }

  function nextQuestion() {
    console.log(question + 1, wordsArr.length)
    if(question + 1 < wordsArr.length) {
      if(nextBtn === '->') {
      dispatch(addDis(false));
      setAnswerStyle('');
      setNextBtn('Не знаю')
      dispatch(updateAnswers([]))
      dispatch(updateQuestion(question + 1));
    }
    } else {
      setResult(true);
      console.log(result);
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
    const audioSources = [
      `${UrlPath.BASE}/${wordsArr[question]?.audio}`,
    ];

    if (audioCounter >= audioSources.length) {
      stopAudio();
      // setDisabled(false);
      // setStop(false);
      return;
    }

    player.src = audioSources[audioCounter];
    await player.play();
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
      // setDisabled(false);
      // setStop(false);
    };
  }, [playAudio, wordsArr[question]]);

  const playClickHandler = async () => {
    // setDisabled(true);
    await playAudio();
    // setStop(true);
  };

  useEffect(() => {
    if(answers.length === 0) {
      collectAnswers();
      playClickHandler();
    }
  }, [question])
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Аудиовызов</h2>
        <div className={styles.controls}>
          <NavLink to="/games">
          <button
            aria-label='close'
            type='button'
            className={styles.close}
            onClick={() => closeGame()}
          />
          </NavLink>
          <button aria-label='mute' type='button' className={styles.mute} />
          <button aria-label='screen' type='button' className={styles.fullscreen} onClick={() => changeScreen()} />
        </div>
      </div>
      <div className={styles.field} >
        {result ? <div>Results</div> : <><button aria-label='sound' type='button' className={styles.sound} onClick={playClickHandler} /><div className={styles.cards}>
          <div>{words[question]}</div>
          <div className={styles.answers}>
            {answers.map((value) => (
              <button
                className={`${styles.btn} ${value === wordsArr[question].wordTranslate ? answerStyle : ''}`}
                type='button'
                disabled={disable}
                onClick={(event) => {
                  displayCorrectAnswer(event.target);
                } }
              >
                {value}
              </button>))}
          </div>
          <button className={styles.start} type='button' onClick={() => nextQuestion()}>
            {nextBtn}
          </button>
        </div></>}
      </div>
    </div>
  );
};

export default AudioGame;
