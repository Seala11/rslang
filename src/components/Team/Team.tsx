import React from 'react';
import styles from 'src/components/Team/Team.module.scss';
import developers from 'src/data/developers';

const Team: React.FC = () => (
  <section className={styles.section__team}>
    <h2 className={styles.team__title}>Наша команда</h2>
    <div className={styles.team__wrapper}>
      <div className={styles.member}>
        <h3 className={styles.member__name}>{developers[0].name}</h3>
        <div className={styles.member__img}>
          <img src={`${developers[0].srcImg}`} alt={`${developers[0].altImg}`} />
        </div>
        <p className={styles.member__descr}>{developers[0].tasks}</p>
      </div>
      <div className={styles.member}>
        <h3 className={styles.member__name}>{developers[1].name}</h3>
        <div className={styles.member__img}>
          <img src={`${developers[1].srcImg}`} alt={`${developers[1].altImg}`} />
        </div>
        <p className={styles.member__descr}>{developers[1].tasks}</p>
      </div>
      <div className={styles.member}>
        <h3 className={styles.member__name}>{developers[2].name}</h3>
        <div className={styles.member__img}>
          <img src={`${developers[2].srcImg}`} alt={`${developers[2].altImg}`} />
        </div>
        <p className={styles.member__descr}>{developers[2].tasks}</p>
      </div>
    </div>
  </section>
);

export default Team;
