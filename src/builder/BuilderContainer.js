import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useForm from '../util/request';

import BuildIcon from '@material-ui/icons/Build';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';
import CircularProgress from '@material-ui/core/CircularProgress';

import BuilderForm from './form/BuilderForm';
import ResultsBox from './results/ResultsBox';
import ProteinContainer from '../protein/ProteinContainer';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function BuilderContainer(props) {
  const { classes } = props;
  const { values, result, handleChange, handleClear, handleSubmit, handleChipInput } = useForm();
  const [expandBuild, setExpandBuild] = useState(false);
  const [expandResult, setExpandResult] = useState(false);
  const [selectedResult, setSelectedResult] = useState({});
  const [open, setOpen] = useState(true);

  function handleSubmitExpand() {
    handleSubmit();
    setExpandBuild(false);
    setExpandResult(true);
  }

  return (
    <>
      {result.error ? <SnackbarContent
        className={classes.error}
        open={open}
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon}/>
              There was an error with the query
            </span>
        }
        action={[
          <IconButton
            key="close"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
        </IconButton>,
        ]}
          /> : null}
      <Card className={classNames(classes.search, classes.marginTop)} >
        <ListItem button onClick={() => setExpandBuild(!expandBuild)}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText inset primary='Maker' />
          {expandBuild ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expandBuild}>
          <BuilderForm
            values={values}
            handleChange={handleChange}
            handleClear={handleClear}
            handleSubmit={handleSubmitExpand}
            handleChipInput={handleChipInput}
          />
        </Collapse>
      </Card>
      { result.pending || result.complete ?
        <Card className={classNames(classes.search, classes.marginTop)} >
          <ListItem button onClick={() => setExpandResult(!expandResult)}>
            <ListItemIcon>
              {result.pending ? <CircularProgress variant="indeterminate" size={24} thickness={4}/> : <RestoreIcon /> }
            </ListItemIcon>
            <ListItemText inset primary='Builder Results' />
            {expandResult ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandResult}>
            <ResultsBox  results={result}/>
          </Collapse>
        </Card> : null
      }
    </>
  );
}

BuilderContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(BuilderContainer);
