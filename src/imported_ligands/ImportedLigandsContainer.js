import React, {useState} from "react";
import FilteredResultsBox from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilteredLigandResults from "../common/FilteredLigandResults";

function ImportedLigandsContainer(props){
  const {importedLigands, selectedLigands, clickLigandHandler} = props;
  const [expandImportedLigands, setExpandImportedLigands] = useState(false);

  return(
    <MenuCard
      label='Imported Ligands'
      expand={expandImportedLigands}
      handleClick={setExpandImportedLigands}
      cardChild={
        <FilteredLigandResults 
          temp={importedLigands} 
          selectedLigands={selectedLigands}
          clickLigandHandler={clickLigandHandler}
        />
      }
      childIcon={<AddCircleOutlineIcon />}
    />
  );
}
export default ImportedLigandsContainer