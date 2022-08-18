import React from 'react';
import styles from 'src/components/Menu/Menu.module.scss';
import { NavLink } from 'react-router-dom';

const Menu: React.FC = () => (
  <section className={styles.section__menu}>
      <h2 className={styles.menu__title}>Изучайте Английский язык в удобном формате</h2>
      <div className={styles.menu__wrapper}>
        <NavLink to='/textbook'>
          <div className={styles.menu__card}>
            <h3 className={styles.card__title}>Учебник</h3>
            <div>
              <img src="assets/images/textbook.png" alt="Textbook" />
            </div>
            <p className={styles.card__descr}>Коллекция содержит 3600 часто употребляемых английских слов. 
            Возможность выбрать подходящий уровень</p>
          </div>
        </NavLink>
        <NavLink to='/games'>
          <div className={styles.menu__card}>
            <h3 className={styles.card__title}>Игры</h3>
            <div>
              <img src="assets/images/games.png" alt="Games" />
            </div>
            <p className={styles.card__descr}>Мини-игры &#34;Аудиовызов&#34; и &#34;Спринт&#34;</p>
          </div>
        </NavLink>
        <NavLink to='/statistics'>
          <div className={styles.menu__card}>
            <h3 className={styles.card__title}>Статистика</h3>
            <div>
              <img src="assets/images/statistics.png" alt="Statistics" />
            </div>
            <p className={styles.card__descr}>На странице статистики отображается 
            краткосрочная статистика по мини-играм и по словам за каждый день изучения</p>
          </div>
        </NavLink>
      </div>
    </section>
);

export default Menu;