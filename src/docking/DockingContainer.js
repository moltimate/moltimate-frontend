import React, {useState, useEffect} from "react";
import LigandLibraryContainer from "../ligand_library/LigandLibraryContainer";
import ImportedLigandsContainer from "../imported_ligands/ImportedLigandsContainer";
import DockingInfoContainer from "../docking_info/DockingInfoContainer";
import useForm, {dockRequestURL} from "../util/request"
import axios from "axios";

import {library_ligands, 
  test_ligands, 
  fake_docking_data, 
  fake_docking_data_2} from '../DummyData'

function DockingContainer(props){
  const { selectedMacromolecule, dockingCenter, dockingRange} = props;

  //ligands selected for docking. Do not pass this setter (instead use the 
  //"setSelectedLigands" function)
  const [selectedLigands, setSelectedLigandsInner] = useState(new Set());
  //autopopulating data on ligands
  const [ libraryLigands, setLibraryLigands ] = useState(library_ligands);
  //data on all the ligands the user has uploaded
  const [ uploadedLigands, setUploadedLigands ] = useState(test_ligands);
  //ligands which have been docked
  const [dockedLigands, setDockedLigands] = useState(new Set());
  //the ligand selected to be viewed
  const [viewingLigand, setViewingLigand] = useState(null);
  //the docking configurations available for the viewing ligand
  const [dockingConfigs, setDockingConfigs] = useState([]);
  //the docking configuration selected to be viewed
  const [selectedDockingConfig, setSelectedDockingConfig] = useState(null);
  //true if any ligands are currently being docked
  const [dockingInProgress, setDockingInProgress] = useState(false);
  //Each object represnts the results of one docking job
  //each object contains a ligand, a macromoleculeID, and data
  const [dockingResults, setDockingResults] = useState(new Array());
  //Text telling if there is a docking error
  const [dockingError, setDockingError] = useState(false);

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

  const {handleSubmit, setFormValue} = useForm(dockRequestURL,defaultRequestValues,handleDockingResponse);

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

    //if there are any docking results
    if(dockingResults[0]){
      //only handle one at a time
      let dockingResult = dockingResults[0];

      let ligandID = dockingResult.ligandID;

      var dockedLigand;

      console.log(dockingResults);
      console.log(uploadedLigands)
      if(uploadedLigands[ligandID]){
        dockedLigand = Object.assign({},uploadedLigands[ligandID])
      }else if(libraryLigands[ligandID]){
        dockedLigand = Object.assign({},ligandLibrary[ligandID])
      }else{
        console.error("docked ligand cannot be found in any library");
        dockedLigand = {};
      }

      dockedLigand.macromolecule = dockingResult.macromoleculeID;
      Object.assign(dockedLigand, dockingResult.data);
      console.log(dockingResult.data);

      if(uploadedLigands[ligandID]){
        uploadedLigands[ligandID] = dockedLigand;
      }else if(libraryLigands[ligandID]){
        libraryLigands[ligandID] = dockedLigand;
      }
      console.log(dockedLigand)
      setViewingLigand(dockedLigand);
    }
  },[dockingInProgress, dockingResults]);

  useEffect(() => {

    if(viewingLigand){
      setDockingConfigs(viewingLigand.dockingData);
      setSelectedDockingConfig(1);
    }

  },[viewingLigand]);

  useEffect(() => {
    setFormValue("macromoleculeID",selectedMacromolecule)
  },[selectedMacromolecule]);

  useEffect(() => {
    if(dockingCenter){
      if(dockingCenter.length != 3){
        console.error(`dockingCenter has length of ${dockingCenter.length}, expected 3`)
      }
      setFormValue("center_x",dockingCenter[0])
      setFormValue("center_y",dockingCenter[1])
      setFormValue("center_z",dockingCenter[2])
    }
  },[dockingCenter]);

  useEffect(() => {
    if(dockingCenter){
      if(dockingRange.length != 3){
        console.error(`dockingRange has length of ${dockingRange.length}, expected 3`)
      }
      setFormValue("size_x",dockingRange[0])
      setFormValue("size_y",dockingRange[1])
      setFormValue("size_z",dockingRange[2])
    }
  },[dockingRange]);

  function Ligand(name, structure){
    this.name = name;
    this.structure = structure;
    this.selected = false;
    this.min_affinity = 0;
    this.macromolecule = false;
    this.library = "";
    
    function uniqueID(){
      return this.name.toString() + this.macromolecule.toString() + this.library.toString();
    }
    
    this.uniqueID = uniqueID;
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

  //Used to toggle the selection of different ligands for docking and viewing
  function handleSelectedLigand(selectedLigand){

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

    //if the ligand is not selected for docking, and there is no selected ligand, select the ligand
    } else if(!dockedLigands.has(selectedLigand)){
      new_selected_ligands.add(selectedLigand)
    }
    
    setSelectedLigands(new_selected_ligands)
  }

  /**
   * add uploaded ligands to the list of uploaded ligands.
   * @param {Set} availableLigands - the set of ligands available to the application
   * @param {Function} setAvailableLigands - setter for the available ligands
   */
  function ligandUploadHandler(e, errorSetter, availableLigands, setAvailableLigands){

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
        var newLigand = new Ligand(ligandName, ligandFormulaValue)
        newLigand["file"] = files[0]
        if(availableLigands == uploadedLigands){
          newLigand["library"] = "uploaded"
        } else {
          newLigand["library"] = "other"
        }
        var newAvailableLigands = Object.assign({},availableLigands)
        newAvailableLigands[newLigand.uniqueID()] = newLigand
        setAvailableLigands(newAvailableLigands);
      }
    }
  }

  function selectConfig(configSelection){
    setSelectedDockingConfig(configSelection[0]);
    console.log("selected config: " + configSelection[0]);
  }

  function dockLigands(callback){
    console.log("Docking Request Sent");
    setDockingInProgress(true);
  }

  /**
   * Used to submit a ligand-protein pair for docking
   * 
   * @param {Function} callback Callback function to be called on the completion or 
   *  failure of the docking operation. The callback function includes 2 parameters: a
   *  number and an (optional) message. 
   */
  function sendDockingRequest(callback){
    if(!selectedMacromolecule){
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
      setFormValue("ligand", ligandArray[0].file);
    } else {
      console.log(setFormValue)
      setFormValue("ligand", null);
    }
    //if there are no ligands, there will be none in the docking request
    setSelectedLigandsInner(newLigands);
  }

  return <>
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
      setImportedLigands = {setUploadedLigands}
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
        selectedDockingConfig = {selectedDockingConfig}
        selectConfigurationHandler = {selectConfig}
      />:null
    }
  </>
}

export default DockingContainer