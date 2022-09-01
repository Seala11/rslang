/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useState } from 'react';
import { UrlPath } from 'src/helpers/constRequestsAPI';
import { userIsLogged } from 'src/helpers/storage';
import { useAppSelector } from 'src/store/hooks';
import { getUserData } from 'src/store/userSlice';
import { selectWordDetails } from 'src/store/wordsSlice';
import styles from './WordDetails.module.scss';
import WordButtons from '../WordButtons';
import WordStatistic from '../WordStatistic';

let audioCounter = 0;
let player: HTMLAudioElement;

const WordDetails = () => {
  const [stop, setStop] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const userData = useAppSelector(getUserData);
  const word = useAppSelector(selectWordDetails);

  const stopAudio = () => {
    player.pause();
    audioCounter = 0;
  };

  const playAudio = useCallback(async () => {
    const audioSources = [
      `${UrlPath.BASE}/${word?.audio}`,
      `${UrlPath.BASE}/${word?.audioMeaning}`,
      `${UrlPath.BASE}/${word?.audioExample}`,
    ];

    if (audioCounter >= audioSources.length) {
      stopAudio();
      setDisabled(false);
      setStop(false);
      return;
    }

    player.src = audioSources[audioCounter];
    await player.play();
    audioCounter += 1;
  }, [word]);

  useEffect(() => {
    player = new Audio();

    const playerHandler = () => {
      playAudio();
    };

    player.addEventListener('ended', playerHandler);

    return () => {
      player.removeEventListener('ended', playerHandler);
      stopAudio();
      setDisabled(false);
      setStop(false);
    };
  }, [playAudio, word]);

  const playClickHandler = async () => {
    setDisabled(true);
    await playAudio();
    setStop(true);
  };

  const stopClickHandler = () => {
    stopAudio();
    setDisabled(false);
    setStop(false);
  };

  return word ? (
    <div className={styles.details}>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${UrlPath.BASE}/${word.image})` }}
      />
      <div className={styles.content}>
        <span className={styles.word}>{word.word}</span>
        <span className={styles.wordTranslate}>{word.wordTranslate}</span>
        <div className={styles.audioWrapper}>
          <span className={styles.transcription}>{word.transcription}</span>
          <div className={styles.audio}>
            {stop ? (
              <button className={styles.btn} type='button' onClick={stopClickHandler}>
                <svg
                  focusable='false'
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                  data-testid='StopIcon'
                  fill='gray'
                >
                  <path d='M6 6h12v12H6z' />
                </svg>
              </button>
            ) : (
              <button
                className={styles.btn}
                type='button'
                onClick={playClickHandler}
                disabled={disabled}
              >
                <svg
                  focusable='false'
                  aria-hidden='true'
                  viewBox='0 0 24 24'
                  data-testid='VolumeUpIcon'
                  fill='gray'
                >
                  <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <h4 className={styles.caption}>Значение</h4>
          <p className={styles.text} dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          <p className={styles.textTranslate}>{word.textMeaningTranslate}</p>
        </div>
        <div className={styles.description}>
          <h4 className={styles.caption}>Пример</h4>
          <p className={styles.text} dangerouslySetInnerHTML={{ __html: word.textExample }} />
          <p className={styles.textTranslate}>{word.textExampleTranslate}</p>
        </div>
        {userIsLogged(userData?.message) ? (
          <>
            <WordStatistic word={word} />
            <WordButtons word={word} />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  ) : (
    <div>LOADING...</div>
  );
};

export default WordDetails;
