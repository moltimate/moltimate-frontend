import React, {useState} from "react"
import FilteredLigandResults from '../FilteredLigandResults';
import MenuCard from '../../common/MenuCard';

import ListIcon from '@material-ui/icons/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

function LigandLibraryContainer(props){
    const {
      //an object containing the Ligand objects available for use
      library, 
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
      //true when an alignment search is in progress
      alignmentInProgress, 
      //true when docking is in progress
      dockingInProgress, 
      //contains a message when there is a docking error to show (falsy otherwise)
      dockingError, 
      //set the docking error message
      setDockingError
    } = props
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