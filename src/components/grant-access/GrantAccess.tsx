import { isAddress } from '@ethersproject/address';
import { parseEther } from '@ethersproject/units';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { TextInputField } from '../input-fields/TextInputField';

const EDIT_ACCESS_GRANT_ETHER_COST = '1';
const ADMIN_ACCESS_GRANT_ETHER_COST = '2';

export function GrantAccess() {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const grantAccess = async (
    contractFunction: (user: string, overrides?: any) => Promise<void>,
    etherValue: string,
    message: string
  ) => {
    setLoading(true);
    await contractFunction(userAddress, {
      value: parseEther(etherValue),
    });
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
    return !isAddress(userAddress) || loading;
  };
  return (
    <div>
      <TextInputField
        placeholder="User address"
        value={userAddress}
        onChange={setUserAddress}
        required
        address
      />
      <Button onClick={addEditAccess} disabled={shouldDisableButton()}>
        Grant edit access
      </Button>
      <Button onClick={addAdminAccess} disabled={shouldDisableButton()}>
        Grant admin access
      </Button>
    </div>
  );
}
