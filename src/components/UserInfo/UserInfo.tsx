import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { useTranslator } from '../../hooks/useTranslator';
import { UserRole } from '../../lib/types/UserRole';
import './UserInfo.css';

interface UserInfoProps {
  userRole: UserRole;
}

export function UserInfo(props: UserInfoProps) {
  const { account, getBalance } = useAccount();
  const { translate } = useTranslator();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    getBalance().then(setBalance);
  }, [account, getBalance]);
  return (
    <div className="user-info">
      <Typography variant="subtitle1">
        {`${translate('user-info.logged-as')} ${translate(`user-roles.${props.userRole}`)}`}
      </Typography>
      <Typography variant="subtitle2">
        {`${translate('user-info.account')}: ${account} | ${translate(
          'user-info.balance'
        )}: ${balance}`}
      </Typography>
    </div>
  );
}
