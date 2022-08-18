import React from 'react';
import styles from 'src/components/Hero/Hero.module.scss';

const Hero: React.FC = () => (
  <section className={styles.section__hero}>
    <div className={styles.hero__info}>
      <h1 className={styles.hero__title}>Английский онлайн</h1>
      <p className={styles.hero__text}>
        Приложение для изучения английского языка в игровой форме. Изучай язык легко с Language
        Learn
      </p>
    </div>
    <div>
      <img src='assets/images/hero.png' alt='Hero' />
    </div>
  </section>
);

export default Hero;
