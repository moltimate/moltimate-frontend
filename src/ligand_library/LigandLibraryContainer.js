import React, {useState} from "react"
import FilteredResultsBox from '../common/ResultsBox';
import MenuCard from '../common/MenuCard';

import ListIcon from '@material-ui/icons/List';

function LigandLibraryContainer(props){

    const [expandLigandLibrary, setExpandLigandLibrary] = useState(false);

    return(
      <MenuCard
        label='Ligand Library'
        expand={expandLigandLibrary}
        handleClick={setExpandLigandLibrary}
        cardChild={<FilteredResultsBox temp = {null} />}
        childIcon={<ListIcon />}
      />
    );
}
export default LigandLibraryContainer