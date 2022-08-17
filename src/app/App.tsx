import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Login } from 'src/pages';
import WordsByGroup from 'src/pages/textbook/WordsByGroup';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

const App: React.FC = () => (
  <div className='page'>
    <Header />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/textbook' element={<Textbook />}>
        <Route path=':group' element={<WordsByGroup />} />
      </Route>
      <Route path='/games' element={<Games />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/login' element={<Login />} />
    </Routes>

    <Footer />
  </div>
);

export default App;
