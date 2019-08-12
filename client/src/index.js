import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';

import './assets/styles/normalize.css';
import './assets/styles/common.module.sass';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import store from './store';

ReactModal.setAppElement(document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
