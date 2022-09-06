import React from 'react';
import styles from 'src/sections/Hero/Hero.module.scss';
import Image from 'src/components/Image';

const Hero: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.hero__info}>
      <h1 className={styles.hero__title}>Английский онлайн</h1>
      <p className={styles.hero__text}>
        Приложение для изучения английского языка в игровой форме. Изучай язык легко с Language
        Learn
      </p>
    </div>
    <div>
      <Image {...{ altImg: 'Hero', srcImg: 'assets/images/hero.png' }} />
    </div>
  </section>
);

export default Hero;
