import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function About(props) {
  const { classes } = props;

  return (
    <div className={classes.root} style={{padding: '200px'}}>
      This is the about section
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
