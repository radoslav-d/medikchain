import { create } from 'ipfs-http-client';
import { appEnv } from '../app/env';

export function useIpfsClient() {
  const ipfsUploadUrl = appEnv().mandatory.ipfsUploadUrl;
  const ipfsDownloadUrl = appEnv().mandatory.ipfsDownloadUrl;
  const client = create({ url: ipfsUploadUrl });

  const downloadFromIpfs = (fileName: string, filePath: string) => {
    const fileUrl = `${ipfsDownloadUrl}/${filePath}`;
    const element = document.createElement('a');
    element.download = fileName;
    element.href = fileUrl;
    element.target = '_blank';
    element.click();
  };

  return {
    uploadToIpfs: client.add,
    downloadFromIpfs,
  };
}
