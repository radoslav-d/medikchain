import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChangeEvent, useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';

interface FileInputButtonProps {
  onCapture: (fileName: string, fileBuffer: Buffer) => void;
  onUncapture?: () => void;
}

export function FileInputButton(props: FileInputButtonProps) {
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const [fileName, setFileName] = useState<string>();

  const captureFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      dispatchLoading();
      setFileName(files[0].name);
      const reader = new FileReader();
      reader.readAsArrayBuffer(files[0]);
      reader.onloadend = () => {
        const buffer = new Buffer(reader.result as ArrayBuffer);
        props.onCapture(files[0].name, buffer);
        dispatchNotLoading();
      };
    }
  };
  const uncaptureFile = () => {
    props.onUncapture && props.onUncapture();
    setFileName(undefined);
  };
  return (
    <div>
      <input
        id="contained-button-file"
        type="file"
        hidden
        onChange={captureFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      {fileName && (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          endIcon={<DeleteIcon />}
          onClick={uncaptureFile}
        >
          <u>{fileName}</u>
        </Button>
      )}
    </div>
  );
}
