import React from 'react';
import styles from 'src/components/MemberCard/MemberCard.module.scss';
import { IMemberCardProps } from './IMemberCardProps';

const MemberCard: React.FC<IMemberCardProps> = ({ name, tasks, altImg, srcImg }) => (
  <div className={styles.member}>
    <h3 className={styles.member__name}>{name}</h3>
    <div className={styles.member__img}>
      <img src={`${srcImg}`} alt={`${altImg}`} />
    </div>
    <p className={styles.member__descr}>{tasks}</p>
  </div>
);

export default MemberCard;
