import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/app/App';
import 'src/sass/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') ?? document.body);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
