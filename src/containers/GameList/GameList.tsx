/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserToken, userIsLogged } from 'src/helpers/storage';
import { adaptToLocalSprintWords, shuffle } from 'src/helpers/utils';
import { addWordsArr } from 'src/store/audioSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addWords } from 'src/store/sprintSlice';
import { IWord } from 'src/store/types';
import { getUserData } from 'src/store/userSlice';
import { selectCurrentPageWords } from 'src/store/wordsSlice';
import styles from './GameList.module.scss';

const GameList = () => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();

  const handleSprintClick = () => {
    if (userIsLogged(userData?.message)) {
      // await dispatch(
      // fetchUserWords(getUserId(), getUserToken(), `${id}`, `${Math.floor(Math.random() * 30)}`)
      // );
    } else {
      const sprintWords = adaptToLocalSprintWords(currentPageWords);
      dispatch(addWords(shuffle(sprintWords)));
    }

    navigate('/games/sprint');
  };

  const handleAudioCallClick = () => {
    if (userIsLogged(userData?.message)) {
      // await dispatch(
      // fetchUserWords(getUserId(), getUserToken(), `${id}`, `${Math.floor(Math.random() * 30)}`)
      // );
    } else {
      const set: Set<IWord> = new Set();
      while (set.size < 20) {
        set.add(currentPageWords[Math.floor(Math.random() * 20)]);
      }
      const res = Array.from(set);
      dispatch(addWordsArr(res));
    }

    navigate('/games/audio');
  };

  return (
    <div className={styles.gameList}>
      <button className={styles.btn} type='button' onClick={handleAudioCallClick}>
        Аудио
      </button>
      <button className={styles.btn} type='button' onClick={handleSprintClick}>
        Спринт
      </button>
    </div>
  );
};

export default GameList;
