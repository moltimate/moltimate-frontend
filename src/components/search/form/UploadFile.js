import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  upload: {
    marginTop: theme.spacing.unit * 5,
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit * 3,
  }
});

function UploadFile(props) {
  const { classes } = props;

  return (
    <div className={classes.upload}>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.handleUpload}
      />
      <InputLabel>Custom Motifs</InputLabel>
      <label htmlFor="contained-button-file">
        <Button
          className={classes.button}
          variant="contained"
          component="span"
        >
          Upload
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
