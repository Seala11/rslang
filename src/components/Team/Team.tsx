import React from 'react';
import styles from 'src/components/Team/Team.module.scss';

const Team: React.FC = () => (
  <section className={styles.section__team}>
    <h2 className={styles.team__title}>Наша команда</h2>
    <div className={styles.team__wrapper}>
      <div className={styles.member}>
        <h3 className={styles.member__name}>Аня</h3>
        <div className={styles.member__img}>
          <img src='assets/images/anya.png' alt='Anya' />
        </div>
        <p className={styles.member__descr}>
          {' '}
          Разработала игру «Оазис», в которой необходимо ввести пропущенное в предложении слово.
          Придала 3/4 игр внешний вид, сверстала словарь и учебник, сделала их настройки, а еще
          графики, компоненты для отображения статистики, а также страницу авторизации.{' '}
        </p>
      </div>
      <div className={styles.member}>
        <h3 className={styles.member__name}>Наташа</h3>
        <div className={styles.member__img}>
          <img src='assets/images/natasha.png' alt='Natasha' />
        </div>
        <p className={styles.member__descr}>
          {' '}
          Разработала игру «Оазис», в которой необходимо ввести пропущенное в предложении слово.
          Придала 3/4 игр внешний вид, сверстала словарь и учебник, сделала их настройки, а еще
          графики, компоненты для отображения статистики, а также страницу авторизации.{' '}
        </p>
      </div>
      <div className={styles.member}>
        <h3 className={styles.member__name}>Марсель</h3>
        <div className={styles.member__img}>
          <img src='assets/images/marsel.png' alt='Marsel' />
        </div>
        <p className={styles.member__descr}>
          {' '}
          Разработала игру «Оазис», в которой необходимо ввести пропущенное в предложении слово.
          Придала 3/4 игр внешний вид, сверстала словарь и учебник, сделала их настройки, а еще
          графики, компоненты для отображения статистики, а также страницу авторизации.{' '}
        </p>
      </div>
    </div>
  </section>
);

export default Team;
