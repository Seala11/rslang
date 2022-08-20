import React from 'react';
import styles from 'src/sections/Menu/Menu.module.scss';
import MENU_LIST from 'src/data/MENU_LIST';
import MenuCard from 'src/components/MenuCard/MenuCard';

const Menu: React.FC = () => (
  <section className={styles.menu}>
    <h2 className={styles.menu__title}>Изучайте Английский язык в удобном формате</h2>
    <div className={styles.menu__wrapper}>
      {MENU_LIST.map((item) => {
        const { title, path, altImg, srcImg, text } = item;
        return <MenuCard {...{ title, path, altImg, srcImg, text }} />;
      })}
    </div>
  </section>
);

export default Menu;
