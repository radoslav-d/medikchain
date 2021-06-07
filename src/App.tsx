import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { JsonRpcProvider } from "@ethersproject/providers";
import { appEnv } from "./app/env";
import { Navbar } from "./components/navbar/Navbar";
import { AddRecordForm } from "./components/add-record-form/AddRecordForm";
import "./App.css";
import { RecordList } from "./components/record-list/RecordList";

export function App() {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [appEnv().mandatory.chainId],
  });
  const { active, activate, error } = useWeb3React<JsonRpcProvider>();
  useEffect(() => {
    if (!active) {
      activate(injectedConnector)
        .then(() => console.log("Web3 successfully activated"))
        .catch(console.error);
    }
    if (error) {
      console.error(error);
    }
  });
  if (!active) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <AddRecordForm
        userAddress={"0x03D4617D755b2521f3Ead1F17206C7D3D4E2A100"}
      />
      <RecordList userAddress={"0x03D4617D755b2521f3Ead1F17206C7D3D4E2A100"} />
    </div>
  );
}
