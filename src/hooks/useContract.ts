import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { ContractInterface } from "@ethersproject/contracts/src.ts/index";

export function useContract(
  contractAddress: string,
  contractAbi: ContractInterface
): Contract {
  const { library } = useWeb3React<JsonRpcProvider>();
  const signer = library?.getSigner(0);
  return new Contract(contractAddress, contractAbi, signer);
}
