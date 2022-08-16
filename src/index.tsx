import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from 'src/app/App';
import 'src/sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
