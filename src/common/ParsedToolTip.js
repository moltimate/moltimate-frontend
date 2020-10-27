import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types';

import styles from './styles.js';

function ParsedToolTip(props) {
  const {classes, label, text} = props;
  const newLineText = text.split('\n').map((str,index) => <p key={index} className={classes.helpText}>{str}</p>)
  return (
    <>
    <Tooltip className={props.label ? classes.labelTooltip : classes.buttonTooltip}
      title={newLineText}>
      <InfoIcon/>
    </Tooltip>
    </>
  );
}

ParsedToolTip.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ParsedToolTip);
