/* eslint-disable react/jsx-handler-names */

import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';

function ControlMenu() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Background color</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}

export default ControlMenu;
