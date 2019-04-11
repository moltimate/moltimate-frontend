import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Handle404(props) {
  const { classes } = props;

  return (
    <>
      <NavBar />
      <div className={classes.handle404}>
        <Typography className={classes.title}>The Big 404!</Typography>
        <Typography className={classes.subTitle}>Looks like something went wrong.</Typography>
        <img className={classes.imageSize} src="https://cdn.dribbble.com/users/948184/screenshots/3787246/render.gif"/>
      </div>
    </>
  );
}

Handle404.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Handle404);
