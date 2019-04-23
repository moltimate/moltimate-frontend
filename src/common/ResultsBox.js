import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import Filters from './filters/Filters';
import ListSubheader from '@material-ui/core/ListSubheader';

import ResultItem from './ResultItem';


export default function ResultsBox(props) {
  const { failedResult, successResult, handleSelectedResult, temp, filters, handleFilters } = props;

  return (
    <div>
      <Filters filters={filters} handleFilters={handleFilters}/>
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
                <>
                <ListSubheader component="div" style={{background: 'white'}}>
                  <div style={{
                    marginRight: '17px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <div>{m.pdbId}</div>
                    <div>{m.alignments.length} Results</div>
                  </div>

                </ListSubheader>
                <ResultItem
                  key={k}
                  parent={{pdbId: m.pdbId, ecNumber: m.ecNumber}}
                  handleSelectedResult={handleSelectedResult}
                  results={m.alignments}
                />
              </>
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
