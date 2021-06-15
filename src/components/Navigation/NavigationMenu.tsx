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
        label: 'Register as patient',
        onSelect: () => onOptionSelected('/register'),
        icon: <MeetingRoom />,
      },
      [MenuOptionKeys.VIEW_PERSONAL_DATA]: {
        label: 'Your medical data',
        onSelect: () => onOptionSelected(`/patient-records/${account}`),
        icon: <Person />,
      },
      [MenuOptionKeys.MANAGE_PATIENT_DATA]: {
        label: 'View or add patient medical records',
        onSelect: () => onOptionSelected('/patient-records'),
        icon: <SupervisedUserCircle />,
      },
      [MenuOptionKeys.GIVE_ACCESS_RIGHTS]: {
        label: 'Give access to a user',
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
        label="Home"
        onSelect={() => onOptionSelected('/')}
        icon={<HomeIcon />}
      />
      {getOptionsForUserRole(role).map((key) => (
        <NavigationMenuOption
          label={menuOptionsData[key].label}
          onSelect={menuOptionsData[key].onSelect}
          icon={menuOptionsData[key].icon}
        />
      ))}
    </Menu>
  );
}
