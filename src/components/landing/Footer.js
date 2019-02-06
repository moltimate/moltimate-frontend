import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Footer(props) {
  const { classes } = props;

  return (
    <AppBar position="sticky" className={classes.footerText}>
      Licensed under GPL-2.0
    </AppBar>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
