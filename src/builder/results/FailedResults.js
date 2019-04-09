import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export default function FailedResults(props) {
  const { results } = props;

    return (
      <List>
        {results.map( r => <ListItemText primary={r} />)}
      </List>
    );
}

FailedResults.propTypes = {
  results: PropTypes.array,
};

FailedResults.defaultProps = {
  results: []
};
