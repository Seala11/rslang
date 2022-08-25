import React from 'react';
import LayoutMain from 'src/containers/LayoutMain/LayoutMain';
import Hero from 'src/sections/Hero';
import Menu from 'src/sections/Menu';
import Team from 'src/sections/Team';

const Home: React.FC = () => (
  <LayoutMain>
    <Hero />
    <Menu />
    <Team />
  </LayoutMain>
);

export default Home;
