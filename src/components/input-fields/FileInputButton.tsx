import { Button } from '@material-ui/core';

// TODO
export function FileInputButton() {
  return (
    <div>
      <input
        id="contained-button-file"
        type="file"
        multiple
        hidden
        onChange={(e) => {
          console.log(e.target.value);
          console.log(e.target.files);
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}
