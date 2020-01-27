import React from "react";
import {useState} from "react";
import propTypes from 'prop-types';

import LigandResultsBox from "./LigandResultsBox";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles"
import styles from "./styles.js";
//import {useForm} from "../util/request";

/**
 * A Ligand list with a scroll bar, search box, a "Dock" button to begin a docking
 * process, and (optionally) an "upload" button to upload ligands
 */
function FilteredLigandResults(props) {
  const { classes, temp, selectedLigands, dockedLigands, 
    clickLigandHandler, dockHandler, viewingLigand, uploadButton } = props;
    //const { values, result, handleChange, handleClearValues, handleSubmit,
    //  handleChipInput, handleResidues, handleFileUpload, handleFileDelete, handleSetMode } = useForm();
  const [] = useState();

  //Display Upload button when true, display Dock button when false
  function showUploadButton(){
    //only show the upload button when the uploadButton prop is true and no ligands
    //are selected
    return uploadButton && selectedLigands.size == 0
  }

  return(
    <div>
      <ListItem>
        <ListItemText>
          <TextField 
            //represents a text filter, currently non functional (TODO)
            name = "filter" 
            label = "Ligand Filter"
          />
          {
            showUploadButton() ?
              <Button 
                //allows user to upload a ligand
                name='upload' 
                className={classes.uploadButton}
                variant="contained"
                color='secondary'
              >
                Upload
              </Button>
              : <Button 
                //initiates the docking process
                name='dock' 
                className={classes.dockButton}
                onClick = {dockHandler}
                variant="contained"
                color='primary'
              >
                Dock
              </Button>
          }       
        </ListItemText>
      </ListItem>
      <LigandResultsBox 
        //Shows the ligands available for docking and viewing
        ligandResults = {temp}
        selectedLigands = {selectedLigands}
        clickLigandHandler = {clickLigandHandler}
        dockedLigands = {dockedLigands}
        viewingLigand = {viewingLigand}
      />
    </div>
  );
};
FilteredLigandResults.propTypes = {
  classes: propTypes.object,
  /** 
   * An array of objects representing ligands available for docking operations.
   * Example of object inside array: 
   *   {name:"00I",structure:"C30 H35 N5 O6 S"}  
   */
  temp: propTypes.array,
  /** 
   * A Set of objects representing ligands selected for docking operations.
   * Example of object inside the Set: 
   *   {name:"00I",structure:"C30 H35 N5 O6 S"}  
   */
  selectedLigands: propTypes.object,
  /** 
   * A Set of objects representing ligands which have had docking operations
   * performed on them.
   * Example of object inside the Set: 
   *   {name:"00I",structure:"C30 H35 N5 O6 S", min_affinity: -5.2}  
   */
  dockedLigands: propTypes.object,
  /** A function that is triggered when a user clicks on a Ligand in the list. */
  clickLigandHandler: propTypes.func,
  /** A function that is triggered when a user clicks the "dock" button */
  dockHandler: propTypes.func,
  /** The handler for selecting a  */
  handleSelectedResult: propTypes.func,
  /** An object representing a ligand selected to be viewed 
   *  Example of object:
   *    {name:"00I",structure:"C30 H35 N5 O6 S", min_affinity: -5.2}  
  */
  viewingLigand: propTypes.object,
  /**
   * Whether the Ligand Results offer an "upload" button to the user
   */
  uploadButton: propTypes.bool,
};

FilteredLigandResults.defaultProps = {
  uploadButton: false,
};

export default withStyles(styles)(FilteredLigandResults);