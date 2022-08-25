import React from 'react';
import LayoutMain from 'src/containers/LayoutMain/LayoutMain';
import styles from 'src/pages/statistics/Statistics.module.scss';

const Statistic: React.FC = () => (
  <LayoutMain>
    <h1 className={`${styles.title}`}>Статистика</h1>
    <p>Сегодня</p>
  </LayoutMain>
);

export default Statistic;
