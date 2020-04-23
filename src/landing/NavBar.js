import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

// import Logo from './logo.png';
import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function NavBar(props) {
  const { classes } = props;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolBar}>
        <div className={classes.float}>
          <a href='#about'>
            <Button className={classes.button}>About</Button>
          </a>
          <Link to="/publications">
            <Button className={classes.button}>Publications</Button>
          </Link>
          <a href='https://github.com/moltimate'>
            <Button className={classes.button}>GitHub</Button>
          </a>
        </div>
        <Link to="/search">
          <Button>Start</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

//
export default withStyles(styles)(NavBar);
