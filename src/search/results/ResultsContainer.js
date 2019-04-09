import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function ResultsContainer(props) {
  const { classes, handleChange, handleSubmit } = props;
  const [expand, setExpand] = useState(false);

  return (
    <Card className={classNames(classes.search, classes.marginTop)} >
      <ListItem button onClick={() => setExpand(!expand)}>
        <ListItemIcon>
          <RestoreIcon />
        </ListItemIcon>
        <ListItemText inset primary='Results' />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expand}>
        <p>Hello</p>
      </Collapse>
    </Card>
  );
}

ResultsContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultsContainer);
