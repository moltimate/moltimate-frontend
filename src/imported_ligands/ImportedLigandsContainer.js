import React, {useState} from "react";
import FilteredLigandResults from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'


function ImportedLigandsContainer(props){
  const {importedLigands, setImportedLigands, selectedLigands, dockedLigands, viewingLigand,
    clickLigandHandler, dockHandler, ligandUploadHandler, dockingInProgress,
    dockingError, setDockingError, helpText} = props;
  const [expandImportedLigands, setExpandImportedLigands] = useState(false);

  return(
    <MenuCard
      label='Imported Ligands'
      expand={expandImportedLigands}
      modalText={helpText.importedLigandsModalText}
      handleClick={setExpandImportedLigands}
      cardChild={
        <FilteredLigandResults
          temp={importedLigands}
          helpText={helpText}
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
