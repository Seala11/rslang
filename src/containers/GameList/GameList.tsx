/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { adaptToLocalSprintWords, createPagesFilter, shuffle } from 'src/helpers/utils';
import { addWordsArr, fetchFilteredWordsArr } from 'src/store/audioSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addWords, fetchFilteredWords, fetchUserWords } from 'src/store/sprintSlice';
import { IWord } from 'src/store/types';
import { getUserData } from 'src/store/userSlice';
import { selectCurrentPageWords } from 'src/store/wordsSlice';
import styles from './GameList.module.scss';

interface IGameListProps {
  group: number;
  page: number;
}

const GameList: React.FC<IGameListProps> = ({ group, page }) => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSprintClick = async () => {
    setLoading(true);

    if (userIsLogged(userData?.message)) {
      await dispatch(
        fetchFilteredWords(getUserId(), getUserToken(), `${group - 1}`, `${page - 1}`)
      );
    } else {
      const sprintWords = adaptToLocalSprintWords(currentPageWords);
      dispatch(addWords(shuffle(sprintWords)));
    }

    setLoading(false);

    navigate('/games/sprint');
  };

  const handleAudioCallClick = async () => {
    setLoading(true);

    if (userIsLogged(userData?.message)) {
      await dispatch(
        fetchFilteredWordsArr(getUserId(), getUserToken(), `${group - 1}`, `${page - 1}`)
      );
    } else {
      const set: Set<IWord> = new Set();
      while (set.size < currentPageWords.length) {
        set.add(currentPageWords[Math.floor(Math.random() * currentPageWords.length)]);
      }
      const res = Array.from(set);
      dispatch(addWordsArr(res));
    }

    setLoading(false);

    navigate('/games/audio');
  };

  return (
    <div className={styles.gameList}>
      {loading ? (
        <div>ЗАГРУЖАЕТСЯ</div>
      ) : (
        <>
          <button className={styles.btn} type='button' onClick={handleAudioCallClick}>
            Аудио
          </button>
          <button className={styles.btn} type='button' onClick={handleSprintClick}>
            Спринт
          </button>
        </>
      )}
    </div>
  );
};

export default GameList;
