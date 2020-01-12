import React, { useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import {withStyles} from "@material-ui/core/styles"
import styles from './styles.js'


function LigandResultItem(props){
  const {classes, ligand, isSelected, isDocked, clickHandler, isViewingLigand} = props;

  const contents = 
    <>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </>;

  const contents_docked = 
    <>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {"Min BA: " + ligand.min_affinity.toString()} />
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </>;

  let item;

  if(isViewingLigand){
    item = <ListItem
      //button
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className={classes.dockedSelected}
    >
      {contents_docked}
    </ListItem>;
  }else if(isDocked && !isSelected){
    item = <ListItem
      //button
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className={classes.dockedUnselected}
    >
      {contents_docked}
    </ListItem>;
  }else if(isSelected){
    item = <ListItem
      //button
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className={classes.selected}
    >
      {contents}
    </ListItem>;
  } else {
    item = <ListItem 
      //button 
      cursor="pointer"
      onClick={(e) => clickHandler(ligand)}
      className = {classes.unselected}
    >
      {contents}
    </ListItem>;
  }

  return(
    item
  );
}

export default withStyles(styles)(LigandResultItem);