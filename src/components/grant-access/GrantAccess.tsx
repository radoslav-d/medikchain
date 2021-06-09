import { parseEther } from '@ethersproject/units';
import { Button } from '@material-ui/core';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { PropsWithUserAddress } from '../../models/PropsWithUserAddress';

const EDIT_ACCESS_GRANT_ETHER_COST = '1';
const ADMIN_ACCESS_GRANT_ETHER_COST = '2';

export function GrantAccess(props: PropsWithUserAddress) {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();

  const addEditAccess = () => {
    grantEditAccess(props.userAddress, {
      value: parseEther(EDIT_ACCESS_GRANT_ETHER_COST),
    })
      .then(() => {
        console.log('Edit access granted!');
      });
  };
  const addAdminAccess = () => {
    grantAdminAccess(props.userAddress, {
      value: parseEther(ADMIN_ACCESS_GRANT_ETHER_COST),
    })
      .then(() => {
        console.log('Admin access granted!');
      });
  };

  return (
    <div>
      <Button onClick={addEditAccess}>Grant edit access</Button>
      <Button onClick={addAdminAccess}>Grant admin access</Button>
    </div>
  );
}
