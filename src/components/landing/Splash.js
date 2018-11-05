import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  menuBar: {
    background: '#011638',
  },
  title: {
    color: '#ECECEC',
    fontSize: '24px',
  },
  button: {
    color: '011638',
    height: '200px',
    width: '300px',
    border: '#011638 1px solid',
    // transition: '0.5s',
    // backgroundSize: '200% auto',
    // boxShadow: '0 0 20px #eee',
    borderRadius: '1px',
    // backgroundImage: 'linear-gradient(to right, #f83600 0%, #f9d423 51%, #f6d365 100%)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '100px',
  }
};

function Splash(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menuBar}>
          <Typography className={classes.title}>
            Moltimate
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.buttonContainer}>
        <Link to="/search">
          <Button className={classes.button}>Search</Button>
        </Link>
        <Link to="/create">
          <Button className={classes.button}>Create</Button>
        </Link>
      </div>
    </div>
  );
}

Splash.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Splash);
