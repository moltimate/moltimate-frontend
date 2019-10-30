import React from "react";
import {useState} from "react";
import PropTypes from 'prop-types';

import LigandResultsBox from "./LigandResultsBox";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles"
import styles from "./styles.js";


function FilteredResultsBox(props) {
  const { classes, temp, selectedLigands, clickLigandHandler } = props;
  const [] = useState();
  return(
    <div>
      <ListItem>
        <ListItemText>
          <TextField 
            //className = {filter}
            name = "filter" 
            label = "Ligand Filter"
          />
          <Button name='dock' className={classes.dockButton}>Dock</Button>         
        </ListItemText>
      </ListItem>
      <LigandResultsBox 
        ligandResults = {temp}
        selectedLigands = {selectedLigands}
        clickLigandHandler = {clickLigandHandler}
      />
    </div>

  );
};

FilteredResultsBox.PropTypes = {
  classes: PropTypes.object,
  handleSelectedResult: PropTypes.func,
  successResult: PropTypes.array,
  failedResult: PropTypes.array,
};

FilteredResultsBox.defaultProps = {
  successResult: [],
  
};

export default withStyles(styles)(FilteredResultsBox);