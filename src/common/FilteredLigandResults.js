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


function FilteredLigandResults(props) {
  const { classes, temp, selectedLigands, dockedLigands, clickLigandHandler, dockHandler, viewingLigand } = props;
  const [] = useState();
  return(
    <div>
      <ListItem>
        <ListItemText>
          <TextField 
            //represents a text filter, currently non functional (TODO)
            name = "filter" 
            label = "Ligand Filter"
          />
          <Button 
            //initiates the docking process
            name='dock' 
            className={classes.dockButton}
            onClick = {dockHandler}
          >
            Dock
          </Button>         
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
  handleSelectedResult: propTypes.func,
  successResult: propTypes.array,
  failedResult: propTypes.array,
};

FilteredLigandResults.defaultProps = {
  successResult: [],
  
};

export default withStyles(styles)(FilteredLigandResults);