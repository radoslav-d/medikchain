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
    const getBalance = async () => {
      if (account) {
        const balanceResult = await library?.getBalance(account as string);
        setBalance(String(balanceResult));
      }
    };
    getBalance();
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
