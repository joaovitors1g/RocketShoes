import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import Routes from './routes';

import GlobalStyles from './styles/global';

import Header from './components/Header';

import './config/ReactotronConfig';

import store from './store';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyles />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
