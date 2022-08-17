import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => (
   <header className='header'>
      <div className='header__wrapper'>
        <img className='header__logo' src="assets/icons/logo.png" alt="Logo" />
        <nav className='header__nav nav'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/'>
                Главная
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/words'>
                Учебник
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/'>
                Игры
              </NavLink>
            </li>
            <li className='nav__item'>
              <NavLink className='nav__link' to='/'>
                Статистика
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      </header>
);

export default Header;