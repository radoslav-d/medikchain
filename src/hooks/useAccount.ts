import { JsonRpcProvider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';

export function useAccount() {
  const { account, library } = useWeb3React<JsonRpcProvider>();

  const getBalance = async () => {
    const balance = await library?.getBalance(account as string);
    return balance && formatEther(balance);
  };

  return { account, getBalance };
}
