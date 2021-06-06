import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useState} from "react";

export function Navbar() {
    const {account, library} = useWeb3React<Web3Provider>();
    const [balance, setBalance] = useState('');
    if (!account) {
        // TODO some error handling maybe
        console.error("No account id");
    }
    library?.getBalance(String(account))
        .then(bal => setBalance(() => String(bal)))
        .catch(console.error);
    return (
      <div>
          account: {account} | balance: {balance}
      </div>
    );
}