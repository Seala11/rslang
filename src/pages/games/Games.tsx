import React from 'react';
import styles from 'src/pages/games/Games.module.scss';

const Games: React.FC = () => (
  <div>
    <h1 className={`${styles.title}`}>Игры</h1>
    <p>Аудиовызов</p>
    <p>Спринт</p>
  </div>
);

export default Games;
