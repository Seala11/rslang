import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Words,Statistics, Games } from 'src/pages';
import WordsByGroup from 'src/pages/WordsByGroup';
import getWordsAPI from 'src/requests/getWordsAPI';
import Header from 'src/components/Header';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  // const activeStyle = {
  //   outline: 'solid red 1px',
  //   color: 'red',
  // };

  return (
    <>
      {/* <header>
        <NavLink to='/' style={({ isActive }) => (isActive ? activeStyle : {})}>
          Home
        </NavLink>
        <NavLink to='/words' style={({ isActive }) => (isActive ? activeStyle : {})}>
          Words
        </NavLink>
      </header> */}
      <Header />

      <hr />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/words' element={<Words />}>
          <Route path=':group' element={<WordsByGroup />} />
        </Route>
        <Route path='/games' element={<Games />} />
        <Route path='/statistics' element={<Statistics />} />
      </Routes>
    </>
  );
};

export default App;
