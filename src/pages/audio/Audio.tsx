import React, {useEffect} from 'react';
import styles from 'src/pages/audio/Audio.module.scss';
import { selectCurrentPageWords } from 'src/store/audioSlice';
import { useAppSelector } from 'src/store/hooks';

const Audio: React.FC = () => {
  const currentPageWords = useAppSelector(selectCurrentPageWords);
   useEffect(()=> {console.log(currentPageWords)},[currentPageWords])
  return <main className='main'>
    <div className={styles.wrapper}>
    <h2 className={styles.title}>Игры</h2>
    <div className={styles.cards}>
    {currentPageWords.map(item => <div>{item.word}</div>)}
    </div>
  </div>
  </main>
};

export default Audio;