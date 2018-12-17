import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import Logo from './logo.png';
import MenuButton from './MenuButton';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function NavBar(props) {
  const { classes } = props;

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBar}>
        <img alt="MOltimate logo" className={classes.logo} src={Logo} />
        <div className={classes.float}>
          <Link to='#about'>
            <Button className={classes.button}>About</Button>
          </Link>
          <Link to='#publications'>
            <Button className={classes.button}>Publications</Button>
          </Link>
          <MenuButton />
        </div>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
