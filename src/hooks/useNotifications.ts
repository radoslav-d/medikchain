import { useSnackbar } from 'notistack';
import { useTranslator } from './useTranslator';

export function useNotifications() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useTranslator();

  const pushErrorNotification = (message = 'notifications.error') => {
    enqueueSnackbar(translate(message), { variant: 'error' });
  };

  const pushWarnNotification = (message = 'notifications.warning') => {
    enqueueSnackbar(translate(message), { variant: 'warning' });
  };

  const pushSuccessNotification = (message = 'notifications.success') => {
    enqueueSnackbar(translate(message), { variant: 'success' });
  };

  return {
    pushErrorNotification,
    pushWarnNotification,
    pushSuccessNotification,
  };
}
