import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import BuildIcon from '@material-ui/icons/Build';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import BuilderForm from './form/BuilderForm';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';


function BuilderContainer(props) {
  const { classes } = props;
  const [expand, setExpand] = useState(false);

  return (
    <Card className={classNames(classes.search, classes.marginTop)} >
      <ListItem button onClick={() => setExpand(!expand)}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText inset primary='Maker' />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expand}>
        <BuilderForm  />
      </Collapse>
    </Card>
  );
}

BuilderContainer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(BuilderContainer);
