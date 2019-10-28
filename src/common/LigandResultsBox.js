import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default function LigandResultsBox(props) {
  const {ligandResults} = props;

  const box_list = ligandResults.map(ligand => <ListItemText>{ligand.name}</ListItemText>);
    
  return(
    /*
    <List>
      {
        box_list
      }
    </List>
    */

    box_list
  );
}

LigandResultsBox.PropTypes = {
  ligandResults: PropTypes.array
};

