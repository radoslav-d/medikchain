import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect, useState } from "react";

export function Navbar() {
  const { account, library } = useWeb3React<JsonRpcProvider>();
  const [balance, setBalance] = useState("");
  useEffect(() => {
    account &&
      library
        ?.getBalance(account as string)
        .then((bal) => setBalance(() => String(bal)))
        .catch(console.error);
  });
  return (
    <div>
      account: {account} | balance: {balance}
    </div>
  );
}
