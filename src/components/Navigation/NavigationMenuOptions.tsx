import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { ReactNode } from 'react';
import { UserRole } from '../../lib/types/UserRole';

interface NavigationMenuOptionProps {
  onSelect: () => void;
  icon: ReactNode;
  label: string;
}

export function NavigationMenuOption(props: NavigationMenuOptionProps) {
  return (
    <MenuItem onClick={props.onSelect}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </MenuItem>
  );
}

export enum MenuOptionKeys {
  REGISTER,
  VIEW_PERSONAL_DATA,
  MANAGE_PATIENT_DATA,
  GIVE_ACCESS_RIGHTS,
}

export const getOptionsForUserRole = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return [
        MenuOptionKeys.VIEW_PERSONAL_DATA,
        MenuOptionKeys.MANAGE_PATIENT_DATA,
        MenuOptionKeys.GIVE_ACCESS_RIGHTS,
      ];
    case UserRole.PHYSICIAN:
      return [
        MenuOptionKeys.VIEW_PERSONAL_DATA,
        MenuOptionKeys.MANAGE_PATIENT_DATA,
      ];
    case UserRole.PATIENT:
      return [MenuOptionKeys.VIEW_PERSONAL_DATA];
    case UserRole.GUEST:
    default:
      return [MenuOptionKeys.REGISTER];
  }
};
