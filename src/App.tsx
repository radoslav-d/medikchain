import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { JsonRpcProvider } from '@ethersproject/providers';
import { appEnv } from './app/env';
import { BackdropSpinner } from './components/backdrop-spinner/BackdropSpinner';
import './App.css';
import { useAppLoading } from './hooks/useAppLoading';
import { Router } from './Router';

export function App() {
  const { active, activate, error } = useWeb3React<JsonRpcProvider>();
  const { isAppLoading } = useAppLoading();
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
    return <div>Web3 is not loaded yet...</div>;
  }
  return (
    <div>
      <Router />
      <BackdropSpinner opened={isAppLoading} />
    </div>
  );
}
