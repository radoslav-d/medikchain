import { parseEther } from '@ethersproject/units';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';
import { PropsWithUserAddress } from '../../models/PropsWithUserAddress';

export function GrantAccess(props: PropsWithUserAddress) {
  const { grantEditAccess, grantAdminAccess } = useMedikChainApi();

  const addEditAccess = () =>
    grantEditAccess(props.userAddress, { value: parseEther('1') });
  const addAdminAccess = () =>
    grantAdminAccess(props.userAddress, { value: parseEther('2') });

  return (
    <div>
      <button onClick={addEditAccess}>Grant edit access</button>
      <button onClick={addAdminAccess}>Grant admin access</button>
    </div>
  );
}
