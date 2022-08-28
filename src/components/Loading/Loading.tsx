import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => (
  <div className={styles.wrapper}>
    <div className={styles.lds_ring}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
