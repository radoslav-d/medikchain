import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { JsonRpcProvider } from '@ethersproject/providers';
import { appEnv } from './app/env';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import './App.css';

export function App() {
  const { active, activate, error } = useWeb3React<JsonRpcProvider>();

  useEffect(() => {
    const activateConnector = async () => {
      const injectedConnector = new InjectedConnector({
        supportedChainIds: [appEnv().mandatory.chainId],
      });
      if (!active) {
        await activate(injectedConnector);
      }
      if (error) {
        console.error(error);
      }
    };
    activateConnector();
  }, [active, activate, error]);
  if (!active) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Navbar />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
