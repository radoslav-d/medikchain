import { IconButton } from '@material-ui/core';
import { AssignmentReturned } from '@material-ui/icons';
import {
  downloadFromIpfs,
  parseFileSummary,
} from '../../lib/helpers/FileAttachmentUtils';

interface FileDownloaderProps {
  fileInfo: string;
}

export function FileDownloader(props: FileDownloaderProps) {
  const parsedFileInfo = parseFileSummary(props.fileInfo);
  if (!parsedFileInfo) {
    return null;
  }
  const { fileName, ipfsPath } = parsedFileInfo;
  return (
    <div>
      <IconButton onClick={() => downloadFromIpfs(fileName, ipfsPath)}>
        <AssignmentReturned />
      </IconButton>
      <u>{fileName}</u>
    </div>
  );
}
