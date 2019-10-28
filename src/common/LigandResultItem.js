import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

export default function LigandResultItem(props){
  const {ligand} = props;

  return(
    <ListItem>
      <ListItemText>{ligand.name}</ListItemText>
      <ListItemText secondary = {ligand.structure} style={{float: 'right', textAlign: 'right'}}/>
    </ListItem>
  );
  //<ListItemText primary = {ligand.name}/>
  //<ListItemText primary = {ligand.structure} style={{float: 'right'}}/>
}