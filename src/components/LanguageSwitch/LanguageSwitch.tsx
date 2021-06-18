import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Translate } from '@material-ui/icons';
import { MouseEvent, useMemo, useState } from 'react';
import { useTranslator } from '../../hooks/useTranslator';

export function LanguageSwitch() {
  const { changeLanguage, getAvailableLanguages, translate } = useTranslator();
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElement(null);
  };
  const languageOptions = useMemo(
    () => getAvailableLanguages(),
    [getAvailableLanguages]
  );
  return (
    <div>
      <Tooltip title={translate('tooltips.translate')} placement="bottom">
        <IconButton color="inherit" onClick={openMenu} edge="end">
          <Translate />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={!!anchorElement}
        onClose={closeMenu}
      >
        {languageOptions.map((language) => (
          <MenuItem
            onClick={() => {
              closeMenu();
              changeLanguage(language);
            }}
          >
            {language}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
