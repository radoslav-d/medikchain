import { create } from 'ipfs-http-client';
import { appEnv } from '../app/env';

export function useIpfsClient() {
  const ipfsUrl = appEnv().mandatory.ipfsUrl;
  const client = create({ url: ipfsUrl });
  return {
    uploadToIpfs: client.add,
  };
}
