import React, {useState} from 'react';
import propTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import LigandResultItem from './LigandResultItem';

export default function LigandResultsBox(props) {
  const {ligandResults, selectedLigands, clickLigandHandler} = props;
  const box_list = ligandResults.map(current_ligand => <LigandResultItem ligand={current_ligand}/>);

  return(
    <List>
      {ligandResults.map( ligand => (
        <LigandResultItem
          key={ligand.name}
          ligand={ligand} 
          isSelected = {selectedLigands.has(ligand)} 
          clickHandler={clickLigandHandler} 
        />))
      }
    </List>
  );
}

LigandResultsBox.propTypes = {
  ligandResults: propTypes.array,
  selectedLigands: propTypes.instanceOf(Set)
};
