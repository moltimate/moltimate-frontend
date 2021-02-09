import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import ResultItem from './ResultItem';


export default function ResultsBox(props) {
  const { failedResult, successResult, handleSelectedResult, setEClass, temp, basicWrapper } = props;
  if( setEClass && temp && temp.length > 0 ) setEClass(temp[0].ecNumber, temp[0].pdbId, true);
  return (
    <div>
      <List>
        {
          failedResult ?
            <ResultItem
              basicWrapper = {basicWrapper}
              handleSelectedResult={handleSelectedResult}
              results={failedResult}
              isSuccess={0}
            /> : null
        }
        {
          successResult ?
            <ResultItem
              basicWrapper = {basicWrapper}
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
                  basicWrapper = {basicWrapper}
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
