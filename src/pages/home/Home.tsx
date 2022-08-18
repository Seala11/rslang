import React from 'react';
import styles from 'src/pages/home/Home.module.scss';
import Hero from 'src/components/Hero';
import Menu from 'src/components/Menu';
import Team from 'src/components/Team';

const Home: React.FC = () => (
  <main className={styles.main}>
    <Hero />
    <Menu />
    <Team />
  </main>
);

export default Home;
