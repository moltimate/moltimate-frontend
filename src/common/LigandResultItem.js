import React, { useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

export default function LigandResultItem(props){
  const {classes, ligand, isSelected} = props;

  const contents = 
    <>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </>;

  let item;

  if(isSelected){
    item = <ListItem>{contents}</ListItem>;
  } else {
    item = <ListItem>{contents}</ListItem>;
  }

  return(
    <ListItem>{contents}</ListItem>
  );
  //<ListItemText primary = {ligand.name}/>
  //<ListItemText primary = {ligand.structure} style={{float: 'right'}}/>
}