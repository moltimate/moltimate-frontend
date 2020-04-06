import React, {useState} from "react";
import FilteredLigandResults from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress'

/**
 * 
 * @param {Props} props
 * @param {Object} props.dockingResults
 * @param {string} props.dockingResults.
 */
function ImportedLigandsContainer(props){
  const {importedLigands, selectedLigands, dockedLigands, viewingLigand, 
    clickLigandHandler, dockHandler, ligandUploadHandler, dockingResults} = props;
  const [expandImportedLigands, setExpandImportedLigands] = useState(false);

  return(
    <MenuCard
      label='Imported Ligands'
      expand={expandImportedLigands}
      handleClick={setExpandImportedLigands}
      cardChild={
        <FilteredLigandResults 
          temp={importedLigands}
          handleLigandUpload={ligandUploadHandler} 
          selectedLigands={selectedLigands}
          dockedLigands = {dockedLigands}
          clickLigandHandler={clickLigandHandler}
          dockHandler = {dockHandler}
          viewingLigand = {viewingLigand}
          uploadButton = {true}
          midDocking = { !!dockingResults.pending }
        />
      }
      //Shows a rotating progress icon if request is still in progress
      childIcon={dockingResults.pending ? <CircularProgress variant="indeterminate" size={24} thickness={4}/>:<AddCircleOutlineIcon />}
    />
  );
}

ImportedLigandsContainer.propTypes = {
  /**
   * The results of a docking operation. 
   */
  dockingResults: PropTypes.object,
  /** 
   * Is called whenever a a ligand is to be uploaded. accepts an event and an error message (string) 
   * mutator function
   */
  ligandUploadHandler: PropTypes.func,
};

export default ImportedLigandsContainer;