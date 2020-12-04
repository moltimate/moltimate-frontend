import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';
import LigandResultItem from './LigandResultItem';

export default function LigandResultsBox(props) {
  const {ligandResults, selectedLigands, dockedLigands, viewingLigand, clickLigandHandler, midDocking} = props;
  const box_list = ligandResults.map(current_ligand => <LigandResultItem ligand={current_ligand}/>);

  return(
    <List>
      {ligandResults.map( ligand => (
        <LigandResultItem
          key={ligand.uniqueID()}
          ligand={ligand} 
          isSelected = {selectedLigands.has(ligand)} 
          isDocked = {dockedLigands.has(ligand.uniqueID())}
          midDocking = {midDocking}
          clickHandler={clickLigandHandler} 
          isViewingLigand = {ligand == viewingLigand}
        />))
      }
    </List>
  );
}

LigandResultsBox.propTypes = {
  ligandResults: PropTypes.array,
  /** ligands selected for docking */
  selectedLigands: PropTypes.instanceOf(Set),
  /** true if the selected ligands are undergoing docking */
  midDocking: PropTypes.bool,
};

