import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  error: {
    backgroundColor: '#FF6857',
    marginLeft: '50%',
    position: 'fixed',
    marginLeft: '30%',
    width: '35%',
    top: '70px',
  },
  icon: {
    fontSize: 20,
    marginRight: '10px'
  },
  iconVariant: {
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function ErrorBar(props) {
  const classes = useStyles();
  const { open, message, handleClose } = props;

  return (
    <SnackbarContent
      className={classes.error}
      open={open}
      message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon className={classes.icon}/>
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          onClick={() => handleClose(false)}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

ErrorBar.propTypes = {
  classes: PropTypes.object,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool,
};

ErrorBar.defaultProps = {
  open: false
};
