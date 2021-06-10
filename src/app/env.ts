const defaultVariables = {
  chainId: 1337,
  jsonRpcProviderUrl: 'http://127.0.0.1:7545',
};

const environmentVariables = {
  mandatory: {
    chainId:
      (process.env.REACT_APP_CHAIN_ID && +process.env.REACT_APP_CHAIN_ID) ||
      defaultVariables.chainId,
    jsonRpcProviderUrl:
      process.env.REACT_APP_JSON_RPC_PROVIDER_URL ||
      defaultVariables.jsonRpcProviderUrl,
  },
  optional: {},
};

export function appEnv() {
  return environmentVariables;
}
