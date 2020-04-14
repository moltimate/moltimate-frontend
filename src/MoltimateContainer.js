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

  useEffect(() => {
    if(dockingInProgress){
      handleSubmit()
    } else {
      var newDockedLigands = new Set(dockedLigands);
      //add each of the selected ligands to the new docked ligands set
      for(let ligand of selectedLigands.values()){
        newDockedLigands.add(ligand);
      }
      setDockedLigands(newDockedLigands);
      //empty the selected ligands set
      setSelectedLigands(new Set());
    }

    if(dockingResults[0]){
      //only handle one at a time
      let dockingResult = dockingResults[0];
      
      let newUploadedLigands = new Set(uploadedLigands);
      
      let dockedLigand = dockingResult.ligand;
      newUploadedLigands.delete(dockedLigand);
      
      let newDockedLigand = Object.assign({},dockedLigand);
      Object.assign(newDockedLigand,dockingResult.data);
    
      newUploadedLigands.add(newDockedLigand);
      setUploadedLigands(newUploadedLigands);

      setDockingResults(dockingResults.slice(1));
      console.log("UploadedLigands contents")
      for(let ligand of newUploadedLigands.keys()){
        console.log(ligand);
      }
    }


  },[dockingInProgress, dockingResults]);

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

      pollDockingResults(requestURL, retryFrequency, timeout, selectedLigand, values.macromoleculeID)
    }else{
      console.log("point 4")
      console.error(`Error: ${result.error}`);
    }

    console.log("point 5")
  }

  const { handleSubmit, setValue, values, result } = useForm(dockRequestURL,defaultRequestValues,handleDockingResponse);

  /**
   * Mutate selectedLigands and the relevant form value
   */
  function setSelectedLigands(newLigands){
    //if there are ligands, add the first of them to the docking req
    if(newLigands.size > 0){
      var ligandArray = Array.from(newLigands)
      console.log(`ligand array length: ${ligandArray.length}`)
      console.log(`first ligand:`)
      for(let property in ligandArray[0]){
        console.log(`${property}: ${ligandArray[0][property]}`)
      }
      setValue("ligand", ligandArray[0].file);
    } else {
      setValue("ligand", null);
    }
    //if there are no ligands, there will be none in the docking request
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
          var newDockingResults = new Array(dockingResults);
          newDockingResults.push({
            ligand: ligand,
            macromoleculeID: macromoleculeID,
            data: response.data
          });
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

    //if the ligand is not selected for docking, and there is no selected ligand, select the ligand
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
            dockingInProgress = {dockingInProgress}
            dockingError = {dockingError}
            setDockingError = {setDockingError}
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
