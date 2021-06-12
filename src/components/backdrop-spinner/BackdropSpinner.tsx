import { Backdrop, CircularProgress } from '@material-ui/core';
import './BackdropSpinner.css';

interface BackdropSpinnerProps {
  opened: boolean;
}

export function BackdropSpinner(props: BackdropSpinnerProps) {
  return (
    <Backdrop className="backdrop-spinner" open={props.opened}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
