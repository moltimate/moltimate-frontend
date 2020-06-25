import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function UploadLigand(props) {
  const { 
    classes, 
    //text displayed on the Upload button
    buttonText, 
    //the name of the upload input element
    inputName, 
    //event handler for selecting ligands for upload 
    //(triggered by a change to the selected upload file)
    handleChange
  } = props;

  return (
    <>
      <label htmlFor="upload-ligand" children={"upload a ligand file for docking"} style={{ display: "none" }}>
        <input
          accept="*"
          className={classes.input}
          id="upload-ligand"
          name={inputName}
          multiple
          type="file"
          onChange={handleChange}
        />
      </label>   
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
