import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ResultItem from './ResultItem';
import { Button } from '@material-ui/core';


export default function ResultsBox(props) {
  const { failedResult, successResult, handleSelectedResult, setEClass, temp } = props;
    
  function handleSort(filterType, results) {
    //get button and change the type of button it is
    temp[0].alignments.sort((a,b) => a[filterType] > b[filterType] ? 1 : -1 );
    //force an update to the results box
  };

  if( setEClass && temp && temp.length > 0 ) setEClass(temp[0].ecNumber, temp[0].pdbId, true);
  return (
    <div>
      <div>
        <Button id="ecFilter" variant="contained" onClick={() => handleSort("ecNumber", temp.alignments)}>EC Class</Button>
        <Button id="rmsdFilter" onClick={() =>handleSort("rmsd", temp.alignments)}>RMSD Value</Button>
      </div>
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
