import React, {useState} from "react";
import FilteredResultsBox from '../common/FilteredResultsBox';
import MenuCard from '../common/MenuCard';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function ImportedLigandsContainer(props){
  const {importedLigands} = props;
  const [expandImportedLigands, setExpandImportedLigands] = useState(false);

  return(
    <MenuCard
      label='Imported Ligands'
      expand={expandImportedLigands}
      handleClick={setExpandImportedLigands}
      cardChild={<FilteredResultsBox temp={importedLigands} />}
      childIcon={<AddCircleOutlineIcon />}
    />
  );
}
export default ImportedLigandsContainer