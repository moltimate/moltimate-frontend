import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';


import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function UploadFile(props) {
  const { classes, label, buttonText } = props;

  return (
    <div className={classes.upload}>
      <FormLabel component='legend'>{label}</FormLabel>
      <input
        accept="motif"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={props.handleUpload}
      />
      <label htmlFor="contained-button-file">
        <Button
          className={classes.button}
          variant="contained"
          component="span"
          children={buttonText}
        >
          {`${buttonText}`}
        </Button>
      </label>
    </div>
  );
}

UploadFile.propTypes = {
  classes: PropTypes.object,
  handleUpload: PropTypes.func
};

export default withStyles(styles)(UploadFile);
