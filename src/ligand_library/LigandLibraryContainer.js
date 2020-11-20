import React, {useState} from "react"
import FilteredLigandResults from '../common/FilteredLigandResults';
import MenuCard from '../common/MenuCard';

import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

function LigandLibraryContainer(props){
    const {library, selectedLigands, dockedLigands, viewingLigand, clickLigandHandler, dockHandler,
        alignmentInProgress, dockingInProgress, dockingError, setDockingError} = props
    const [expandLigandLibrary, setExpandLigandLibrary] = useState(false);

    if( alignmentInProgress && expandLigandLibrary ) {
        setExpandLigandLibrary(false);
    }

    return(
      <MenuCard
        label='Ligand Library'
        expand={expandLigandLibrary}
        handleClick={setExpandLigandLibrary}
        cardChild={<FilteredLigandResults 
            temp={library} 
            selectedLigands = {selectedLigands}
            dockedLigands = {dockedLigands}
            clickLigandHandler={clickLigandHandler}
            dockHandler = {dockHandler}
            viewingLigand = {viewingLigand}
            midDocking = { dockingInProgress }
            dockingError = {dockingError}
            setDockingError = {setDockingError}
          />}
        childIcon={<ListIcon />}
        childIcon={alignmentInProgress || dockingInProgress ? <CircularProgress variant="indeterminate" size={24} thickness={4}/>:<AddCircleOutlineIcon />}
      />
    );
}
export default LigandLibraryContainer