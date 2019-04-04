import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import QueryFormContainer from './search/form/QueryFormContainer';
import BuilderContainer from './builder/BuilderContainer';
import ResultsContainer from './search/results/ResultsContainer';
import SelectedResult from './search/results/SelectedResult';

import TopBar from './TopBar';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

// TODO: update this into config file
const queryURL = 'http://localhost:8080/align/activesite';

function MoltimateContainer(props) {
  const { classes } = props;
  const [expanded, setExpanded] = useState(false);

    return (
      <>
        <TopBar />
        <div className={classes.controlPanel}>
          <QueryFormContainer />
          <BuilderContainer />
        </div>
      </>
    );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
