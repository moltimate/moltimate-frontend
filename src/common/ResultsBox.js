import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ResultItem from './ResultItem';
import { Button } from '@material-ui/core';


export default function ResultsBox(props) {
  const { failedResult, successResult, handleSelectedResult, setEClass, temp } = props;
  const[filter, setFilterType] = useState("rmsd");
  const[searchResults, setSearchResults] = useState(temp);

  if( setEClass && temp && temp.length > 0 ) setEClass(temp[0].ecNumber, temp[0].pdbId, true);
  if(temp && temp.length > 0) {
    temp[0].alignments.sort((a,b) => a[filter] > b[filter] ? 1 :-1);
  } 

  return (
    <div>
      {searchResults ?
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button id="ecFilter"  variant={filter === "ecNumber" ? "contained" : null} onClick={() => setFilterType("ecNumber")}>EC Class</Button>
        <Button id="rmsdFilter" variant={filter === "rmsd" ? "contained" : null} onClick={() => setFilterType("rmsd")}>RMSD Value</Button>
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
