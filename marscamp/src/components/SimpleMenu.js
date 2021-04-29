import React, { useState } from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';
import { useHistory } from 'react-router';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const userToken = JSON.parse(localStorage.getItem('token'));

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAnchorEl(null);
    history.push('/signin');
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary">
        {userToken[0].first_and_last_name[0]}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
