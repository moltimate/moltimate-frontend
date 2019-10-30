import React, {useState} from "react"
import FilteredLigandResults from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';

import ListIcon from '@material-ui/icons/List';

function LigandLibraryContainer(props){
    const {library, selectedLigands, clickLigandHandler} = props
    const [expandLigandLibrary, setExpandLigandLibrary] = useState(false);

    return(
      <MenuCard
        label='Ligand Library'
        expand={expandLigandLibrary}
        handleClick={setExpandLigandLibrary}
        cardChild={<FilteredLigandResults 
            temp={library} 
            selectedLigands = {selectedLigands}
            clickLigandHandler={clickLigandHandler}
          />}
        childIcon={<ListIcon />}
      />
    );
}
export default LigandLibraryContainer