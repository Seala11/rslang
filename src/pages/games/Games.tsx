import React from 'react';
import LayoutMain from 'src/containers/LayoutMain/LayoutMain';
import styles from 'src/pages/games/Games.module.scss';

const Games: React.FC = () => (
  <LayoutMain>
    <h1 className={`${styles.title}`}>Игры</h1>
    <p>Аудиовызов</p>
    <p>Спринт</p>
  </LayoutMain>
);

export default Games;
