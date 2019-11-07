import React from "react"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import { withStyles, TableBody } from "@material-ui/core";
import jssPluginPropsSort from "jss-plugin-props-sort";

import styles from "./styles.js"

function LigandDetailsBox(props){
  const {dockingConfigurations, selectedDockingConfiguration, selectConfigurationHandler, classes} = props;

  /*
  Formats a docking-configuration index value for viewing

  input:
    index: an integer in the range (0, 99)
  output:
    a string with the given integer 0 padded to 2 places
  */
  function formatIndex(index){
    if(index < 10){
      return "0" + index.toString()
    }else{
      return index.toString()
    }

  }
  //create a row for the docking ligands table
  function createDockingConfigRow(docking_configuration, is_selected ){
    if(is_selected){
      return(
        <TableRow 
          className = {classes.selected}
          onClick = {(e) => selectConfigurationHandler(null)}
        >
          <TableCell children = {formatIndex(docking_configuration[0])}/>
          <TableCell children = {docking_configuration[1]}/>
          <TableCell children = {docking_configuration[2]}/>
        </TableRow>);
    }else{
      return(
        <TableRow 
          className = {classes.unselected}
          onClick = {(e) => selectConfigurationHandler(docking_configuration)}
        >
          <TableCell children = {formatIndex(docking_configuration[0])}/>
          <TableCell children = {docking_configuration[1]}/>
          <TableCell children = {docking_configuration[2]}/>
        </TableRow>)
    }
      
  }
    

  
  return(
    <Table>
      <TableHead className={classes.ligandTableHead}>
        <TableRow>
          <TableCell children = "ID"/>
          <TableCell children = "Binding Affinity"/>
          <TableCell children = "RMSD"/>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          //for every entry in the dockingConfigurations, generate a row in the table
          dockingConfigurations.map(dockingConfiguration => 
            createDockingConfigRow(
              dockingConfiguration,
              //compare rmsc to decide if ligand is selected - this is temporary
              //will not work with real data
              (selectedDockingConfiguration && 
                dockingConfiguration[2] == selectedDockingConfiguration[2])
              ))
        }
      </TableBody>
    </Table>
  );

}

LigandDetailsBox.defaultProps={
  dockingConfigurations: []
}

export default withStyles(styles)(LigandDetailsBox)