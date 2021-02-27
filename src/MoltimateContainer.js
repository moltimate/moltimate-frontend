import React, { useState, useEffect } from "react";


import TopBar from './TopBar';

import SearchContainer from './search/SearchContainer';
import BuilderContainer from './builder/BuilderContainer';
import ProteinContainer from './protein/ProteinContainer';
import DockingProteinContainer from "./protein/DockingProteinContainer";
import ProteinLoading from './protein/ProteinLoading'
import SettingsContainer from './settings/SettingsContainer';
import DockingContainer from "./docking/DockingContainer";


import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';
import MolStar from "./basic-wrapper/MolStar";

function MoltimateContainer(props) {

  const { classes } = props;
  const [ selectedResult, setSelectedResult ] = useState(null);
  const [ nglData, setNglData ] = useState(null);
  //the protein ID entered in the search box
  const [searchedProteinIDs, setSearchedProteinIDs] = useState([])
  //whether the settings are showing or not
  const [showSettings, setShowSettings] = useState(false);
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
  //the ligand selected to be viewed
  const [viewingLigand, setViewingLigand] = useState(null);

  //protein Enzyme Commission class
  const [searchEClass, setSearchEClass] = useState({});

  //the display mode to use for molecules
  const [queryProteinMode, setQueryProteinMode] = useState("ball+stick");
  const [motifProteinMode, setMotifProteinMode] = useState("ball+stick");
  const [dockingProteinMode, setDockingProteinMode] = useState("cartoon");
  const [activeSitesMode, setActiveSitesMode] = useState("ball+stick");
  const [ligandMode, setLigandMode] = useState("ball+stick");

  const [alignmentInProgress, setAlignmentInProgress] = useState(false);

  function addEClass( className, protein, search ) {
    if( search && Object.keys(searchEClass).length != 0 ) {
        return;
    }
    if( Object.keys(searchEClass).length != 0 ) {
        clearEClass();
    }
    searchEClass[className] = protein;
    setSearchEClass(searchEClass);
  }

  function clearEClass() {
    Object.keys(searchEClass).forEach( (key) => {
        delete searchEClass[key];
    });
    setSearchEClass(searchEClass);
  }

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
    //this should be the search value - it is used as the ID of the docking molecule
    setDockingDisplayConfiguration(null);
    setViewingLigand(null);
  }

  /*
  if the settings menu is showing, close the settings menu
  if the settings menu is hidden, show the settings menu
  */
  function toggleSettingsMenu(){
    if(showSettings) setShowSettings(false);
    else setShowSettings(true);
  }

  function dockingDisplay(){

    if(dockingDisplayFile){
      return (<DockingProteinContainer
        file={dockingDisplayFile}
        ligand_model={dockingDisplayConfiguration}
        active_sites={dockingDisplayActiveSites}
        proteinMode = {dockingProteinMode}
        activeSitesMode = {activeSitesMode}
        ligandMode = {ligandMode}
      />);
    } else {
      return (<ProteinLoading/>);
    }
  }

  return (
    <>
      <TopBar toggleSettings = {toggleSettingsMenu}/>
      
      <div className={classes.controlPanel}>
        <SearchContainer
          handleSelectedResult={handleSelectedResult}
          selectedResult={selectedResult}
          setSearchedProteins = {setSearchedProteinIDs}
          setEClass = {addEClass}
          clearEClass = {clearEClass}
          setAlignmentInProgress = {setAlignmentInProgress}
        />
        <BuilderContainer
          handleSelectedResult={handleSelectedResult}
          selectedResult={selectedResult}
        />
        <DockingContainer
          selectedMacromolecules = {searchedProteinIDs}
          dockingCenter = {dockingCenter}
          dockingRange = {dockingRange}
          alignmentInProgress = {alignmentInProgress}
          eClasses = {searchEClass}
          setDisplayedFile = {(x) =>{
            setDockingDisplayFile(x)}}
          setDisplayedConfiguration = {(x) =>{
            setDockingDisplayConfiguration(x)
            setNglData(null);}
          } 
          setDisplayedActiveSites = {(x) =>{
            setDockingDisplayActiveSites(x)}}
            viewingLigand = {viewingLigand}
            setViewingLigand = {setViewingLigand} 
        />
      </div>
      <div className={classes.molstarContainer}>
        {
            nglData ? <MolStar
              parentId={nglData.childId}
              childId={nglData.parentId}
              active={nglData.active}
              aligned={nglData.aligned}
              queryProteinMode={queryProteinMode} 
              motifProteinMode={motifProteinMode}
          /> : null
        }
      </div>
      {/* {
        nglData ? <ProteinContainer
          parentId={nglData.childId}
          childId={nglData.parentId}
          active={nglData.active}
          aligned={nglData.aligned}
          queryProteinMode={queryProteinMode} 
          motifProteinMode={motifProteinMode}
        /> : null
      } */}
      {
        (dockingDisplayActiveSites && dockingDisplayConfiguration) ? dockingDisplay(): null
        
      }
      {
        //Only display the settings modal when showSettings is true
        showSettings ? <SettingsContainer 
          setShowSettings = {setShowSettings}
          dockingSearchCenter = {dockingCenter}
          setDockingSearchCenter = {setDockingCenter}
          dockingSearchRange = {dockingRange}
          setDockingSearchRange = {setDockingRange}
          queryProteinMode ={queryProteinMode}
          setQueryProteinMode = {setQueryProteinMode} 
          motifProteinMode = {motifProteinMode}
          setMotifProteinMode = {setMotifProteinMode}
          dockingProteinMode = {dockingProteinMode} 
          setDockingProteinMode = {setDockingProteinMode} 
          activeSitesMode = {activeSitesMode} 
          setActiveSitesMode = {setActiveSitesMode} 
          ligandMode = {ligandMode} 
          setLigandMode = {setLigandMode}
        />:null
      }
    </>
  );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
