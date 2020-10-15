import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Modal(props) {
  const {modalOpen, setModalOpen} = props;
  return (
    <Dialog  aria-labelledby="customized-dialog-title" open={modalOpen}>
      <DialogTitle id="customized-dialog-title">
        Search Box Modal
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={() => setModalOpen(!modalOpen)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Modal.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Modal);
