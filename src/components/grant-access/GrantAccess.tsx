import {isAddress} from "@ethersproject/address";
import { parseEther } from '@ethersproject/units';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';

const EDIT_ACCESS_GRANT_ETHER_COST = '1';
const ADMIN_ACCESS_GRANT_ETHER_COST = '2';

export function GrantAccess() {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();
  const [userAddress, setUserAddress] = useState('');

  const addEditAccess = () => {
    grantEditAccess(userAddress, {
      value: parseEther(EDIT_ACCESS_GRANT_ETHER_COST),
    }).then(() => {
      setUserAddress('');
      console.log('Edit access granted!');
    });
  };
  const addAdminAccess = () => {
    grantAdminAccess(userAddress, {
      value: parseEther(ADMIN_ACCESS_GRANT_ETHER_COST),
    }).then(() => {
      setUserAddress('');
      console.log('Admin access granted!');
    });
  };
  return (
    <div>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <Button onClick={addEditAccess} disabled={!isAddress(userAddress)}>Grant edit access</Button>
      <Button onClick={addAdminAccess} disabled={!isAddress(userAddress)}>Grant admin access</Button>
    </div>
  );
}
