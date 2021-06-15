import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { UserRole } from '../../lib/types/UserRole';
import './UserInfo.css';

interface UserInfoProps {
  userRole: UserRole;
}

export function UserInfo(props: UserInfoProps) {
  const { account, getBalance } = useAccount();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    getBalance().then(setBalance);
  }, [account, getBalance]);
  return (
    <div className="user-info">
      <Typography variant="subtitle1">
        Your are logged as {props.userRole}
      </Typography>
      <Typography variant="subtitle2">
        account: {account} | balance: {balance}
      </Typography>
    </div>
  );
}
