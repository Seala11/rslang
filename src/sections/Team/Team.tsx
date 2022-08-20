import React from 'react';
import styles from 'src/sections/Team/Team.module.scss';
import DEVELOPERS_LIST from 'src/data/DEVELOPERS_LIST';
import MemberCard from 'src/components/MemberCard';

const Team: React.FC = () => (
  <section className={styles.team}>
    <h2 className={styles.team__title}>Наша команда</h2>
    <div className={styles.team__wrapper}>
      {DEVELOPERS_LIST.map((item) => {
        const { name, tasks, altImg, srcImg } = item;
        return <MemberCard {...{ name, tasks, altImg, srcImg }} />;
      })}
    </div>
  </section>
);

export default Team;
