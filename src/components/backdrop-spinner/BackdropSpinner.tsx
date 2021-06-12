import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
      backdropSpinner: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    })
);

interface BackdropSpinnerProps {
  opened: boolean;
}

export function BackdropSpinner(props: BackdropSpinnerProps) {
  const styles = useStyles();
  return (
    <Backdrop className={styles.backdropSpinner} open={props.opened}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
