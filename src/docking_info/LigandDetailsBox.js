import React, {useState} from "react"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import GetAppIcon from '@material-ui/icons/GetApp'
import IconButton from '@material-ui/core/IconButton';
import { withStyles, TableBody } from "@material-ui/core";
import FileDownload from "js-file-download";
import jssPluginPropsSort from "jss-plugin-props-sort";
import PropTypes from 'prop-types';
import axios from "axios";
import {exportDockingInfoURL} from "../util/request"

import styles from "./styles.js"

function LigandDetailsBox(props){
  const {dockingConfigurations, selectedDockingConfiguration, selectConfigurationHandler, ligandName, jobId, classes} = props;
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
    let formattedIndex = formatIndex(docking_configuration[0]);
    if(is_selected){
      return(
        <TableRow 
          className = {classes.selected}
          onClick = {(e) => selectConfigurationHandler(null)}
          key = {formattedIndex}
        >
          {buildCheckbox(formattedIndex)}
          <TableCell children = {formattedIndex} key = {formattedIndex + '0'}/>
          <TableCell children = {docking_configuration[1]} key = {formattedIndex + '1'}/>
          <TableCell children = {docking_configuration[2]} key = {formattedIndex + '2'}/>
          <TableCell colSpan={2} children = {docking_configuration[3]} key = {formattedIndex + '3'}/>
        </TableRow>);
    }else{
      return(
        <TableRow 
          className = {classes.unselected}
          onClick = {(e) => selectConfigurationHandler(docking_configuration)}
          key = {formattedIndex}
        >
          {buildCheckbox(formattedIndex)}
          <TableCell children = {formatIndex(docking_configuration[0])}/>
          <TableCell children = {docking_configuration[1]}/>
          <TableCell children = {docking_configuration[2]}/>
          <TableCell colSpan={2} children = {docking_configuration[3]}/>
        </TableRow>)
    }
      
  }

  function buildCheckbox(formattedIndex){
    var existingData = localStorage.getItem("selectedConfigsMoltimate");
    let checked = false;
    if(existingData !== "" && existingData !== null){
      let checkboxes = convertLocalStoragetoArray();
      let index = Number(formatIndex);
      if(checkboxes[0] === "true"){
        checked = true;
      }else{
        if(checkboxes[index] == true){
          checked = true;
        }
      }
    }
    if(checked){
      return(<TableCell children = {<input type="checkbox" name={formattedIndex} onChange={(e) => handleChange(e)} checked/>}/>);
    }
    return(<TableCell children = {<input type="checkbox" name={formattedIndex} onChange={(e) => handleChange(e)}/>}/>);
  }

  function handleChange(e) {
    var existingData = localStorage.getItem("selectedConfigsMoltimate");
    if(existingData === "" || existingData === null){
      initLocalStorageArray();
    }
    var checkboxes = convertLocalStoragetoArray();
    if(checkboxes.length !== (dockingConfigurations.length + 1)){
      initLocalStorageArray();
      checkboxes = convertLocalStoragetoArray();
    }
    if(e.target.name === "all"){
      if(e.target.checked){
        checkboxes = setAllCheckboxes(checkboxes, true);
      }else{
        checkboxes = setAllCheckboxes(checkboxes, false);
      }
    }else{
      var index = Number(e.target.name);
      if(e.target.checked){
        checkboxes[index] = true;
      }else{
        checkboxes[index] = false;
        if(checkboxes[0] === "true" || checkboxes[0]){
          checkboxes = setAllCheckboxes(checkboxes, false);
        }
      }
    }
    localStorage.setItem("selectedConfigsMoltimate", checkboxes);
    if(e.target.name === "all"){
      let tempIndex = localStorage.getItem("index");
      if(tempIndex === null || tempIndex === "" || tempIndex === "0"){
        selectConfigurationHandler([2]);
        localStorage.setItem("index", "1");
      }else{
        selectConfigurationHandler([1])
        localStorage.setItem("index", "0");
      }
    }
    console.log(checkboxes);
  }

  function setAllCheckboxes(checkboxes, checked){
    for(var x = 0; x < checkboxes.length; x++){
      checkboxes[x] = checked;
    }
    return checkboxes;
  }

  function initLocalStorageArray(){
    var checks = [false]
    dockingConfigurations.map(dockingConfigurations =>{
      checks.push(false);
    });
    localStorage.setItem("selectedConfigsMoltimate", checks);
  } 

  function convertLocalStoragetoArray(){
    var data = localStorage.getItem("selectedConfigsMoltimate");
    var dataArray = data.split(",");
    return dataArray;
  }
    
  function downloadDockingInfo() {
     var dockingData = [];
     var selectedConfigurations = convertLocalStoragetoArray();
     dockingConfigurations.forEach((configuration) => {
        dockingData.push({
            name: ligandName,
            bindingEnergy: configuration[1],
            modeNumber: configuration[0],
            rmsdLower: configuration[2],
            rmsdUpper: configuration[3]
        });
     });
     axios.post(exportDockingInfoURL, {ligands: dockingData, babelJobId : jobId, selectedConfigs : selectedConfigurations},{responseType : 'blob'}).then( (response) => {
        var data = response.data;
        FileDownload( data, 'moltimate.zip' );
     });
  }
  
  return(
    <>
    <Table>
      <TableHead className={classes.ligandTableHead}>
        <TableRow>
          {buildCheckbox("all")}
          <TableCell children = "ID"/>
          <TableCell children = "Binding Affinity"/>
          <TableCell children = "min RMSD"/>
          <TableCell children = "max RMSD" style={{paddingRight: 10}}/>
          <TableCell style={{paddingRight:0, paddingLeft:0}}>
              <IconButton aria-label="download pdb" onClick={(e) => downloadDockingInfo()} title="Download as PBD">
                  <GetAppIcon />
              </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          //for every entry in the dockingConfigurations, generate a row in the table
          dockingConfigurations.map(dockingConfiguration =>{
            return createDockingConfigRow(
              dockingConfiguration,
              //compare indices to see if this is the selected docking configuration
              (selectedDockingConfiguration && 
                dockingConfiguration[0] == selectedDockingConfiguration)
              )})
        }
      </TableBody>
    </Table>


    </>
  );

}

LigandDetailsBox.defaultProps={
  dockingConfigurations: []
}

LigandDetailsBox.propTypes={
  /**
   * An array of docking configuration arrays. Each of its elements have the following contents:
   * [index, affinity, rmsd upper, rmsd lower]
   */
  dockingConfigurations: PropTypes.array
}

export default withStyles(styles)(LigandDetailsBox)