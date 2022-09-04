/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useCallback } from 'react';
import styles from 'src/containers/DifficultWords/DifficultWord/DifficultWord.module.scss';
import { UserWordOptions, UrlPath } from 'src/helpers/constRequestsAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCreateUserWord, getAudioPlay, removeAudioPlay, setAudioPlay } from 'src/store/userWordsSlice';
import { IDifficultWordProps } from './IDifficultWord.Props';

let audioCounter = 0;
let player: HTMLAudioElement;

const DifficultWord: React.FC<IDifficultWordProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const audioPlay = useAppSelector(getAudioPlay);

  const [disableButton, setDisableButton] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableAudio, setDisableAudio] = useState(false);

  useEffect(() => {
  }, [disableButton]);

  const removeWord = () => {
    console.log(word);
    dispatch(removeAudioPlay());
    setDisableButton(() => true);
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

    console.log(audioSources);

    if (audioCounter >= audioSources.length) {
      stopAudio();
      dispatch(removeAudioPlay());
      setDisableAudio(false);
      setStop(false);
      return;
    }

    player.src = audioSources[audioCounter];
    await player.play();
    audioCounter += 1;
  }, [word, dispatch]);

  useEffect(() => {
    player = new Audio();

    const playerHandler = () => {
      playAudio();
    };

    player.addEventListener('ended', playerHandler);

    return () => {
      player.removeEventListener('ended', playerHandler);
      stopAudio();
      dispatch(removeAudioPlay());
      setDisableAudio(false);
      setStop(false);
    };
  }, [playAudio, word, dispatch]);

  const playClickHandler = async () => {
    if (audioPlay) {
      console.log('already play')
      return;
    }
    setDisableAudio(true);
    dispatch(setAudioPlay());
    await playAudio();
    setStop(true);
  };

  const stopClickHandler = () => {
    stopAudio();
    setDisableAudio(false);
    dispatch(removeAudioPlay());
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
                disabled={disableAudio}
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
          <p
            className={styles.descrText}
            dangerouslySetInnerHTML={{ __html: word?.textMeaning || '' }}
          />
          <p
            className={`${styles.descrText} ${styles.descrSecond}`}
            dangerouslySetInnerHTML={{ __html: word?.textMeaningTranslate || '' }}
          />
          <h5 className={styles.descrTitle}>Пример</h5>
          <p
            className={styles.descrText}
            dangerouslySetInnerHTML={{ __html: word?.textExample || '' }}
          />
          <p
            className={styles.descrText}
            dangerouslySetInnerHTML={{ __html: word?.textExampleTranslate || '' }}
          />
        </div>
      </div>
      <button type='button' onClick={removeWord} className={styles.button} disabled={disableButton}>
        Удалить из списка
      </button>
    </div>
  );
};

export default DifficultWord;
