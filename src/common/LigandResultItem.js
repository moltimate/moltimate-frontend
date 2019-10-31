import React, { useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import {withStyles} from "@material-ui/core/styles"
import styles from './styles.js'


function LigandResultItem(props){
  const {classes, ligand, isSelected, clickHandler} = props;

  const contents = 
    <>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </>;

  let item;

  if(isSelected){
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
  //<ListItemText primary = {ligand.name}/>
  //<ListItemText primary = {ligand.structure} style={{float: 'right'}}/>
}

export default withStyles(styles)(LigandResultItem);