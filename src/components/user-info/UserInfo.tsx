import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { UserRole } from '../../models/UserRole';

interface UserInfoProps {
  userRole: UserRole;
}

export function UserInfo(props: UserInfoProps) {
  const { account, library } = useWeb3React<JsonRpcProvider>();
  const [balance, setBalance] = useState('');
  useEffect(() => {
    account &&
      library
        ?.getBalance(account as string)
        .then((bal) => setBalance(() => String(bal)))
        .catch(console.error);
  }, [account, library]);
  return (
    <span>
      <span>Your are logged as {props.userRole} | </span>
      <span>
        account: {account} | balance: {balance}
      </span>
    </span>
  );
}
