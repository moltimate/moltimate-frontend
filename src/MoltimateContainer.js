import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import QueryFormContainer from './search/form/QueryFormContainer';
import BuilderContainer from './builder/BuilderContainer';
import ResultsContainer from './search/results/ResultsContainer';
import SelectedResult from './search/results/SelectedResult';

import TopBar from './TopBar';
import ProteinContainer from './protein/ProteinContainer';

import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

// TODO: update this into config file
const queryURL = 'http://localhost:8080/align/activesite';

function useAsyncEndpoint(fn) {
  const [result, setResult] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [request, setRequest] = useState();

  useEffect(
    () => {
      if (!request) return;
      setResult({
        data: null,
        pending: true,
        error: false,
        complete: false
      });
      axios(request)
        .then(result =>
          setResult({
            data: result.data,
            pending: false,
            error: false,
            complete: true
          })
        )
        .catch(() =>
          setResult({
            data: null,
            pending: false,
            error: true,
            complete: true
          })
        );
    },
    [request]
  );

  return [result, (...args) => setRequest(fn(...args))];
}

function postBuilderEndpoint() {
  return useAsyncEndpoint(data => ({
    url: builderURL,
    method: "POST",
    data
  }));
}

function postQueryEndpoint() {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useAsyncEndpoint(data => ({
    url: queryURL,
    method: "POST",
    data
  }));
}

function MoltimateContainer(props) {
  const { classes } = props;
  const [isSelectedResult, setIsSelectedResult] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [pdbIds, setPdbIds] = useState([]);
  const [ecMask, setEcMask] = useState('');
  const [rmsd, setRMSD] = useState(true);
  const [files, setFiles] = useState([]);

  // POST request for query
  const [query, postQuery] = postQueryEndpoint();

  // Builds the query
  function createQuery() {
      console.log('calling create query')
      postQuery({
        pdbIds,
        ecMask,
        rmsd,
        files
      });
    }

    return (
      <>
        <TopBar />
        <div className={classes.controlPanel}>
          {isSelectedResult ? <SelectedResult /> : <></>}
          <QueryFormContainer />
          <BuilderContainer />
          <ResultsContainer />
        </div>
      </>
    );
}

MoltimateContainer.propTypes = {};

export default withStyles(styles)(MoltimateContainer);
