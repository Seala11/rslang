/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Registration } from 'src/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { getUserId, getUserToken, userIsLogged } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUserData, fetchGetUser } from 'src/store/userSlice';

const App: React.FC = () => {
  console.log('here')
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  useEffect(() => {
    console.log('18', userIsLogged())
    console.log('19', userData)
    if (userIsLogged() && !userData?.userId) {
      dispatch(fetchGetUser(getUserId(), getUserToken()));
      console.log('from app', userData);
    }
  }, [dispatch, userData]);

  return (
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
};

export default App;
