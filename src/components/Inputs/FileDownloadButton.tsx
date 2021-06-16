import { Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import {
  downloadFromIpfs,
  parseFileSummary,
} from '../../lib/helpers/FileAttachmentUtils';

interface FileDownloadButtonProps {
  fileInfo: string;
}

export function FileDownloadButton(props: FileDownloadButtonProps) {
  const parsedFileInfo = parseFileSummary(props.fileInfo);
  if (!parsedFileInfo) {
    return null;
  }
  const { fileName, ipfsPath } = parsedFileInfo;
  return (
    <div>
      <Fab
        variant="extended"
        onClick={() => downloadFromIpfs(fileName, ipfsPath)}
        size="medium"
        color="primary"
      >
        <GetApp />
        <u style={{ marginLeft: '10px' }}>{fileName}</u>
      </Fab>
    </div>
  );
}
