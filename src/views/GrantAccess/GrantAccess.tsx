import { isAddress } from '@ethersproject/address';
import { parseEther } from '@ethersproject/units';
import { Fab, Typography } from '@material-ui/core';
import { Edit, FlashOn } from '@material-ui/icons';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { useNotifications } from '../../hooks/useNotifications';
import { TextInputField } from '../../components/Inputs/TextInputField';
import './GrantAccess.css';
import { useTranslator } from '../../hooks/useTranslator';

const EDIT_ACCESS_GRANT_ETHER_COST = '1';
const ADMIN_ACCESS_GRANT_ETHER_COST = '2';

export function GrantAccess() {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const { translate } = useTranslator();
  const { pushErrorNotification, pushSuccessNotification } = useNotifications();
  const [userAddress, setUserAddress] = useState('');

  const grantAccess = async (
    contractFunction: (user: string, overrides?: any) => Promise<void>,
    etherValue: string,
    message: string
  ) => {
    dispatchLoading();
    try {
      await contractFunction(userAddress, {
        value: parseEther(etherValue),
      });
      pushSuccessNotification(message);
      setUserAddress('');
    } catch (e) {
      pushErrorNotification('notifications.grant-access-error');
    } finally {
      dispatchNotLoading();
    }
  };
  const addAdminAccess = async () => {
    await grantAccess(
      grantAdminAccess,
      ADMIN_ACCESS_GRANT_ETHER_COST,
      'notifications.grant-admin-access-success'
    );
  };
  const addEditAccess = async () => {
    await grantAccess(
      grantEditAccess,
      EDIT_ACCESS_GRANT_ETHER_COST,
      'notifications.grant-edit-access-success'
    );
  };
  const shouldDisableButton = () => {
    return !isAddress(userAddress);
  };
  return (
    <div className="grant-access">
      <Typography
        className="grant-access-description"
        variant="h5"
        color="primary"
      >
        {translate('view-labels.grant-access')}
      </Typography>
      <div className="grant-access-actions">
        <TextInputField
          className="grant-access-address-input"
          placeholder={translate('input-labels.user-address')}
          value={userAddress}
          onChange={setUserAddress}
          address
        />
        <Fab
          className="grant-access-button"
          variant="extended"
          size="medium"
          color="primary"
          onClick={addEditAccess}
          disabled={shouldDisableButton()}
        >
          <Edit />
          {translate('input-labels.grant-edit-access-button')}
        </Fab>
        <Fab
          className="grant-access-button"
          variant="extended"
          size="medium"
          color="secondary"
          onClick={addAdminAccess}
          disabled={shouldDisableButton()}
        >
          <FlashOn />
          {translate('input-labels.grant-admin-access-button')}
        </Fab>
      </div>
    </div>
  );
}
