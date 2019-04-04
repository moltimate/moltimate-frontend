import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import NavBar from './NavBar';

export default function LandingContainer(props) {
  const { classes } = props;

  return (
    <>
      <NavBar />
    </>
  );
}

LandingContainer.propTypes = {
  classes: PropTypes.object,
};
