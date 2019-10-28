import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import SearchContainer from './search/SearchContainer';
import BuilderContainer from './builder/BuilderContainer';
import ProteinContainer from './protein/ProteinContainer';
import LigandLibraryContainer from './ligand_library/LigandLibraryContainer';
import ImportedLigandsContainer from './imported_ligands/ImportedLigandsContainer';
import TopBar from './TopBar';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function MoltimateContainer(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(false);
  const [ selectedResult, setSelectedResult ] = useState(null);
  const [ nglData, setNglData ] = useState(null);
  const test_ligands = [
    {name:"ligand1",structure:"C20 H28 N2 O"},
    {name:"ligand2A",structure:"C20 H22 N10 O2 S"}];
  const [ uploadedLigands, setUploadedLigands ] = useState(test_ligands);

  function handleSelectedResult(e, parentId, childId, active, aligned) {
    setSelectedResult({ parentId, childId, active, aligned });
    setNglData({ parentId, childId, active, aligned });
  }

    return (
      <>
        <TopBar />
        <div className={classes.controlPanel}>
          <SearchContainer
            handleSelectedResult={handleSelectedResult}
            selectedResult={selectedResult}
          />
          <BuilderContainer
            handleSelectedResult={handleSelectedResult}
            selectedResult={selectedResult}
          />
          <LigandLibraryContainer/>
          <ImportedLigandsContainer 
            importedLigands = {uploadedLigands}
          />
        </div>
        {
          nglData ? <ProteinContainer
            parentId={nglData.childId}
            childId={nglData.parentId}
            active={nglData.active}
            aligned={nglData.aligned}
          /> : null
        }
      </>
    );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
