import React from 'react';
import styles from 'src/pages/statistics/Statistics.module.scss';

const Statistic: React.FC = () => (
  <div>
    <h1 className={`${styles.title}`}>Статистика</h1>
    <p>Сегодня</p>
  </div>
);

export default Statistic;
