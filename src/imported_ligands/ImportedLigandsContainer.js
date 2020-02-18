import React, {useState} from "react";
import FilteredLigandResults from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function ImportedLigandsContainer(props){
  const {importedLigands, selectedLigands, dockedLigands, viewingLigand, 
    clickLigandHandler, dockHandler, ligandUploadHandler} = props;
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
        />
      }
      childIcon={<AddCircleOutlineIcon />}
    />
  );
}
export default ImportedLigandsContainer