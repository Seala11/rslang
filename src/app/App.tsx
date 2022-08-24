import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Login, Levels } from 'src/pages';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

const App: React.FC = () => <div className='page'>
    <Header />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/textbook' element={<Textbook />} />
      <Route path='/games' element={<Games />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/login' element={<Login />} />
      <Route path='/games/audio-levels' element={<Levels game="Аудиовызов" />} />
      <Route path='/games/sprint-levels' element={<Levels game="Спринт" />} />
    </Routes>

    <Footer />
  </div>;

export default App;
