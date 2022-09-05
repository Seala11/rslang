/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from 'src/components/Loading';
import GAMES_LIST from 'src/data/games';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { adaptToLocalSprintWords, shuffle } from 'src/helpers/utils';
import { addWordsArr, fetchFilteredWordsArr } from 'src/store/audioSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addWords, fetchFilteredWords } from 'src/store/sprintSlice';
import { IWord } from 'src/store/types';
import { getUserData } from 'src/store/userSlice';
import { getCurrPageLearned } from 'src/store/userWordsSlice';
import { selectCurrentPageWords } from 'src/store/wordsSlice';
import styles from './GameList.module.scss';

interface IGameListProps {
  group: number;
  page: number;
}

const GameList: React.FC<IGameListProps> = ({ group, page }) => {
  const dispatch = useAppDispatch();
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  const currPageLearned = useAppSelector(getCurrPageLearned);
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGameClick = async (id: number) => {
    setLoading(true);

    if (id === 1) {
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

      navigate('/games/audio');
    } else {
      if (userIsLogged(userData?.message)) {
        await dispatch(
          fetchFilteredWords(getUserId(), getUserToken(), `${group - 1}`, `${page - 1}`)
        );
      } else {
        const sprintWords = adaptToLocalSprintWords(currentPageWords);
        dispatch(addWords(shuffle(sprintWords)));
      }

      navigate('/games/sprint');
    }

    setLoading(false);
  };

  return (
    <div className={styles.gameList}>
      {loading ? (
        <div>ЗАГРУЖАЕТСЯ</div>
      ) : (
        <>
          {GAMES_LIST.map((item) => {
            const { title, altImg, srcImg, id } = item;

            return (
              <button
                key={id}
                className={styles.card}
                type='button'
                onClick={() => handleGameClick(id)}
                disabled={currPageLearned}
              >
                <div className={styles.img}>
                  <img src={srcImg} alt={altImg} />
                </div>
                <h3 className={styles.title}>{title}</h3>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};

export default GameList;
