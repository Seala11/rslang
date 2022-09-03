/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/containers/DifficultWords/DifficultWord/DifficultWord.module.scss';
import { UserWordOptions, UrlPath } from 'src/helpers/constRequestsAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCreateUserWord } from 'src/store/userWordsSlice';
import { IDifficultWordProps } from './IDifficultWord.Props';

// id: string;
//   _id?: string;
//   group: number;
//   page: number;
//   word: string;
//   image: string;
//   audio: string;
//   audioMeaning: string;
//   audioExample: string;
//   textMeaning: string;
//   textExample: string;
//   transcription: string;
//   wordTranslate: string;
//   textMeaningTranslate: string;
//   textExampleTranslate: string;
//   userWord?: IUserWord;

// Значение
// Alcohol is a type of drink that can make people drunk.

// Алкоголь - это тип напитка, который может сделать людей пьяными

// Пример
// A person should not drive a car after he or she has been drinking alcohol.

// Человек не должен водить машину после того, как он выпил алкоголь

let audioCounter = 0;
let player: HTMLAudioElement;

const DifficultWord: React.FC<IDifficultWordProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState(false);
  const [stop, setStop] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {}, [disable]);

  const removeWord = () => {
    console.log(word);
    setDisable(() => true);
    dispatch(
      fetchCreateUserWord(
        getUserId(),
        word?._id,
        getUserToken(),
        `${word?.group}`,
        UserWordOptions.DIFFICULT,
        undefined,
        `${word?.page}`
      )
    );
  };

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

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${UrlPath.BASE}/${word?.image})` }}
      />
      <div className={styles.content}>
        <div className={styles.wordDetails}>
          <span className={styles.word}>{word?.word}</span>
          <span className={styles.wordTranslate}>{word?.wordTranslate}</span>
          <div className={styles.audioWrapper}>
            <span className={styles.transcription}>{word?.transcription}</span>
            {stop ? (
              <button className={styles.btn} type='button' onClick={stopClickHandler}>
                <svg
                  focusable='false'
                  aria-hidden='true'
                  width='24px'
                  height='24px'
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
                  width='24px'
                  height='24px'
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
        <div>
          <h5 className={styles.descrTitle}>Значение</h5>
          <p className={styles.descrText} dangerouslySetInnerHTML={{ __html: (word?.textMeaning as string) }} />
          <p className={`${styles.descrText} ${styles.descrSecond}`} dangerouslySetInnerHTML={{ __html: (word?.textMeaningTranslate as string) }}/>
          <h5 className={styles.descrTitle}>Пример</h5>
          <p className={styles.descrText} dangerouslySetInnerHTML={{ __html: (word?.textExample as string) }} />
          <p className={styles.descrText} dangerouslySetInnerHTML={{ __html: (word?.textExampleTranslate as string) }} />
        </div>
      </div>
      <button type='button' onClick={removeWord} className={styles.button} disabled={disable}>
        Удалить из списка
      </button>
    </div>
  );
};

export default DifficultWord;
