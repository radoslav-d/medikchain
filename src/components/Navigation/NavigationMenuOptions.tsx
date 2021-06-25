import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { ReactNode } from 'react';

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
