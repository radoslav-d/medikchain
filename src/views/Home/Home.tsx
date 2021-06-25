import { Typography } from '@material-ui/core';
import {
  LockOpen,
  MeetingRoom,
  PersonPin,
  SupervisedUserCircle,
} from '@material-ui/icons';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useTranslator } from '../../hooks/useTranslator';
import { useUserRole } from '../../hooks/useUserRole';
import { getNavigationOptions } from '../../lib/helpers/UserRoleHelper';
import { NavigationOptions } from '../../lib/types/NavigationOptions';
import { HomeOptionCard } from './HomeOptionCard';
import './Home.css';

export function Home() {
  const { account } = useAccount();
  const { userRole } = useUserRole();
  const { translate } = useTranslator();
  const history = useHistory();

  const cardOptions = useMemo(() => {
    return {
      [NavigationOptions.REGISTER]: {
        title: 'navigation.register',
        description: 'home-screen-options.register',
        onClick: () => history.push('/register'),
        icon: <MeetingRoom color="primary" />,
      },
      [NavigationOptions.VIEW_PERSONAL_DATA]: {
        title: 'navigation.your-data',
        description: 'home-screen-options.your-data',
        onClick: () => history.push(`/patient-records/${account}`),
        icon: <PersonPin color="primary" />,
      },
      [NavigationOptions.MANAGE_PATIENT_DATA]: {
        title: 'navigation.manage-data',
        description: 'home-screen-options.manage-data',
        onClick: () => history.push('/patient-records'),
        icon: <SupervisedUserCircle color="primary" />,
      },
      [NavigationOptions.GIVE_ACCESS_RIGHTS]: {
        title: 'navigation.give-access',
        description: 'home-screen-options.give-access',
        onClick: () => history.push('/give-access'),
        icon: <LockOpen color="primary" />,
      },
    };
  }, [account, history]);

  return (
    <div>
      <div className="home-description-wrapper">
        <Typography variant="h3" color="primary">
          {translate('view-labels.home')}
        </Typography>
      </div>
      <div className="home-card-options-wrapper">
        {getNavigationOptions(userRole).map((key) => (
          <HomeOptionCard
            key={key}
            title={translate(cardOptions[key].title)}
            description={translate(cardOptions[key].description)}
            icon={cardOptions[key].icon}
            onClick={cardOptions[key].onClick}
          />
        ))}
      </div>
    </div>
  );
}
