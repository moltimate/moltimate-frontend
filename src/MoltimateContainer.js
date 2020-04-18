import React, { useState, useEffect } from "react";


import TopBar from './TopBar';

import SearchContainer from './search/SearchContainer';
import BuilderContainer from './builder/BuilderContainer';
import ProteinContainer from './protein/ProteinContainer';
import SettingsContainer from './settings/SettingsContainer';

import {test_sites} from './DummyData'

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';
import DockingContainer from "./docking/DockingContainer";
import DockingProteinContainer from "./protein/DockingProteinContainer";

function MoltimateContainer(props) {

  const { classes } = props;
  const [ selectedResult, setSelectedResult ] = useState(null);
  const [ nglData, setNglData ] = useState(null);

  //whether the settings are showing or not
  const [showSettings, setShowSettings] = useState(false);
  //the id of the macromolecule to use for docking. Do not pass this setter (instead use the 
  //"setDockingProteinId" function)
  const [dockingProteinID, setDockingProteinId] = useState(null);
  //the coordinates setting for the center of a docking operation
  const [dockingCenter, setDockingCenter] = useState([0,0,0]);
  //the range setting for the center of a docking operation
  const [dockingRange, setDockingRange] = useState([100,100,100]);
  //file with docked molecule
  const [ dockingDisplayFile, setDockingDisplayFile ] = useState(null);
  //index of the viewed docking configuration
  const [ dockingDisplayConfiguration, setDockingDisplayConfiguration ] = useState(null);
  //active sites to show in the docking visual
  const [ dockingDisplayActiveSites, setDockingDisplayActiveSites ] = useState(null);


  //TEMPORARY START
  function uploadPDBQT( files ) {
    setDockingDisplayFile(files[0])
    setDockingDisplayActiveSites(test_sites)
    setDockingDisplayConfiguration(1)
  }
  //TEMPORARY END

  /**
   * Access the dockingCenter virtual attribute
   * 
   * @returns An array of the the x, y, and z values of the center of the docking search area. If these have
   *  not been set, they default to 0.
   */
  function getDockingCenter(){
    return dockingCenter;
  }

  /**
   * Access the dockinRange virtual attribute
   * 
   * @returns An array of the the x, y, and z dimensions of the docking range. If these have not been set, 
   * they default to 100.
   */
  function getDockingRange(){
    return dockingRange
  }

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
    //this value is used for docking
    setDockingProteinId(parentId);
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
      <TopBar toggleSettings = {toggleSettingsMenu} uploadPDBQT = {uploadPDBQT}/>
      
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
          selectedMacromolecule = {dockingProteinID}
          dockingCenter = {dockingCenter}
          dockingRange = {dockingRange}
          setDisplayedFile = {()=>{}}
          setDisplayedConfiguration = {()=>{}}
          setDisplayedActiveSites = {()=>{}}
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
        (dockingDisplayFile && dockingDisplayConfiguration && dockingDisplayActiveSites)? <DockingProteinContainer
          file={dockingDisplayFile}
          ligand_model={dockingDisplayConfiguration}
          active_sites={dockingDisplayActiveSites}
        /> : null
      }
      {
        //Only display the settings modal when showSettings is true
        showSettings ? <SettingsContainer 
          setShowSettings = {setShowSettings}
          dockingSearchCenter = {getDockingCenter}
          setDockingSearchCenter = {setDockingCenter}
          dockingSearchRange = {getDockingRange}
          setDockingSearchRange = {setDockingRange}
        />:null
      }
    </>
  );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
