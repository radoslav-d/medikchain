import {JsonRpcProvider} from "@ethersproject/providers";
import {useWeb3React} from "@web3-react/core";
import {useMedikChainApi} from "../../hooks/useMedikChainApi";

export function Greeting() {
    const {account} = useWeb3React<JsonRpcProvider>();
    const {canEdit, canGiveAccess} = useMedikChainApi();

    return (
        <div>
            Your are logged as TODO
        </div>
    )
}