import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FailedResults from './FailedResults';
import PassedResults from './PassedResults';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import classNames from 'classnames';
import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

function ResultsBox(props) {
  const { classes, results } = props;
  const [value, setValue] = useState(0);

  return (
    <div className={classes.container}>
      <Tabs value={value} indicatorColor="primary" onChange={() => setValue(value === 1 ? 0 : 1)}>
        <Tab value={0} label="Passed" />
        <Tab value={1} label="Failed" />
      </Tabs>
      {value === 1 ?
        <FailedResults results={results.failedPdbIds} />: <PassedResults results={results.alignments}/>
      }
    </div>
  );
}

ResultsBox.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultsBox);
