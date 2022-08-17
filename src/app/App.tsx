import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Words, Statistics, Games } from 'src/pages';
import WordsByGroup from 'src/pages/WordsByGroup';
import getWordsAPI from 'src/requests/getWordsAPI';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  return (
    <div className='page'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/words' element={<Words />}>
          <Route path=':group' element={<WordsByGroup />} />
        </Route>
        <Route path='/games' element={<Games />} />
        <Route path='/statistics' element={<Statistics />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
