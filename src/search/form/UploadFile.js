import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import GetAppIcon from '@material-ui/icons/GetApp';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';

import NameChips from './NameChips';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function UploadFile(props) {
  const { classes, label, buttonText, inputName, handleChange, files } = props;

  return (
    <div className={classes.upload}>
      <FormLabel className={classes.label} component='legend'>{label}</FormLabel>
      <input
        accept="*"
        className={classes.input}
        id="contained-button-file"
        name={inputName}
        multiple
        type="file"
        onChange={(e) => handleChange(e, 3)}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          children={buttonText}
        >
          <GetAppIcon className={classes.rotate}/>
          {`${buttonText}`}
        </Button>
      </label>
      <NameChips elements={files} handleDelete={handleChange} inputName={inputName}/>
    </div>
  );
}

UploadFile.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  inputName: PropTypes.string
};

export default withStyles(styles)(UploadFile);
