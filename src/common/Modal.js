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
import HelpIcon from '@material-ui/icons/Help'

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function Modal(props) {
  const {classes, text} = props;
  const {modalTitle, modalBody} = text;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <Button size="small" onClick={() => setModalOpen(true)}>
      <HelpIcon fontSize="small"  className={classes.helpIcon}/>
    </Button>
    <Dialog onClose={() => setModalOpen(false)} aria-labelledby="customized-dialog-title" open={modalOpen}>
      <DialogTitle id="customized-dialog-title">
        {modalTitle}
      </DialogTitle>
      <DialogContent>
          <Typography className={classes.modalText} dangerouslySetInnerHTML={{ __html: modalBody }}></Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={() => setModalOpen(!modalOpen)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

Modal.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Modal);
