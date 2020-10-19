import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ResultItem from './ResultItem';
import { Button, Grid } from '@material-ui/core';


export default function ResultsBox(props) {
  const { failedResult, successResult, handleSelectedResult, setEClass, temp, filterByType, defaultFilterType } = props;

  if( setEClass && temp && temp.length > 0 ) setEClass(temp[0].ecNumber, temp[0].pdbId, true);
  if(defaultFilterType && temp && temp.length > 0) {
    console.log("running with default filter type");
     temp[0].alignments.sort((a,b) => a[defaultFilterType] > b[defaultFilterType] ? 1 : -1 );
  };

  return (
    <div>
      {defaultFilterType && temp ?
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button id="ecFilter"  onClick={() => filterByType("ecNumber")}>EC Class</Button>
        <Button id="rmsdFilter" variant="contained" onClick={() => filterByType("rmsd")}>RMSD Value</Button>
      </div>
      : null
      }
      <List>
        {
          failedResult ?
            <ResultItem
              handleSelectedResult={handleSelectedResult}
              results={failedResult}
              isSuccess={0}
            /> : null
        }
        {
          successResult ?
            <ResultItem
              handleSelectedResult={handleSelectedResult}
              results={successResult}
              isSuccess={1}
            /> : null
        }
        {
          temp ?
            temp.map((m, k) => {
              return (
                <ResultItem
                  key={k}
                  parent={{pdbId: m.pdbId, ecNumber: m.ecNumber}}
                  handleSelectedResult={handleSelectedResult}
                  results={m.alignments}
                />
              )
            }) : null
        }
      </List>
    </div>
  );
}

ResultsBox.propTypes = {
  classes: PropTypes.object,
  handleSelectedResult: PropTypes.func,
  successResult: PropTypes.array,
  failedResult: PropTypes.array,
};

ResultsBox.defaultProps = {
  successResult: [],
};
