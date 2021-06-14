import { isAddress } from '@ethersproject/address';
import { parseEther } from '@ethersproject/units';
import { Fab, Typography } from '@material-ui/core';
import { Edit, FlashOn } from '@material-ui/icons';
import { useState } from 'react';
import { useAppLoading } from '../../hooks/useAppLoading';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { TextInputField } from '../input-fields/TextInputField';
import './GrantAccess.css';

const EDIT_ACCESS_GRANT_ETHER_COST = '1';
const ADMIN_ACCESS_GRANT_ETHER_COST = '2';

export function GrantAccess() {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();
  const { dispatchLoading, dispatchNotLoading } = useAppLoading();
  const [userAddress, setUserAddress] = useState('');

  const grantAccess = async (
    contractFunction: (user: string, overrides?: any) => Promise<void>,
    etherValue: string,
    message: string
  ) => {
    dispatchLoading();
    await contractFunction(userAddress, {
      value: parseEther(etherValue),
    });
    dispatchNotLoading();
    alert(message);
    setUserAddress('');
  };
  const addAdminAccess = async () => {
    await grantAccess(
      grantAdminAccess,
      ADMIN_ACCESS_GRANT_ETHER_COST,
      'Admin access granted!'
    );
  };
  const addEditAccess = async () => {
    await grantAccess(
      grantEditAccess,
      EDIT_ACCESS_GRANT_ETHER_COST,
      'Edit access granted!'
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
        Authorize other users to view and edit personal data by granting them
        edit access. You can also delegate administration rights by granting
        admin access.
      </Typography>
      <div className="grant-access-actions">
        <TextInputField
          className="grant-access-address-input"
          placeholder="User address"
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
          Grant edit access
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
          Grant admin access
        </Fab>
      </div>
    </div>
  );
}
