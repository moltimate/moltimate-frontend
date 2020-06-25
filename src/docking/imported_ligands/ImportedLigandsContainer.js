import React, {useState} from "react";
import FilteredLigandResults from '../FilteredLigandResults';
import MenuCard from '../../common/MenuCard';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'


function ImportedLigandsContainer(props){
  const {
    //an object containing Ligand objects. Each key is the ligand's unique ID.
    importedLigands, 
    //setter for importedLigands
    setImportedLigands, 
    //an object containing Ligand objects which represent ligands selected for docking
    selectedLigands, 
    //an object containing Ligand objects which have had dockings already performed on them
    dockedLigands, 
    //the Ligand object being viewed
    viewingLigand, 
    //an event handler used to handle ligand selection for docking and viewing
    clickLigandHandler, 
    //an event handler used to initiate docking
    dockHandler, 
    //an even handler used to upload ligands
    ligandUploadHandler, 
    //true when docking is in progress
    dockingInProgress, 
    //contains a message when there is a docking error to show (falsy otherwise)
    dockingError, 
    //set the docking error message
    setDockingError
  } = props;
  const [expandImportedLigands, setExpandImportedLigands] = useState(false);

  return(
    <MenuCard
      label='Imported Ligands'
      expand={expandImportedLigands}
      handleClick={setExpandImportedLigands}
      cardChild={
        <FilteredLigandResults 
          temp={importedLigands}
          handleLigandUpload={(e, errorSetter) => 
            ligandUploadHandler(e,errorSetter,importedLigands,setImportedLigands)} 
          selectedLigands={selectedLigands}
          dockedLigands = {dockedLigands}
          clickLigandHandler={clickLigandHandler}
          dockHandler = {dockHandler}
          viewingLigand = {viewingLigand}
          uploadButton = {true}
          midDocking = { dockingInProgress }
          dockingError = {dockingError}
          setDockingError = {setDockingError}
        />
      }
      //Shows a rotating progress icon if request is still in progress
      childIcon={dockingInProgress ? <CircularProgress variant="indeterminate" size={24} thickness={4}/>:<AddCircleOutlineIcon />}
    />
  );
}

ImportedLigandsContainer.propTypes = {
  /** true if any ligands are undergoing docking */
  dockingInProgress: PropTypes.bool,
  /** 
   * Is called whenever a a ligand is to be uploaded. accepts an event and an error message (string) 
   * mutator function
   */
  ligandUploadHandler: PropTypes.func,
};

export default ImportedLigandsContainer;