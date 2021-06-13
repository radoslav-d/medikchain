import { IconButton } from '@material-ui/core';
import { AssignmentReturned } from '@material-ui/icons';
import { useIpfsClient } from '../../hooks/useIpfs';

interface FileDownloaderProps {
  fileInfo: string;
}

export function FileDownloader(props: FileDownloaderProps) {
  const { downloadFromIpfs } = useIpfsClient();
  const fileParts = props.fileInfo.split(':');
  if (fileParts.length !== 2) {
    return null;
  }
  const filePath = fileParts[0];
  const fileName = fileParts[1];

  return (
    <div>
      <IconButton onClick={() => downloadFromIpfs(fileName, filePath)}>
        <AssignmentReturned />
      </IconButton>
      <u>{fileName}</u>
    </div>
  );
}
