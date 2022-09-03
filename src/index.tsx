import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'src/app/App';
import { store } from './store';
import 'src/sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
