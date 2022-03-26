import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" className="menu_links">
            Группы
          </Link>
        </Typography>
        <Link to="/cats" className="menu_links">
        <Typography variant="h6" component="div">
          Кетегории
        </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
