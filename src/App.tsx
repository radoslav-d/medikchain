import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useNotifications } from './hooks/useNotifications';
import { appEnv } from './state/env';
import { BackdropSpinner } from './components/BackdropSpinner/BackdropSpinner';
import { useAppLoading } from './hooks/useAppLoading';
import { Router } from './Router';

export function App() {
  const { account, active, activate, error } = useWeb3React<JsonRpcProvider>();
  const { isAppLoading } = useAppLoading();
  const { pushErrorNotification } = useNotifications();

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
        pushErrorNotification(error.message);
      }
    };
    activateConnector();
  }, [account, active, activate, error]);

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
