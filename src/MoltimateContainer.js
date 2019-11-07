import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import TopBar from './TopBar';
import Button from '@material-ui/core/Button'

import SearchContainer from './search/SearchContainer';
import BuilderContainer from './builder/BuilderContainer';
import ProteinContainer from './protein/ProteinContainer';
import LigandLibraryContainer from './ligand_library/LigandLibraryContainer';
import ImportedLigandsContainer from './imported_ligands/ImportedLigandsContainer';
import DockingInfoContainer from './docking_info/DockingInfoContainer';
import SettingsContainer from './settings/SettingsContainer';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function MoltimateContainer(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(false);
  const [ selectedResult, setSelectedResult ] = useState(null);
  const [ nglData, setNglData ] = useState(null);
  const library_ligands = [
    {name:"00I",structure:"C30 H35 N5 O6 S", selected:false, min_affinity: -5.2},
    {name:"00K",structure:"C28 H44 N6 O4", selected:false, min_affinity: -6.1},
    {name:"00L",structure:"C30 H42 N8 O4", selected:false, min_affinity: -3.2},
    {name:"00N",structure:"C24 H34 N8 O3 S", selected:false, min_affinity: -4.4},
    {name:"00P",structure:"C22 H29 N5 O5 S", selected:false, min_affinity: -9.8},
    {name:"00Q",structure:"C27 H35 N7 O3 S", selected:false, min_affinity: -7.5},
    {name:"00R",structure:"C24 H29 N7 O5 S", selected:false, min_affinity: -4.5},
    {name:"02P",structure:"C21 H26 C1 N4 O2", selected:false, min_affinity: -3.1},];
  const test_ligands = [
    {name:"ligand1",structure:"C20 H28 N2 O", selected:true, min_affinity: -4.6},
    {name:"ligand2A",structure:"C20 H22 N10 O2 S", selected:false, min_affinity: -8.3}];
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
  const fake_docking_data_2 = (
    [[1, -3, 1],[2, -2, 5],[3, -1, 10]]
  );

  //data on all the ligands the user has uploaded
  const [ uploadedLigands, setUploadedLigands ] = useState(test_ligands);
  //autopopulating data on ligands
  const [ libraryLigands, setLibraryLigands ] = useState(library_ligands);
  //ligands selected for docking
  const [selectedLigands, setSelectedLigands] = useState(new Set());
  //ligands which have been docked
  const [dockedLigands, setDockedLigands] = useState(new Set());
  //the ligand selected to be viewed
  const [viewingLigand, setViewingLigand] = useState(null);
  //the docking configurations available for the viewing ligand
  const [dockingConfigs, setDockingConfigs] = useState([]);
  //the docking configuration selected to be viewed
  const [selectedDockingConfig, setSelectedDockingConfig] = useState(null);
  //whether the settings are showing or now
  const [showSettings, setShowSettings] = useState(false)

  console.log("test");

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
  }

  //Used to toggle the selection of different ligands for docking and viewing
  function handleSelectedLigand(selected_ligand){

    //if the ligand is already selected for viewing, deselect it
    if(viewingLigand == selected_ligand){
      setViewingLigand(null)

    //if docking has already been performed on the selected ligand, select it for viewing
    }else if(dockedLigands.has(selected_ligand)){
      setViewingLigand(selected_ligand)
      
      //this is temporary, for demonstration purposes
      if(selected_ligand.name == "00I"){
        setDockingConfigs(fake_docking_data)
      } else{
        setDockingConfigs(fake_docking_data_2)
      }
    }

    //create a copy of the selectedLigands set for editing
    var new_selected_ligands = new Set(selectedLigands)

    //if the ligand is in already selected for docking, deselect the ligand
    if (new_selected_ligands.has(selected_ligand)){
      new_selected_ligands.delete(selected_ligand)

    //if the ligand is not selected for docking, select the ligand
    } else if(!dockedLigands.has(selected_ligand)){
      new_selected_ligands.add(selected_ligand)
    }
    
    setSelectedLigands(new_selected_ligands)
  }

  function dockLigands(){
    var new_docked_ligands =  new Set(selectedLigands)
    for(let ligand of dockedLigands){
      new_docked_ligands.add(ligand)
    }
    setDockedLigands(new_docked_ligands)
    
    //if any new ligands were docked, select the first one for display 
    if(selectedLigands.length > 0){

    }

    setSelectedLigands(new Set())
  }

  /*
  if the settings menu is showing, close the settings menu
  if the settings menu is hidden, show the settings menu
  */
  function toggleSettingsMenu(){
    if(showSettings) setShowSettings(false)
    else setShowSettings(true)
  }

  function selectConfig(configSelection){
    setSelectedDockingConfig(configSelection)
    console.log("selected config: " + configSelection[1])
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
          <LigandLibraryContainer
            library = {libraryLigands}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {handleSelectedLigand}
            dockHandler = {dockLigands}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
          />
          <ImportedLigandsContainer 
            importedLigands = {uploadedLigands}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {handleSelectedLigand}
            dockHandler = {dockLigands}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
          />
          {
            //Only display docking info if there is a viewing ligand selected
            viewingLigand ? <DockingInfoContainer
              dockingConfigurations = {dockingConfigs}
              selectedDockingConfiguration = {selectedDockingConfig}
              selectConfigurationHandler = {selectConfig}
            />:null
          }
          
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
          showSettings ? <SettingsContainer setShowSettings = {setShowSettings}/>:null
        }
      </>
    );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
