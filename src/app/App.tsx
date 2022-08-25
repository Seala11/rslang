import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Registration, Levels } from 'src/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

const App: React.FC = () => (
  <div className='page'>
    <Header />
    <ToastContainer autoClose={8000} />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/textbook' element={<Textbook />} />
      <Route path='/games' element={<Games />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/login' element={<Registration />} />
      <Route path='/games/audio' element={<Levels game='audio' />} />
      <Route path='/games/sprint' element={<Levels game='sprint' />} />
    </Routes>

    <Footer />
  </div>
);

export default App;
