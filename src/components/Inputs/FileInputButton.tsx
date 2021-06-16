import { Button, Fab } from '@material-ui/core';
import { AttachFile, Delete } from '@material-ui/icons';
import { ChangeEvent, useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { uploadFromDevice } from '../../lib/helpers/FileAttachmentUtils';
import { FileAttachment } from '../../lib/types/FileAttachment';

interface FileInputButtonProps {
  onCapture: (file: FileAttachment) => void;
  onUncapture?: () => void;
  className?: string;
}

export function FileInputButton(props: FileInputButtonProps) {
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const [fileName, setFileName] = useState<string>();

  const captureFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      dispatchLoading();
      const name = files[0].name;
      uploadFromDevice(files[0], (buffer) => {
        props.onCapture({ name, buffer });
      });
      setFileName(name);
      dispatchNotLoading();
    }
  };

  const uncaptureFile = () => {
    props.onUncapture && props.onUncapture();
    setFileName(undefined);
  };
  return (
    <div className={props.className}>
      <label style={{ marginRight: '10px' }}>
        <Fab
          color="secondary"
          variant="extended"
          component="span"
          size="medium"
        >
          <AttachFile />
          Upload
        </Fab>
        <input type="file" hidden onChange={captureFile} />
      </label>
      {fileName && (
        <Button
          color="secondary"
          size="small"
          endIcon={<Delete />}
          onClick={uncaptureFile}
        >
          <u>{fileName}</u>
        </Button>
      )}
    </div>
  );
}