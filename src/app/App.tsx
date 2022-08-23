import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Registration } from 'src/pages';
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
    </Routes>

    <Footer />
  </div>
);

export default App;
