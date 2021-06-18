import { Fab, Tooltip } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { useTranslator } from '../../hooks/useTranslator';
import {
  downloadFromIpfs,
  parseFileSummary,
} from '../../lib/helpers/FileAttachmentUtils';

interface FileDownloadButtonProps {
  fileInfo: string;
}

export function FileDownloadButton(props: FileDownloadButtonProps) {
  const { translate } = useTranslator();
  const parsedFileInfo = parseFileSummary(props.fileInfo);
  if (!parsedFileInfo) {
    return null;
  }
  const { fileName, ipfsPath } = parsedFileInfo;
  return (
    <div>
      <Tooltip title={translate('tooltips.download-button')}>
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
