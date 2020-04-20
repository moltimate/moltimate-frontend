import React, {useState, useEffect} from "react";
import LigandLibraryContainer from "../ligand_library/LigandLibraryContainer";
import ImportedLigandsContainer from "../imported_ligands/ImportedLigandsContainer";
import DockingInfoContainer from "../docking_info/DockingInfoContainer";
import useForm, {dockRequestURL, dockingMoleculeFileRetrievalURL} from "../util/request"
import axios from "axios";

import {library_ligands, 
  test_ligands, 
  fake_docking_data, 
  fake_docking_data_2} from '../DummyData'

function DockingContainer(props){
  const { selectedMacromolecules, dockingCenter, dockingRange, setDisplayedFile, setDisplayedConfiguration, 
    setDisplayedActiveSites, viewingLigand, setViewingLigand } = props;

  //ligands selected for docking. Do not pass this setter (instead use the 
  //"setSelectedLigands" function)
  const [selectedLigands, setSelectedLigandsInner] = useState(new Set());
  //autopopulating data on ligands
  const [ libraryLigands, setLibraryLigands ] = useState(library_ligands);
  //data on all the ligands the user has uploaded
  const [ uploadedLigands, setUploadedLigands ] = useState(test_ligands);
  //ligands which have been docked (These are all ligandID strings)
  const [dockedLigands, setDockedLigands] = useState(new Set());
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
    var pollingTimer; 

    function checkDockingResults(){
      axios.get(requestURL).then( (response) =>{

        if(response.status == 200){
          //stop polling
          clearInterval(pollingTimer);

          //save the results
          var newDockingResults = new Array().concat(dockingResults);
          newDockingResults.push({
            ligandID: ligand.uniqueID(),
            macromoleculeID: macromoleculeID,
            data: response.data
          });

          console.log("docking response") 
          console.log(newDockingResults)
          setDockingResults(newDockingResults);
          
          //indicate docking is complete
          setDockingInProgress(false);
          
        }
      }).catch((error) => {
        setDockingInProgress(false);
        clearInterval(pollingTimer)
        processHTTPError("Error retrieving docking data",error)
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
    if(result.data){
      if(!values["macromoleculeID"]){

        console.error("macromoleculeID was absent from docking request");

        return -1
      }
      let requestURL = `${dockRequestURL}?jobId=${result.data.jobId}&pdbId=${values.macromoleculeID}`;
      let retryFrequency = 20;//seconds
      let timeout = 900;//seconds

      //We assume there is only one selected ligand for now - this may be changed at a later time
      let selectedLigandArray = Array.from(selectedLigands)
      let selectedLigand = selectedLigandArray[0]
      pollDockingResults(requestURL, retryFrequency, timeout, selectedLigand, values.macromoleculeID)
    }else{
      console.error(`Error: ${result.error}`);
 
    }
  }

  const {handleSubmit, setFormValue, result} = useForm(dockRequestURL,defaultRequestValues,handleDockingResponse);

  useEffect(() => {
    
    if(dockingInProgress){
      handleSubmit()
    } 
  },[dockingInProgress]);

  useEffect(() => {
    
    if(result.error){
      processHTTPError("Error posting dock request",result.error)
      setDockingInProgress(false);
    } 

  },[result]);

  useEffect(() => {
    //if there are any docking results
    if(dockingResults[0]){
      //only handle one at a time
      let dockingResult = dockingResults.shift();

      console.log("docking results off queue") 
      console.log(dockingResult)

      let ligandID = dockingResult.ligandID;

      //add this ligand to the "dockedLigands" set
      let newDockedLigands = new Set(dockedLigands);
      newDockedLigands.add(ligandID);
      setDockedLigands(newDockedLigands);

      //empty the selected ligands set
      setSelectedLigands(new Set());

      //create a copy of the ligand as it exists in uploadedLigands or ligandLibrary
      let dockedLigand;
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

      //add the modified ligand back to its appropriate library with its new properties
      let modifiedLigandLibrary = {}
      if(uploadedLigands[ligandID]){
        modifiedLigandLibrary = Object.assign({},uploadedLigands)
        modifiedLigandLibrary[ligandID] = dockedLigand;
        setUploadedLigands(modifiedLigandLibrary);
      }else if(libraryLigands[ligandID]){
        modifiedLigandLibrary = Object.assign({},libraryLigands)
        modifiedLigandLibrary[ligandID] = dockedLigand;
        setLibraryLigands(modifiedLigandLibrary);
      }
      

      console.log("viewing ligand") 
      console.log(dockedLigand)
      setViewingLigand(dockedLigand);
    }
  },[dockingResults]);

  useEffect(() => {

    if(viewingLigand){
      console.log("new viewing ligand:");
      console.log(viewingLigand);
      setDockingConfigs(viewingLigand.dockingData);
      
      setSelectedDockingConfig(1);

      //clear the previous value
      setDisplayedFile(null);
      setDisplayedConfiguration(1);
      //sets the displayed file based on the viewing ligand.
      setTimeout(()=>retrieveDockedMoleculeFile(viewingLigand,setDisplayedFile),2000)
      console.log("setting active sites") 
      console.log(viewingLigand.activeSites)
      setDisplayedActiveSites(viewingLigand.activeSites)
      
    } else{
      setDockingConfigs([]);
    }

  },[viewingLigand]);

  useEffect(() => {
    //use the first macromolecule if there is one. 
    if(selectedMacromolecules[0])setFormValue("macromoleculeID",selectedMacromolecules[0]);
    else setFormValue("macromoleculeID",null);
  },[selectedMacromolecules]);

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
    this.timeOfCreation = Date.now()
    
    function uniqueID(){
      //return this.name.toString() + this.macromolecule.toString() + this.library.toString();
      return this.name.toString() + this.timeOfCreation.toString();
    }
    
    this.uniqueID = uniqueID;
  }

  /**
   * Given a docked ligand object, retrieve the relevant molecule file
   * 
   * @param {Ligand} ligand a ligand object
   * @param {Function} fileSetter the setter function that will receive the docked molecule
   */
  function retrieveDockedMoleculeFile(ligand, fileSetter){

    if(!ligand.babelJobId){
      console.error("no babel job ID found attached to ligand");
    }

    //this is the ID value that is used to specify which file to retrieve
    let babelJobId = ligand.babelJobId;

    let fileRequestURL = `${dockingMoleculeFileRetrievalURL}?babelJobId=${babelJobId}`;

    axios.get(fileRequestURL).then((response)=>{
      let data = response.data;
      let dataBlob = new Blob([data],{ type: 'text/plain' })
      let moleculeFile = new File([dataBlob],`${babelJobId}.pdb`,{ type: 'text/plain' });
      fileSetter(moleculeFile);
      
    }).catch((error) =>{
      processHTTPError("Error retrieving molecule file", error);
    });
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
    
    var errorMessage = sendDockingRequest(()=>{});
    
    if(errorMessage){
      setError(errorMessage);
    }

  }

  //Used to toggle the selection of different ligands for docking and viewing
  function handleSelectedLigand(selectedLigand){

    //if the ligand is already selected for viewing, deselect it
    if(viewingLigand && viewingLigand.uniqueID() == selectedLigand.uniqueID()){
      setViewingLigand(null)

    //if docking has already been performed on the selected ligand, select it for viewing
    }else if(dockedLigands.has(selectedLigand.uniqueID())){
      setViewingLigand(selectedLigand)
    }

    //create a copy of the selectedLigands set for editing
    var new_selected_ligands = new Set(selectedLigands)

    //if the ligand is in already selected for docking, deselect the ligand
    if (new_selected_ligands.has(selectedLigand)){
      new_selected_ligands.delete(selectedLigand)

    //if the ligand is not selected for docking, and there is no selected ligand, select the ligand
    } else if(!dockedLigands.has(selectedLigand.uniqueID())){
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


  /**
   * Display an error message based on an http error
   * @param {} messagePreface 
   * @param {*} postError 
   */
  function processHTTPError(messagePreface, postError){
    let error;
      if(postError.response && postError.response.data){
        error = postError.response.data
      }else{
        error = postError.toString()
      }
      setDockingError(messagePreface + ": " + error);
  }


  function selectConfig(configSelection){
    setSelectedDockingConfig(configSelection[0]);
    setDisplayedConfiguration(configSelection[0]);
  }

  function dockLigands(callback){
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
    let errorMessage = "Docking request rejected for uncertain reason";
    if(!selectedMacromolecules || selectedMacromolecules.length == 0){
      errorMessage = "Must select a docking protein to send docking request. Please enter an enzyme PDB ID in the " +
        "search bar to continue"
      console.error(errorMessage);
      return errorMessage;
    }
    if(selectedMacromolecules.length > 1){
      errorMessage = `${selectedMacromolecules.length} proteins selected, but Multi-protein docking is not ` + 
      `supported. Please remove search IDs until 1 remains.`
      console.error(errorMessage);
      return errorMessage;
    }
    var dockingLigands = Array.from(selectedLigands)
    if(dockingLigands.length == 0){
      errorMessage = "Must select a ligand to send docking request"
      console.error(errorMessage);
      return errorMessage;

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

      setFormValue("ligand", ligandArray[0].file);
    } else {
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
        selectedDockingConfiguration = {selectedDockingConfig}
        selectConfigurationHandler = {selectConfig}
      />:null
    }
  </>
}

export default DockingContainer