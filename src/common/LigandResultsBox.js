import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import LigandResultItem from './LigandResultItem';

export default function LigandResultsBox(props) {
  const {ligandResults, selectedLigands, clickHandler} = props;
  const box_list = ligandResults.map(current_ligand => <LigandResultItem ligand={current_ligand}/>);
  
  function CreateResultItem(ligand){
    //selectedLigands.has(ligand.name);
    return(<LigandResultItem ligand={ligand}/>);
  }

  return(
    <List>
      {ligandResults.map(CreateResultItem)}
    </List>
  );
}

LigandResultsBox.PropTypes = {
  ligandResults: PropTypes.array,
  selectedLigands: PropTypes.instanceOf(Set)
};

