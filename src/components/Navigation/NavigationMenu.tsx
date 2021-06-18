import { Menu } from '@material-ui/core';
import {
  LockOpen,
  MeetingRoom,
  Person,
  SupervisedUserCircle,
  Home as HomeIcon,
} from '@material-ui/icons';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useTranslator } from '../../hooks/useTranslator';
import { UserRole } from '../../lib/types/UserRole';
import {
  getOptionsForUserRole,
  MenuOptionKeys,
  NavigationMenuOption,
} from './NavigationMenuOptions';

interface NavigationMenuProps {
  role: UserRole;
  anchorElement: HTMLElement | null;
  closeCallback?: () => void;
}

export function NavigationMenu(props: NavigationMenuProps) {
  const history = useHistory();
  const { account } = useAccount();
  const { translate } = useTranslator();
  const { role, anchorElement, closeCallback } = props;

  const onOptionSelected = useCallback(
    (navigateTo: string) => {
      closeCallback && closeCallback();
      history.push(navigateTo);
    },
    [history, closeCallback]
  );

  const menuOptionsData = useMemo(() => {
    return {
      [MenuOptionKeys.REGISTER]: {
        label: 'navigation.register',
        onSelect: () => onOptionSelected('/register'),
        icon: <MeetingRoom />,
      },
      [MenuOptionKeys.VIEW_PERSONAL_DATA]: {
        label: 'navigation.your-data',
        onSelect: () => onOptionSelected(`/patient-records/${account}`),
        icon: <Person />,
      },
      [MenuOptionKeys.MANAGE_PATIENT_DATA]: {
        label: 'navigation.manage-data',
        onSelect: () => onOptionSelected('/patient-records'),
        icon: <SupervisedUserCircle />,
      },
      [MenuOptionKeys.GIVE_ACCESS_RIGHTS]: {
        label: 'navigation.give-access',
        onSelect: () => onOptionSelected('/give-access'),
        icon: <LockOpen />,
      },
    };
  }, [account, closeCallback]);
  return (
    <Menu
      anchorEl={anchorElement}
      keepMounted
      open={!!anchorElement}
      onClose={closeCallback}
    >
      <NavigationMenuOption
        label={translate('navigation.home')}
        onSelect={() => onOptionSelected('/')}
        icon={<HomeIcon />}
      />
      {getOptionsForUserRole(role).map((key) => (
        <NavigationMenuOption
          key={key}
          label={translate(menuOptionsData[key].label)}
          onSelect={menuOptionsData[key].onSelect}
          icon={menuOptionsData[key].icon}
        />
      ))}
    </Menu>
  );
}
