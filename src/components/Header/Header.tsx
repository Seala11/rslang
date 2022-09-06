import React, { useState } from 'react';
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
import { removeUserStatistic } from 'src/store/statisticsSlice';
import { addCurrentPageWords, removeWordDetails } from 'src/store/wordsSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const userLogoutHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (userIsLogged(userData?.message)) {
      event.preventDefault();

      dispatch(setUserLoading());
      dispatch(removeUserData());
      dispatch(removeUserStatistic());
      dispatch(addCurrentPageWords([]));
      dispatch(removeWordDetails());
      clearUserData();
      dispatch(removeUserLoading());

      if (location.pathname === '/textbook') navigate('/');
    }
  };

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <NavLink to='/'>
          <Image
            {...{ altImg: 'Logo', srcImg: '/assets/icons/logo.png', className: styles.logo }}
          />
        </NavLink>
        <nav className={styles.nav}>
          <ul className={`${styles.nav__list} ${isOpen ? styles.nav__list_open : ''}`}>
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
          </ul>
          <button
            onClick={() => toggleMenu()}
            className={`${styles.hamburger} ${isOpen ? styles.hamburger_active : ''}`}
            type='button'
          >
            <span className={styles.line} />
          </button>
          <NavLink to='/login'>
            <button className={styles.logBtn} type='button' onClick={userLogoutHandler}>
              {userIsLogged(userData?.message) ? 'Выйти' : 'Войти'}
            </button>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
