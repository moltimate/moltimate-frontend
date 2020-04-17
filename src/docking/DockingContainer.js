import React from "react"
import LigandLibraryContainer from "../ligand_library/LigandLibraryContainer"
import ImportedLigandsContainer from "../imported_ligands/ImportedLigandsContainer"
import DockingInfoContainer from "../docking_info/DockingInfoContainer"

function DockingContainer(props){
  const {library, selectedLigands, clickLigandHandler, dockHandler, viewingLigand, dockedLigands, importedLigands,
    setImportedLigands, ligandUploadHandler, dockingInProgress, dockingError, setDockingError, dockingConfigurations,
    selectedDockingConfig, selectConfigurationHandler} = props;

  return <>
        <LigandLibraryContainer
            library = {library}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {clickLigandHandler}
            dockHandler = {dockHandler}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
          />
          <ImportedLigandsContainer 
            importedLigands = {importedLigands}
            setImportedLigands = {setImportedLigands}
            selectedLigands = {selectedLigands}
            clickLigandHandler = {clickLigandHandler}
            dockHandler = {dockHandler}
            viewingLigand = {viewingLigand}
            dockedLigands = {dockedLigands}
            ligandUploadHandler = {ligandUploadHandler}
            dockingInProgress = {dockingInProgress}
            dockingError = {dockingError}
            setDockingError = {setDockingError}
          />
          {
            //Only display docking info if there is a viewing ligand selected
            viewingLigand ? <DockingInfoContainer
              dockingConfigurations = {dockingConfigurations}
              selectedDockingConfig = {selectedDockingConfig}
              selectConfigurationHandler = {selectConfigurationHandler}
            />:null
          }
    </>
}

export default DockingContainer