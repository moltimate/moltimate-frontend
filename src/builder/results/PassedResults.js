import React, { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export default function PassedResults(props) {
  const { results } = props;

    return (
      <List>
        {Object.keys(results).map(r => <ListItemText primary={r} />)}
      </List>
    );
}

PassedResults.propTypes = {
  results: PropTypes.array,
};

PassedResults.defaultProps = {
  results: []
};
