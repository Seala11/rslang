import React from 'react';
import styles from 'src/pages/home/Home.module.scss';

const Home: React.FC = () => (
  <div>
    <h1 className={`${styles.title}`}>Английский онлайн</h1>
    <p>
      Приложение для изучения английского языка в игровой форме. Изучай язык легко с Language Learn
    </p>
  </div>
);

export default Home;
