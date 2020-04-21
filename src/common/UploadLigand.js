import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import GetAppIcon from '@material-ui/icons/GetApp';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';

import NameChips from '../search/form/NameChips';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function UploadLigand(props) {
  const { classes, label, buttonText, inputName, handleChange} = props;

  return (
    <>
      <label htmlFor="upload-ligand" children={"upload a ligand file for docking"} style={{ display: "none" }}/>
      <input
        accept="*"
        className={classes.input}
        id="upload-ligand"
        name={inputName}
        multiple
        type="file"
        onChange={handleChange}
      />
      
      <label htmlFor="upload-ligand">
        <Button
          variant="contained"
          color='secondary'
          component="span"
          className={classes.uploadButton}
          children={buttonText}
        >
          {`${buttonText}`}
        </Button>
      </label>
      
    </>
  );
}

UploadLigand.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  inputName: PropTypes.string
};

export default withStyles(styles)(UploadLigand);
