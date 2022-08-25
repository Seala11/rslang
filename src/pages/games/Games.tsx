import React from 'react';
import LayoutMain from 'src/containers/LayoutMain';
import styles from 'src/pages/games/Games.module.scss';
import MenuCard from 'src/components/MenuCard';
import GAMES_LIST from 'src/data/games';

const Games: React.FC = () => (
  <LayoutMain>
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Игры</h2>
      <div className={styles.cards}>
        {GAMES_LIST.map((item) => {
          const { title, path, altImg, srcImg, text } = item;
          return <MenuCard key={item.id} {...{ title, path, altImg, srcImg, text }} />;
        })}
      </div>
    </div>
  </LayoutMain>
);

export default Games;
