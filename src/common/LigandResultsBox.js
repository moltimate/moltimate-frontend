import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import LigandResultItem from './LigandResultItem';

export default function LigandResultsBox(props) {
  const {ligandResults} = props;
  const box_list = ligandResults.map(ligand => <LigandResultItem ligand={ligand}/>);
    
  return(
    <List>
      {ligandResults.map(current_ligand => <LigandResultItem ligand={current_ligand}/>)}
    </List>
  );
}

LigandResultsBox.PropTypes = {
  ligandResults: PropTypes.array
};

