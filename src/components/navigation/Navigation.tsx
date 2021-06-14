import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useEffect, useState, MouseEvent } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { useUserRole } from '../../hooks/useUserRole';
import { NavigationMenu } from './NavigationMenu';

export function Navigation() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const { role, updateUserRole } = useUserRole();
  const { account } = useAccount();
  useEffect(() => {
    updateUserRole();
  }, [role, updateUserRole, account]);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElement(null);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Medikchain</Typography>
          <NavigationMenu
            role={role}
            anchorElement={anchorElement}
            closeCallback={closeMenu}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
