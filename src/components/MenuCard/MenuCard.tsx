import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'src/components/MenuCard/MenuCard.module.scss';
import { IMenuCardProps } from './IMenuCardProps';
import Image from '../Image';

const MenuCard: React.FC<IMenuCardProps> = ({ title, path, altImg, srcImg, text }) => (
  <NavLink to={path}>
    <div className={styles.menu__card}>
      <h3 className={styles.card__title}>{title}</h3>
      <div>
      <Image {...{altImg, srcImg}}/>
      </div>
      <p className={styles.card__descr}>{text}</p>
    </div>
  </NavLink>
);

export default MenuCard;