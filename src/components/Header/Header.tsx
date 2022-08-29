import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  getUserData,
  removeUserData,
  removeUserLoading,
  setUserLoading,
} from 'src/store/userSlice';
import { clearUserData, userIsLogged } from 'src/helpers/storage';
import styles from 'src/components/Header/Header.module.scss';
import NAV_LIST from 'src/data/navigation';
import Image from 'src/components/Image';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();
  const location = useLocation();

  const userLogoutHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (userIsLogged(userData?.message)) {
      event.preventDefault();

      dispatch(setUserLoading());
      dispatch(removeUserData());
      clearUserData();
      dispatch(removeUserLoading());

      if (location.pathname === '/textbook') navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Image {...{ altImg: 'Logo', srcImg: '/assets/icons/logo.png', className: styles.logo }} />
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
                  {userIsLogged(userData?.message) ? 'Выйти' : 'Войти'}
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
