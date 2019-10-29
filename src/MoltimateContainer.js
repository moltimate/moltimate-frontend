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
  const library_ligands = [
    {name:"00I",structure:"C30 H35 N5 O6 S"},
    {name:"00K",structure:"C28 H44 N6 O4"},
    {name:"00L",structure:"C30 H42 N8 O4"},
    {name:"00N",structure:"C24 H34 N8 O3 S"},
    {name:"00P",structure:"C22 H29 N5 O5 S"},
    {name:"00Q",structure:"C27 H35 N7 O3 S"},
    {name:"00R",structure:"C24 H29 N7 O5 S"},
    {name:"02P",structure:"C21 H26 C1 N4 O2"},];
  const test_ligands = [
    {name:"ligand1",structure:"C20 H28 N2 O"},
    {name:"ligand2A",structure:"C20 H22 N10 O2 S"}];

  const [ uploadedLigands, setUploadedLigands ] = useState(test_ligands);
  const [ libraryLigands, setLibraryLigands ] = useState(library_ligands);

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
          <LigandLibraryContainer
             library = {libraryLigands}
          />
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
