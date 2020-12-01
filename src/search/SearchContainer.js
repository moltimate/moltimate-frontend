import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useForm, { searchQueryURL } from '../util/request';
import { withStyles } from '@material-ui/core/styles';

import BuildIcon from '@material-ui/icons/Build';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';

import ResultsBox from '../common/ResultsBox';
import MenuCard from '../common/MenuCard';
import ErrorBar from '../common/ErrorBar';
import Modal from '../common/Modal'
import ResultDetails from '../common/ResultDetails';
import QueryFormContainer from './form/QueryFormContainer';
import helpText from './SearchText.js'


import styles from './styles.js';


function SearchContainer(props) {
  const { classes, selectedResult, handleSelectedResult, setSearchedProteins, setEClass, clearEClass, setAlignmentInProgress, helpText } = props;
  const { searchBoxModalText } = helpText
  const { values, result, handleChange, handleClearValues, handleSubmit,
    handleChipInput, handleResidues, handleFileUpload, handleFileDelete, handleSetMode } = useForm(searchQueryURL);

  const [expandBuild, setExpandBuild] = useState(false);
  const [expandResult, setExpandResult] = useState(false);
  const [open, setOpen] = useState(true);
  const [ selected, setSelected ] = useState(null);
  const [ res, setRes ] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    handleSetMode('search');
  });

  function filterHandleSelectedResult(e, pdbId, extra) {
    const childId = extra.pdbId;
    const active = pdbId.activeSiteResidues;
    const parentId = pdbId.pdbId;
    const aligned = pdbId.alignedResidues;

    setSelected(pdbId);
    setRes(extra);

    clearEClass();
    setEClass(pdbId.ecNumber, extra.pdbId);
    setAlignmentInProgress(true);

    handleSelectedResult(e, parentId, childId, active, aligned)
  }

  function switchHandler(e, type, extra) {
    switch(type) {
      case 0:
        handleChange(e);
        break;
      case 1:
        handleChipInput(e, extra);
        setSearchedProteins(e);
        break;
      case 2:
        handleResidues(e);
        break;
      case 3:
        handleFileUpload(e);
        break;
      case 4:
        setExpandBuild(false);
        setExpandResult(true);
        handleSubmit(e, clearEClass, setEClass);
        break;
      case 5:
        handleClearValues(e)
        break;
      case 6:
        handleFileDelete(e, type, extra);
        break;
      default:
        break;
      };
  }

  return (
    <>
      {result.error && open?
        <ErrorBar
          open={open}
          message={result.error.response.data.toString()}
          handleClose={setOpen}
        /> : null
      }
      <MenuCard
        label='Search'
        expand={expandBuild}
        handleClick={setExpandBuild}
        modalText={searchBoxModalText}
        cardChild={
          <QueryFormContainer
            values={values}
            helpText={helpText}
            handleChange={switchHandler}
          />
        }
        childIcon={<SearchIcon />}
      />
      {
        result.mode === 'search' ?
          <MenuCard
            label='Search Results'
            modalText={helpText.searchResultsModalText}
            expand={expandResult}
            handleClick={setExpandResult}
            cardChild={
              <ResultsBox
                handleSelectedResult={filterHandleSelectedResult}
                setEClass = {setEClass}
                helpText={helpText}
                temp={ result.data ? result.data.entries : []}
              />
            }
            childIcon={result.pending ? <CircularProgress variant="indeterminate" size={24} thickness={4}/> : <RestoreIcon /> }
        /> : null
      }
      { setAlignmentInProgress(result.pending) }
      {
        selected && result.data ?
          <ResultDetails
            childId={res.pdbId}
            childEc={res.ecNumber}
            parentId={selected.pdbId}
            parentEc={selected.ecNumber}
            rmsd={selected.rmsd}
            active={selected.activeSiteResidues || []}
            aligned={selected.alignedResidues || []}
            handleClose={() => setSelected(null)}
        /> : null
      }
    </>
  );
}

SearchContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SearchContainer);
