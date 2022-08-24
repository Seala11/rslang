import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUserData, addUserData } from 'src/store/userSlice';
import { clearUserData, UserStorage } from 'src/helpers/storage';
import styles from 'src/components/Header/Header.module.scss';
import NAV_LIST from 'src/data/navigation';
import Image from 'src/components/Image';

const Header: React.FC = () => {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  const userLogoutHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (userData?.message === UserStorage.AUTH) {
      event.preventDefault();
      dispatch(addUserData(undefined))
      clearUserData();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Image {...{ altImg: 'Logo', srcImg: 'assets/icons/logo.png', className: styles.logo }} />
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {NAV_LIST.map((item) => (
              <li key={item.name} className={styles.nav__item}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.nav__link_active : styles.nav__link
                  }
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className={styles.nav__item}>
              <NavLink to='/login'>
                <button className={styles.logBtn} type='button' onClick={userLogoutHandler}>
                  {userData?.message === UserStorage.AUTH ? 'Выйти' : 'Войти'}
                </button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
