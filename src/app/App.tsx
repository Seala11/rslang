import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Home, Words } from 'src/pages';
import getWordsAPI from 'src/requests/getWordsAPI';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  const activeStyle = {
    outline: 'solid red 1px',
    color: 'red',
  };

  return (
    <>
      <header>
        <NavLink to='/' style={({ isActive }) => (isActive ? activeStyle : {})}>
          Home
        </NavLink>
        <NavLink to='/words' style={({ isActive }) => (isActive ? activeStyle : {})}>
          Words
        </NavLink>
      </header>

      <hr />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/words' element={<Words />} />
      </Routes>
    </>
  );
};

export default App;
