import React, { useState } from "react"
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import {withStyles} from "@material-ui/core/styles"
import styles from './styles.js'


function LigandResultItem(props){
  const {classes, ligand, isSelected, isDocked, midDocking, clickHandler, isViewingLigand} = props;

  function contents(){
    return(
      <>
        <ListItemText>{ligand.name}</ListItemText>
        <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
      </>
    );
  }

  const contents_docked = 
    <>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {"Macro: " + ligand.macromolecule} />
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </>;

  let item;

  function generateTitle() {
    return (ligand.macromolecule ? "Macromolecule: " + ligand.macromolecule : "") + (ligand.macromolecule && ligand.smiles ? " - " : "") + (ligand.smiles ? "Smiles: " + ligand.smiles : "");
  }

  //if these are both true than this ligand is being docked
  if(midDocking && isSelected){
    item = <ListItem
      //should do nothing on being clicked
      onClick={(e) => {}}
      className={classes.midDocking}
      title={generateTitle()}
    >
      {contents()}
    </ListItem>;

  }else if(isViewingLigand){
    item = <ListItem
      cursor="pointer"
      onClick={(e) => {}}
      className={classes.dockedSelected}
      title={generateTitle()}
    >
      {contents_docked}
    </ListItem>;

  }else if(isDocked && !isSelected){
    item = <ListItem
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className={classes.dockedUnselected}
      title={generateTitle()}
    >
      {contents_docked}
    </ListItem>;

  }else if(isSelected){
    item = <ListItem
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className={classes.selected}
      title={generateTitle()}
    >
      {contents()}
    </ListItem>;
  //unselected during a docking operation
  }else if(midDocking){
    item = <ListItem 
      onClick={(e) => {}}
      className = {classes.unselected}
      title={generateTitle()}
    >
      {contents()}
    </ListItem>;
  //unselected, normal circumstances
  } else {
    item = <ListItem 
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className = {classes.unselected}
      title={generateTitle()}
    >
      {contents()}
    </ListItem>;
  }

  return(
    item
  );
}

LigandResultItem.propTypes = {
  /** True if this ligand has already undergone docking */
  isDocked: PropTypes.bool,
  /** True if a docking operation is occuring*/
  midDocking: PropTypes.bool,
}

export default withStyles(styles)(LigandResultItem);