import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import classNames from 'classnames';
import styles from './styles.js';
import { withStyles } from '@material-ui/core/styles';

function MenuCard(props) {
  const { classes, expand, label, cardChild, childIcon, handleClick } = props;

  return (
    <Card className={classNames(classes.search, classes.marginTop)} >
      <ListItem button onClick={() => handleClick(!expand)}>
        <ListItemIcon>
          {childIcon}
        </ListItemIcon>
        <ListItemText inset primary={label} />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expand} className={classes.scrolling}>
        {cardChild}
      </Collapse>
    </Card>
  );
}

MenuCard.propTypes = {
  classes: PropTypes.object,
  handleClick: PropTypes.func
};

export default withStyles(styles)(MenuCard);
