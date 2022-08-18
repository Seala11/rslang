import React from 'react';
import styles from 'src/pages/home/Home.module.scss';

const Home: React.FC = () => (
  <main className={styles.main}>
    <section className={styles.section__hero}>
      <div className={styles.hero__info}>
        <h1 className={styles.hero__title}>Английский онлайн</h1>
        <p className={styles.hero__text}>Приложение для изучения английского языка 
        в игровой форме. Изучай язык легко с Language Learn</p>
      </div>
      <div>
        <img src="assets/images/hero.png" alt="Hero" />
      </div>
    </section>
    <section className={styles.section__menu}>
      <h2 className={styles.menu__title}>Изучайте Английский язык в удобном формате</h2>
      <div className={styles.menu__wrapper}>
        <div className={styles.menu__card}>
          <h3 className={styles.card__title}>Учебник</h3>
          <div>
            <img src="assets/images/textbook.png" alt="Textbook" />
          </div>
          <p className={styles.card__descr}>Коллекция содержит 3600 часто употребляемых английских слов. 
          Возможность выбрать подходящий уровень</p>
        </div>
        <div className={styles.menu__card}>
          <h3 className={styles.card__title}>Игры</h3>
          <div>
            <img src="assets/images/games.png" alt="Games" />
          </div>
          <p className={styles.card__descr}>Мини-игры &#34;Аудиовызов&#34; и &#34;Спринт&#34;</p>
        </div>
        <div className={styles.menu__card}>
          <h3 className={styles.card__title}>Статистика</h3>
          <div>
            <img src="assets/images/statistics.png" alt="Statistics" />
          </div>
          <p className={styles.card__descr}>На странице статистики отображается 
          краткосрочная статистика по мини-играм и по словам за каждый день изучения</p>
        </div>
      </div>
    </section>
  </main>
);

export default Home;
