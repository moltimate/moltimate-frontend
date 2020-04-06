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
import useForm, {dockRequestURL} from './util/request';

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
  //ligands selected for docking. Do not pass this setter (instead use the 
  //"setSelectedLigands" function)
  const [selectedLigands, setSelectedLigandsInner] = useState(new Set());
  //ligands which have been docked
  const [dockedLigands, setDockedLigands] = useState(new Set());
  //the ligand selected to be viewed
  const [viewingLigand, setViewingLigand] = useState(null);
  //the docking configurations available for the viewing ligand
  const [dockingConfigs, setDockingConfigs] = useState([]);
  //the docking configuration selected to be viewed
  const [selectedDockingConfig, setSelectedDockingConfig] = useState(null);
  //whether the settings are showing or now
  const [showSettings, setShowSettings] = useState(false);
  
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

  var responseFunction = (result)=>{
    console.log(`Result: ${result.data}`);
    for(let field in result.data)
      console.log(`${field}: ${result.data[field]}`);
  }

  const { handleSubmit, setValue, setQueryURL, values } = useForm(dockRequestURL,defaultRequestValues,responseFunction);

  /**
   * Mutate selectedLigands and the relevant form value
   */
 function setSelectedLigands(newLigands){
    var ligandArray = Array.from(newLigands)
    console.log(`ligand array length: ${ligandArray.length}`)
    console.log(`first ligand:`)
    for(let property in ligandArray[0]){
      console.log(`${property}: ${ligandArray[0][property]}`)
    }
    setValue("ligand", ligandArray[0].file);
    setSelectedLigandsInner(newLigands);
  }

  /**
   * Mutate dockingProteinId and the relevant form value
   * 
   * @param {String} newID the PDB ID of the protein to use for docking 
   */
  function setDockingProteinId(newID){
    setValue("macromoleculeID", newID);
    setDockingProteinIdInner(newID);
  }

  /**
   * Mutate the dockingCenter virtual attribute
   * 
   * @param newCenter the new center of the docking search area.
   */
  function setDockingCenter(newCenter){
    setValue("center_x", newCenter[0]);
    setValue("center_y", newCenter[1]);
    setValue("center_z", newCenter[2]);
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
    setValue("size_x", newRange[0]);
    setValue("size_y", newRange[1]);
    setValue("size_z", newRange[2]);
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

  const handleDockingResponse = (result) => {
    if(result.data){
      console.log("response received: \n" + result.data)
    } else {
      console.log("error received: \n" + result.error)
    }  
  }

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
    //this value is used for docking
    setDockingProteinId(parentId);
  }

  const dockLigands = (callback) =>{

    console.log("Docking Request Sent");

    handleSubmit();

    pollDockingResults();

    callback;
  }

  const pollDockingResults = () =>{

    //if timeout, return timeout

    //submit req

    //if sucess, return success

    //if failure, poll again
  }

  /**
   * Used to submit a ligand-protein pair for docking
   * 
   * @param {Function} callback Callback function to be called on the completion or 
   *  failure of the docking operation. The callback function includes 2 parameters: a
   *  number and an (optional) message. 
   */
  function sendDockingRequest(callback){
    if(!dockingProteinID){
      console.log("Must select a docking protein");
      return "Must select a protein from the search results to dock a ligand";
    }
    var dockingLigands = Array.from(selectedLigands)
    if(dockingLigands.length == 0){
      console.log("Must select at least one ligand");
      return "Must have at least one ligand selected to dock a ligand";

    } else{

      dockLigands(callback);
    }
    //this means there was no issue with the docking procedure
    return 0;
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

  /**
   * Sends a docking request with the relevant information to the backend.
   * 
   * @param {Function} setError sets an error message, notifying the client component that something went 
   *  wrong with the docking
   */
  function ligandDockingHandler(setError){
    var new_docked_ligands =  new Set(selectedLigands)
    for(let ligand of dockedLigands){
      new_docked_ligands.add(ligand)
    }
    
    var errorMessage = sendDockingRequest(()=>{console.log("Request Sent")});
    
    if(errorMessage){
      setError(errorMessage);
    }

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
   * add uploaded ligands to the list of uploaded ligands
   */
  function ligandUploadHandler(e, errorSetter){

    var files = e.target.files;

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
    if(files > 1){
      console.warn("only 1 file should be input - multiple files found");
    }
    var ligandFile = files[0];

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

        var ligandFormulaValue = ligandFormula(ligandText);

        //add the new ligand to the list
        setUploadedLigands(
          uploadedLigands.concat([{name:ligandName, structure:ligandFormulaValue, 
            selected:false, min_affinity: 1001, file: files[0]},])
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
            dockHandler = {ligandDockingHandler}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
          />
          <ImportedLigandsContainer 
            importedLigands = {uploadedLigands}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {handleSelectedLigand}
            dockHandler = {ligandDockingHandler}
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
          showSettings ? <SettingsContainer setShowSettings = {setShowSettings}
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
