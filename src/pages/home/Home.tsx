import React from 'react';
import styles from 'src/pages/home/Home.module.scss';
import Hero from 'src/sections/Hero';
import Menu from 'src/sections/Menu';
import Team from 'src/sections/Team';

const Home: React.FC = () => (
  <main className={styles.main}>
    <Hero />
    <Menu />
    <Team />
  </main>
);

export default Home;
