import { useSnackbar } from 'notistack';

export function useNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const pushErrorNotification = (message = 'Error occurred') => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const pushWarnNotification = (message = 'Warning') => {
    enqueueSnackbar(message, { variant: 'warning' });
  };

  const pushSuccessNotification = (message = 'Success') => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  return {
    pushErrorNotification,
    pushWarnNotification,
    pushSuccessNotification,
  };
}
