import React, {useState} from "react"
import ResultsBox from '../common/ResultsBox';
import MenuCard from '../common/MenuCard';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function ImportedLigandsContainer(props){

    const [expandImportedLigands, setExpandImportedLigands] = useState(false);

    return(
      <MenuCard
        label='Imported Ligands'
        expand={expandImportedLigands}
        handleClick={setExpandImportedLigands}
        cardChild={<ResultsBox values={null} handleChange={null} />}
        childIcon={<AddCircleOutlineIcon />}
      />
    );
}
export default ImportedLigandsContainer