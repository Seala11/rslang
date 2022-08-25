import React, { useEffect } from 'react';
import styles from 'src/pages/audio/Audio.module.scss';
import { selectCurrentPageWords } from 'src/store/audioSlice';
import { useAppSelector } from 'src/store/hooks';

const Audio: React.FC<{ setPage: React.Dispatch<React.SetStateAction<string>> }> = ({
  setPage,
}) => {
  const currentPageWords = useAppSelector(selectCurrentPageWords);
  useEffect(() => {
    console.log(currentPageWords);
  }, [currentPageWords]);
  return (
    // <main className='main'>
    //   <div className={styles.wrapper}>
    //     <h2 className={styles.title}>Игры</h2>
    //     <div className={styles.cards}>
    //       {currentPageWords.map((item) => (
    //         <div>{item.word}</div>
    //       ))}
    //     </div>
    //   </div>
    // </main>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Аудиовызов</h2>
        <div className={styles.controls}>
          <button
            aria-label='close'
            type='button'
            className={styles.close}
            onClick={() => setPage('main')}
          />
          <button aria-label='mute' type='button' className={styles.mute} />
          <button aria-label='screen' type='button' className={styles.fullscreen} />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.sound} />
        <div className={styles.cards}>
          {currentPageWords.map((item) => (
            <div>{item.word}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audio;
