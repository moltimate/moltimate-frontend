import React from "react"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import { withStyles, TableBody } from "@material-ui/core";
import jssPluginPropsSort from "jss-plugin-props-sort";

import styles from "./styles.js"

function LigandDetailsBox(props){
  const {dockingConfigurations, classes} = props;

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
  function createDockingConfigRow(index, binding_affinity, rmsd ){
    return(
      <TableRow>
        <TableCell children = {formatIndex(index)}/>
        <TableCell children = {binding_affinity}/>
        <TableCell children = {rmsd}/>
      </TableRow>);
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
              dockingConfiguration[0],
              dockingConfiguration[1],
              dockingConfiguration[2]))
        }
      </TableBody>
    </Table>
  );

}

const fake_docking_data = (
  [[1,-9.8,0],
  [2,-9.8,2.232],
  [3,-9.6, 2.159],
  [4,-7.3, 2.116],
  [5,-7.2, 2.126],
  [6,-7.2, 2.348],
  [7,-7.1, 22.363],
  [8,-6.8, 29.022],
  [9,-6.6, 21.567]]);

const mock_docking_data = (
  [[1, -3, 1],[2, -2, 5],[3, -1, 10]]
);

LigandDetailsBox.defaultProps={
  dockingConfigurations: mock_docking_data
}

export default withStyles(styles)(LigandDetailsBox)