import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useState, MouseEvent } from 'react';
import { useTranslator } from '../../hooks/useTranslator';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { UserInfo } from '../UserInfo/UserInfo';
import { NavigationMenu } from './NavigationMenu';
import './Navigation.css';

export function Navigation() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const { translate } = useTranslator();

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElement(null);
  };
  return (
    <div className="navigation-bar">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography className="navigation-title" variant="h6">
            {translate('navigation.title')}
          </Typography>
          <NavigationMenu
            anchorElement={anchorElement}
            closeCallback={closeMenu}
          />
          <UserInfo />
          <LanguageSwitch />
        </Toolbar>
      </AppBar>
    </div>
  );
}
