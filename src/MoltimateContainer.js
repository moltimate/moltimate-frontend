import React, { useState, useEffect } from "react";
import axios from "axios";

import TopBar from './TopBar';

import SearchContainer from './search/SearchContainer';
import BuilderContainer from './builder/BuilderContainer';
import ProteinContainer from './protein/ProteinContainer';
import SettingsContainer from './settings/SettingsContainer';
import useForm, {dockRequestURL} from './util/request';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';
import DockingContainer from "./docking/DockingContainer";

function MoltimateContainer(props) {

  const { classes } = props;
  const [ selectedResult, setSelectedResult ] = useState(null);
  const [ nglData, setNglData ] = useState(null);

  //ligands selected for docking. Do not pass this setter (instead use the 
  //"setSelectedLigands" function)
  const [selectedLigands, setSelectedLigandsInner] = useState(new Set());
  //whether the settings are showing or now
  const [showSettings, setShowSettings] = useState(false);
  //true if any ligands are currently being docked
  const [dockingInProgress, setDockingInProgress] = useState(false);
  //Text telling if there is a docking error
  const [dockingError, setDockingError] = useState(false);
  //Each object represnts the results of one docking job
  //each object contains a ligand, a macromoleculeID, and data
  const [dockingResults, setDockingResults] = useState(new Array());

  //the id of the macromolecule to use for docking. Do not pass this setter (instead use the 
  //"setDockingProteinId" function)
  const [dockingProteinID, setDockingProteinIdInner] = useState(null);

  //this form is used to make docking requests
  const defaultRequestValues = {
    center_x: 0,
    center_y: 0,
    center_z: 0,
    size_x: 100,
    size_y: 100,
    size_z: 100
  }

  /**
   * parses and responds to the results from the initial docking request
   * 
   * @param {Object} values - the values of the form data in the initial docking request
   * @param {Object} result - the response from the docking request sent to the backend
   * @param {Object} result.data - the body of the response from the docking request
   */
  function handleDockingResponse(values, result){
    console.log(`Result Data: ${result.data}`);
    for(let field in result.data)
      console.log(`  ${field}: ${result.data[field]}`);
    console.log(`Result Error: ${result.error}`);
    if(!result.error){
      console.log("point 1")
      if(!values["macromoleculeID"]){
        console.log("point 2")

        console.error("macromoleculeID was absent from docking request");

        return -1
      }
      console.log("point 3")
      let requestURL = `${dockRequestURL}?jobId=${result.data.jobId}&pdbId=${values.macromoleculeID}`;
      let retryFrequency = 20;//seconds
      let timeout = 900;//seconds
      console.log(`docking in progress (lvl1)?: ${dockingInProgress}`)
      console.log(`RequestURL: ${requestURL}`)

      //We assume there is only one selected ligand for now - this may be changed at a later time
      let selectedLigandArray = Array.from(selectedLigands)
      let selectedLigand = selectedLigandArray[0]
      console.log(selectedLigand);
      pollDockingResults(requestURL, retryFrequency, timeout, selectedLigand, values.macromoleculeID)
    }else{
      console.log("point 4")
      console.error(`Error: ${result.error}`);
    }

    console.log("point 5")
  }

  const {handleSubmit, setFormValue, values} = useForm(dockRequestURL,defaultRequestValues,handleDockingResponse);

  console.log(setFormValue);

  /**
   * Mutate dockingProteinId and the relevant form value
   * 
   * @param {String} newID the PDB ID of the protein to use for docking 
   */
  function setDockingProteinId(newID){
    setFormValue("macromoleculeID", newID);
    setDockingProteinIdInner(newID);
  }

  /**
   * Mutate the dockingCenter virtual attribute
   * 
   * @param newCenter the new center of the docking search area.
   */
  function setDockingCenter(newCenter){
    setFormValue("center_x", newCenter[0]);
    setFormValue("center_y", newCenter[1]);
    setFormValue("center_z", newCenter[2]);
  }

  /**
   * Access the dockingCenter virtual attribute
   * 
   * @returns An array of the the x, y, and z values of the center of the docking search area. If these have
   *  not been set, they default to 0.
   */
  function getDockingCenter(){
    var x, y, z;
    ("center_x" in values) ? x = values.center_x : x = 0;
    ("center_y" in values) ? y = values.center_y : y = 0;
    ("center_z" in values) ? x = values.center_z : z = 0;
      
    return [x,y,z]
  }

  /**
   * Mutate the dockingRange virtual attribute
   * 
   * @param newRange the new range of the docking search area.
   */
  function setDockingRange(newRange){
    setFormValue("size_x", newRange[0]);
    setFormValue("size_y", newRange[1]);
    setFormValue("size_z", newRange[2]);
  }

  /**
   * Access the dockinRange virtual attribute
   * 
   * @returns An array of the the x, y, and z dimensions of the docking range. If these have not been set, 
   * they default to 100.
   */
  function getDockingRange(){
    var x, y, z;
    ("size_x" in values) ? x = values.size_x : x = 100;
    ("size_y" in values) ? y = values.size_y : y = 100;
    ("size_z" in values) ? x = values.size_z : z = 100;
      
    return [x,y,z]
  }

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
    //this value is used for docking
    setDockingProteinId(parentId);
  }

  function dockLigands(callback){

    console.log("Docking Request Sent");
    setDockingInProgress(true);
    
  }

  /**
   * Polls the backend until it receives the result of a docking job or times out
   * 
   * @param {string} requestURL - the url to be polled
   * @param {int} retryFrequency - number of seconds between retry attempts
   * @param {int} timeout - number of seconds to retry before giving up
   * @param {Object} ligand - the ligand being docked
   * @param {string} macromoleculeID - the ID of the macromolecule involved in docking
   */
  function pollDockingResults(requestURL, retryFrequency, timeoutTime, ligand, macromoleculeID){

    console.log(`docking in progress (lvl2)?: ${dockingInProgress}`)
    console.log(`docking in progress defined? (lvl2)?: ${!(dockingInProgress === undefined)}`)
      
    var pollingTimer; 

    function checkDockingResults(){
      console.log(`docking in progress (lvl3)?: ${dockingInProgress}`)
      axios.get(requestURL).then( (response) =>{
        console.log(`Polling Response: ${response.data}`);
        console.log(`status: ${response.status}`);

        if(response.status == 200){
          //stop polling
          clearInterval(pollingTimer);

          //save the results
          var newDockingResults = new Array().concat(dockingResults);
          console.log(ligand);
          console.log(ligand.uniqueID())
          newDockingResults.push({
            ligandID: ligand.uniqueID(),
            macromoleculeID: macromoleculeID,
            data: response.data
          });
          console.log(newDockingResults)
          setDockingResults(newDockingResults);
          
          //indicate docking is complete
          setDockingInProgress(false);
          
        }
      }).catch((error) => {
        console.log(`Polling Error: ${error}`);
        setDockingInProgress(false);
        clearInterval(pollingTimer)
        setDockingError("Error Retrieving Docking Data")
      });
    }

    pollingTimer = setInterval(checkDockingResults, retryFrequency*1000);

    setTimeout(()=>{clearInterval(pollingTimer)},timeoutTime*1000) 
  }

  /*
  if the settings menu is showing, close the settings menu
  if the settings menu is hidden, show the settings menu
  */
  function toggleSettingsMenu(){
    if(showSettings) setShowSettings(false);
    else setShowSettings(true);
  }

  return (
    <>
      <TopBar toggleSettings = {toggleSettingsMenu}/>
      
      <div className={classes.controlPanel}>
        <SearchContainer
          handleSelectedResult={handleSelectedResult}
          selectedResult={selectedResult}
        />
        <BuilderContainer
          handleSelectedResult={handleSelectedResult}
          selectedResult={selectedResult}
        />
        <DockingContainer
          selectedLigands = {selectedLigands}
          dockingInProgress = {dockingInProgress}
          dockingError = {dockingError}
          setDockingError = {setDockingError}
          dockingResults = {dockingResults}
        />  
      </div>
      {
        nglData ? <ProteinContainer
          parentId={nglData.childId}
          childId={nglData.parentId}
          active={nglData.active}
          aligned={nglData.aligned}
        /> : null
      }
      {
        //Only display the settings modal when showSettings is true
        showSettings ? <SettingsContainer setShowSettings = {setShowSettings}
          dockingSearchCenter = {getDockingCenter}
          setDockingSearchCenter = {setDockingCenter}
          dockingSearchRange = {getDockingRange}
          setDockingSearchRange = {setDockingRange}
          setFormValue = {(attribute, attributeValue)=>setFormValue(attribute, attributeValue)}
        />:null
      }
    </>
  );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
