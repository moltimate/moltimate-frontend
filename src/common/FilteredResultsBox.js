import React from "react";
import PropTypes from 'prop-types';

import LigandResultsBox from "./LigandResultsBox";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles"
import styles from "./styles.js";


function FilteredResultsBox(props) {
  const { temp } = props;
  return(
    <div>
      <ListItem>
        <ListItemText>
          <TextField 
            //className = {filter}
            name = "filter" 
            label = "Ligand"
          />
        </ListItemText>
      </ListItem>
      <LigandResultsBox 
        ligandResults = {temp}
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