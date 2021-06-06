import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {Web3ReactProvider} from '@web3-react/core';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {Web3Provider} from '@ethersproject/providers';

function getLibrary(provider: any) {
    const web3Provider = new Web3Provider(provider);
    web3Provider.pollingInterval = 12000; // TODO move to a constant
    return web3Provider;
}

ReactDOM.render(
  <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
          <Provider store={store}>
              <App />
          </Provider>
      </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
