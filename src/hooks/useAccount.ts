import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

export function useAccount() {
  const { account } = useWeb3React<JsonRpcProvider>();
  return { account };
}
