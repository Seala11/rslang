import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Textbook, Statistics, Games, Registration, Levels, Sprint } from 'src/pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserId, getUserToken, userIsInStorage } from 'src/helpers/storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getUserData, fetchGetUser } from 'src/store/userSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  useEffect(() => {
    if (userIsInStorage() && !userData?.userId) {
      dispatch(fetchGetUser(getUserId(), getUserToken()));
    }
  }, [dispatch, userData]);

  return (
    <div className='page'>
      <ToastContainer autoClose={8000} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/textbook' element={<Textbook />} />
        <Route path='/games' element={<Games />} />
        <Route path='/games/sprint' element={<Sprint />} />
        <Route path='/games/audio' element={<Levels game='audio' />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/login' element={<Registration />} />
      </Routes>
    </div>
  );
};

export default App;
