import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ChangeEvent, useState } from 'react';
import { BackdropSpinner } from '../backdrop-spinner/BackdropSpinner';

interface FileInputButtonProps {
  onCapture: (fileName: string, fileBuffer: Buffer) => void;
  onUncapture?: () => void;
}

export function FileInputButton(props: FileInputButtonProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>();

  const captureFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setLoading(true);
      setFileName(files[0].name);
      const reader = new FileReader();
      reader.readAsArrayBuffer(files[0]);
      reader.onloadend = () => {
        const buffer = new Buffer(reader.result as ArrayBuffer);
        props.onCapture(files[0].name, buffer);
        setLoading(false);
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
        <Button variant="contained" component="span" disabled={loading}>
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
      <BackdropSpinner opened={loading} />
    </div>
  );
}
