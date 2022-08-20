import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'src/components/Header/Header.module.scss';
import NAV_LIST from 'src/data/NAV_LIST';
import Image from '../Image';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__wrapper}>
      <Image {...{altImg: 'Logo', srcImg: 'assets/icons/logo.png', className: styles.header__logo}}/>
      <nav className={`${styles.header__nav} ${styles.nav}`}>
        <ul className={styles.nav__list}>
          {NAV_LIST.map(item => <li className={styles.nav__item}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.nav__link_active : styles.nav__link)}
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>)}
          <li className={styles.nav__item}>
            <NavLink to='/login'>
              <button className={styles.nav__logBtn} type='button'>
                Войти
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
