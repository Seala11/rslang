import React, { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

export interface ITimerProps {
  onTimerFinish: () => void;
  seconds: number;
}

const Timer: React.FC<ITimerProps> = ({ onTimerFinish, seconds }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      } else {
        onTimerFinish();
      }
    }, 1000);

    return () => clearTimeout(timeId);
  }, [onTimerFinish, time]);

  return <span className={styles.timer}>{time}</span>;
};

export default Timer;
