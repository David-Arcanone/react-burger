import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './services/store/store';//Хранилище тут
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement

);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
