import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ResultItem from './ResultItem';
import Filters from '../../filters/Filters';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';

import classNames from 'classnames';
import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

function ResultsBox(props) {
  const { classes, results, handleSelectedResult } = props;
  const [value, setValue] = useState(0);

  return (
    <div className={classes.container}>
      <Filters />
      <List>
        <ResultItem handleSelectedResult={handleSelectedResult} results={results.alignments} isSuccess={true}/>
        <ResultItem handleSelectedResult={handleSelectedResult} results={results.failedAlignments}/>
      </List>
    </div>
  );
}

ResultsBox.propTypes = {
  classes: PropTypes.object,
  handleSelectedResult: PropTypes.func
};

ResultsBox.defaultProps = {
  results: {}
}

export default withStyles(styles)(ResultsBox);
