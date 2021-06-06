import React, {useEffect} from 'react';
import {useWeb3React} from '@web3-react/core';
import {InjectedConnector} from '@web3-react/injected-connector';
import {Web3Provider} from "@ethersproject/providers";
import {Navbar} from './components/navbar/Navbar';
import './App.css';

export function App() {
    const injectedConnector = new InjectedConnector({
        supportedChainIds: [
            1337 // TODO find a better way for specifying this
        ],
    });
    const web3 = useWeb3React<Web3Provider>();
    useEffect(() => {
        if (!web3.active) {
            web3.activate(injectedConnector)
                .then(() => console.log('Web3 successfully activated'))
                .catch(console.error);
        }
    });
    return (
        <div>
            <Navbar/>
        </div>
    );
}