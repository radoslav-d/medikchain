import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { ReactNode } from 'react';

interface MenuOptionProps {
  onSelect: () => void;
  icon: ReactNode;
  label: string;
}

export function MenuOption(props: MenuOptionProps) {
  return (
    <MenuItem onClick={props.onSelect}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
    </MenuItem>
  );
}
