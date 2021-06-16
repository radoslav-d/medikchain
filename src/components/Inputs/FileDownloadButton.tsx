import { Fab, Tooltip } from '@material-ui/core';
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
      <Tooltip title="Download this file on your device">
        <Fab
          variant="extended"
          onClick={() => downloadFromIpfs(fileName, ipfsPath)}
          size="medium"
          color="primary"
        >
          <GetApp />
          <u style={{ marginLeft: '10px' }}>{fileName}</u>
        </Fab>
      </Tooltip>
    </div>
  );
}
