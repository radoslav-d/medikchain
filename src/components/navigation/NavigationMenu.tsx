import { Menu } from '@material-ui/core';
import {
  LockOpen,
  MeetingRoom,
  Person,
  SupervisedUserCircle,
  Home as HomeIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { UserRole } from '../../models/UserRole';
import { NavigationMenuOption } from './NavigationMenuOptions';

interface NavigationMenuProps {
  role: UserRole;
  anchorElement: HTMLElement | null;
  closeCallback?: () => void;
}

enum MenuOptionKeys {
  REGISTER,
  VIEW_PERSONAL_DATA,
  MANAGE_PATIENT_DATA,
  GIVE_ACCESS_RIGHTS,
}

export function NavigationMenu(props: NavigationMenuProps) {
  const history = useHistory();
  const { account } = useAccount();
  const onOptionSelected = (navigateTo: string) => {
    props.closeCallback && props.closeCallback();
    history.push(navigateTo);
  };

  const registerOption = (
    <NavigationMenuOption
      key={MenuOptionKeys.REGISTER}
      label="Register as patient"
      onSelect={() => onOptionSelected('/register')}
      icon={<MeetingRoom />}
    />
  );
  const reviewPersonalDataOption = (
    <NavigationMenuOption
      key={MenuOptionKeys.VIEW_PERSONAL_DATA}
      label="Your medical data"
      onSelect={() => onOptionSelected(`/patient-records/${account}`)}
      icon={<Person />}
    />
  );
  const managePatientDataOption = (
    <NavigationMenuOption
      key={MenuOptionKeys.MANAGE_PATIENT_DATA}
      label="View or add patient medical records"
      onSelect={() => onOptionSelected('/patient-records')}
      icon={<SupervisedUserCircle />}
    />
  );

  const giveRightsOption = (
    <NavigationMenuOption
      key={MenuOptionKeys.GIVE_ACCESS_RIGHTS}
      label="Give access to a user"
      onSelect={() => onOptionSelected('/give-access')}
      icon={<LockOpen />}
    />
  );

  const getRoleOptions = () => {
    switch (props.role) {
      case UserRole.ADMINISTRATOR:
        return [
          reviewPersonalDataOption,
          managePatientDataOption,
          giveRightsOption,
        ];
      case UserRole.PHYSICIAN:
        return [reviewPersonalDataOption, managePatientDataOption];
      case UserRole.PATIENT:
        return [reviewPersonalDataOption];
      case UserRole.GUEST:
      default:
        return [registerOption];
    }
  };

  return (
    <Menu
      anchorEl={props.anchorElement}
      keepMounted
      open={!!props.anchorElement}
      onClose={props.closeCallback}
    >
      <NavigationMenuOption
        label="Home"
        onSelect={() => onOptionSelected('/')}
        icon={<HomeIcon />}
      />
      {getRoleOptions()}
    </Menu>
  );
}
