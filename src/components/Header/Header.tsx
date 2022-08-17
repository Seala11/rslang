import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'src/components/Header/Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__wrapper}>
      <img className={styles.header__logo} src='assets/icons/logo.png' alt='Logo' />
      <nav className={`${styles.header__nav} ${styles.nav}`}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}
              to='/'
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}
              to='/words'
            >
              Учебник
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}
              to='/games'
            >
              Игры
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}
              to='/statistics'
            >
              Статистика
            </NavLink>
          </li>
        </ul>
        <button className={styles.nav__logBtn} type='button'>
          Войти
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
