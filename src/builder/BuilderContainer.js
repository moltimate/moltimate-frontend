import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useForm from '../util/request';

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
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import BuilderForm from './form/BuilderForm';
import ResultsBox from './results/ResultsBox';
import MenuCard from './MenuCard';
import ErrorBar from '../common/ErrorBar';
import ResultDetails from '../common/ResultDetails';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function BuilderContainer(props) {
  const { classes } = props;
  const { values, result, handleChange, handleClearValues, handleSubmit,
    handleChipInput, handleResidues, handleFileUpload, handleFileDelete } = useForm();

  const [expandBuild, setExpandBuild] = useState(false);
  const [expandResult, setExpandResult] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  function handleSelectedResult(e, pdbId) {
    const temp = result.data.alignments.filter(a => {
      return a.queryPdbId === pdbId;
    })
    setSelectedResult(temp[0]);
  }

  function switchHandler(e, type, extra) {
    switch(type) {
      case 0:
        handleChange(e);
        break;
      case 1:
        handleChipInput(e);
        break;
      case 2:
        handleResidues(e);
        break;
      case 3:
        handleFileUpload(e);
        break;
      case 4:
        handleSubmit();
        setExpandBuild(false);
        setExpandResult(true);
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
      {result.error.type === 500 && open ?
        <ErrorBar
          open={open}
          message={result.error.message}
          handleClose={setOpen}
        /> : null
      }
      <MenuCard
        label='Maker'
        expand={expandBuild}
        handleClick={setExpandBuild}
        cardChild={<BuilderForm values={values} handleChange={switchHandler} />}
        childIcon={<BuildIcon />}
      />
      {
        result.data ? <MenuCard
          label='Test Results'
          expand={expandResult}
          handleClick={setExpandResult}
          cardChild={<ResultsBox results={result.data} handleSelectedResult={handleSelectedResult}/>}
          childIcon={result.pending ? <CircularProgress variant="indeterminate" size={24} thickness={4}/> : <RestoreIcon /> }
        /> : null
      }
      {
        selectedResult ? <ResultDetails motifPdbId={result.data.motifPdbId} activeSiteResidues={result.data.activeSiteResidues} motifEC={result.data.motifEcNumber} compare={selectedResult}/> : null
      }
    </>
  );
}

BuilderContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(BuilderContainer);
