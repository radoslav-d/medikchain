import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { App } from './App';
import { store } from './app/store';
import { appEnv } from './app/env';
import * as serviceWorker from './serviceWorker';
import './index.css';

function getLibrary(): JsonRpcProvider {
  const providerUrl = appEnv().mandatory.jsonRpcProviderUrl;
  return new JsonRpcProvider(providerUrl);
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
