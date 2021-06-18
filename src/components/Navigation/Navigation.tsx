import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useEffect, useState, MouseEvent } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { useTranslator } from '../../hooks/useTranslator';
import { useUserRole } from '../../hooks/useUserRole';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { UserInfo } from '../UserInfo/UserInfo';
import { NavigationMenu } from './NavigationMenu';
import './Navigation.css';

export function Navigation() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const { role, updateUserRole } = useUserRole();
  const { account } = useAccount();
  const { translate } = useTranslator();
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
    <div style={{ flexGrow: 1 }} className="navigation-bar">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography className="navigation-title" variant="h6">
            {translate('navigation.title')}
          </Typography>
          <NavigationMenu
            role={role}
            anchorElement={anchorElement}
            closeCallback={closeMenu}
          />
          <UserInfo userRole={role} />
          <LanguageSwitch />
        </Toolbar>
      </AppBar>
    </div>
  );
}
