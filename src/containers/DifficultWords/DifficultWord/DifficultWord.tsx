/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styles from 'src/containers/DifficultWords/DifficultWord/DifficultWord.module.scss';
import { IUserWordOptions, UrlPath } from 'src/helpers/constRequestsAPI';
import { getUserId, getUserToken } from 'src/helpers/storage';
import { useAppDispatch } from 'src/store/hooks';
import { fetchCreateUserWord } from 'src/store/userWordsSlice';
import { IDifficultWordProps } from './IDifficultWord.Props';

const DifficultWord: React.FC<IDifficultWordProps> = ({ word }) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = useState(false);

  useEffect(() => {}, [disable]);

  const removeWord = () => {
    console.log(word);
    setDisable(() => true);
    // dispatch(
    //   fetchUpdateDiffWord(
    //     getUserId(),
    //     word?._id,
    //     `${word?.group}`,
    //     `${word?.page}`,
    //     getUserToken(),
    //     false
    //   )
    // );
    dispatch(fetchCreateUserWord(getUserId(), word?._id,  getUserToken(), `${word?.group}`, IUserWordOptions.DIFFICULT, undefined, `${word?.page}`))
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${UrlPath.BASE}/${word?.image})` }}
      />
      <div className={styles.content}>
        <span className={styles.word}>{word?.word}</span>
        <span className={styles.wordTranslate}>{word?.wordTranslate}</span>
        <div className={styles.audioWrapper}>
          <span className={styles.transcription}>{word?.transcription}</span>
        </div>
      </div>
      <button type='button' onClick={removeWord} className={styles.button} disabled={disable}>
        Удалить из списка
      </button>
    </div>
  );
};

export default DifficultWord;
