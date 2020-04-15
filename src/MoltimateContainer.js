import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import {library_ligands, 
  test_ligands, 
  fake_docking_data, 
  fake_docking_data_2} from './DummyData'

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

  function Ligand(name, structure){
    this.name = name;
    this.structure = structure;
    this.selected = false;
    this.min_affinity = 0;
    this.macromolecule = false;
    
    function uniqueID(){
      return this.name.toString() + this.macromolecule.toString();
    }
    
    this.uniqueID = uniqueID;
  }


  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
  }

  /**
   * Used to toggle the selection of different ligands for docking and viewing 
   * @param {*} selectedLigand 
   * @param {*} availableLigands 
   * @param {*} setAvailableLigands 
   */
  function handleSelectedLigand(selectedLigand, availableLigands, setAvailableLigands){

    //if the ligand is already selected for viewing, deselect it
    if(viewingLigand == selectedLigand){
      setViewingLigand(null)

    //if docking has already been performed on the selected ligand, select it for viewing
    }else if(dockedLigands.has(selectedLigand)){
      setViewingLigand(selectedLigand)
      
      //this is temporary, for demonstration purposes
      if(selectedLigand.name == "00I"){
        setDockingConfigs(fake_docking_data)
      } else{
        setDockingConfigs(fake_docking_data_2)
      }
    }

    //create a copy of the selectedLigands set for editing
    var new_selected_ligands = new Set(selectedLigands)

    //if the ligand is in already selected for docking, deselect the ligand
    if (new_selected_ligands.has(selectedLigand)){
      new_selected_ligands.delete(selectedLigand)

    //if the ligand is not selected for docking, select the ligand
    } else if(!dockedLigands.has(selectedLigand)){
      new_selected_ligands.add(selectedLigand)
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
    if(showSettings) setShowSettings(false);
    else setShowSettings(true);
  }

  /**
   * add uploaded ligands to the list of uploaded ligands.
   * @param {Set} availableLigands - the set of ligands available to the application
   * @param {Function} setAvailableLigands - setter for the available ligands
   */
  function ligandUploadHandler(e, errorSetter, availableLigands, setAvailableLigands){

    /**
     * Creates a string formula for a ligand, based on the text extracted from the ligand
     * file. String is in the following format: 
     *   [atom 1][number of occurances of atom 1] [atom 2][number of occurances of atom 2] ... [atom n][number of occurances of atom n]
     * excepting atoms which only occur once, which appear without the number of occurances.
     * For example, the formula for ligand 0LI in the PDB is C29 H27 F3 N6 O.
     */
    function ligandFormula(ligandFileText){

      var ligandLines = ligandFileText.split('\n');

      //this is where the first atom indicating line is
      var lineIndex = 5

      //his is the row within a line that the atom name is located
      var atomIndex = 31

      //a count of each atom in the structure
      var atomCount = {}

      //Once a shorter line has been found, we have gone beyond the region where atoms
      //are given
      while(ligandLines[lineIndex].length >= 32){
        var atom = ligandLines[lineIndex].charAt(atomIndex);
        
        //if the atom has already been found, add to its count
        if(atomCount.hasOwnProperty(atom)){
          atomCount[atom] = atomCount[atom] + 1;
        //if this is the atom's first occurance, set its count to 1
        } else {
          atomCount[atom] = 1;
        }   
        lineIndex += 1; 
      }
      var presentAtoms = Object.getOwnPropertyNames(atomCount);
      presentAtoms.sort;
     
      var ligandFormula = "";

      for(var index in presentAtoms){
        atom = presentAtoms[index];
        //if only one instance of the atom appears in the structure, leave off the number
        if(atomCount[atom] == 1)
          ligandFormula = ligandFormula + atom + " ";
        else
          ligandFormula = ligandFormula + atom + atomCount[atom] + " ";
      }
      
      //removes the last character, which is a superfluous space
      ligandFormula = ligandFormula.substring(0,ligandFormula.length - 1);

      return ligandFormula;
    }

    //confirms the object is names as an .sdf file
    function validateLigand(ligandFile){
      var fileNamePattern = /.*\.sdf$/;
      
      return ligandFile.name.match(fileNamePattern);
    }

    //check to make sure only one file was input
    if(e.target.files > 1){
      console.warn("only 1 file should be input - multiple files found");
    }
    var ligandFile = e.target.files[0];

    if(!validateLigand(ligandFile)){
      console.log("invalid ligand");
      errorSetter("Ligand file must be of type .sdf");
      
    //only add the ligand file to the list if it is valid
    }else{
      var reader = new FileReader();

      //extract the file's text
      reader.readAsText(ligandFile);
      reader.onload = () => {
        var ligandText = reader.result;
        var ligandLines = ligandText.split('\n');
        var ligandName = ligandLines[0];
        console.log("ligand name: " + ligandName);

        var ligandFormulaValue = ligandFormula(ligandText);

        //add the new ligand to the list
        setAvailableLigands(
          availableLigands.concat([new Ligand(ligandName, ligandFormulaValue),])
        )
      }

    }

    
  }

  function selectConfig(configSelection){
    setSelectedDockingConfig(configSelection);
    console.log("selected config: " + configSelection[1]);
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
            setImportedLigands = {setUploadedLigands}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {handleSelectedLigand}
            dockHandler = {dockLigands}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
            ligandUploadHandler = {ligandUploadHandler}
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
