import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';

import ChipWithIcon from '../../search/form/ChipWithIcon';
import UploadFile from  '../../search/form/UploadFile';
import ParsedToolTip from '../../common/ParsedToolTip';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

function TestOptions(props) {
  const {classes, handleChange, values, helpText} = props;

// TODO change Radio button color
  return (
    <FormControl component='fieldset' >
      <FormLabel component='legend'>Test Options</FormLabel>
      <RadioGroup
        aria-label='Test Options'
        name='type'
        value={values.type ? values.type : 'self'}
        onChange={(e) => handleChange(e, 0)}
      >
        <FormControlLabel value='self' control={<Radio />} label={
          <div className={classes.flexBox}>
          <p>Self</p>
          <ParsedToolTip tooltipClassName="testRadioTooltip" text={helpText.selfTest}/>
          </div>}/>
        <FormControlLabel value='homolog' control={<Radio />} label={
            <div className={classes.flexBox}>
            <p>homolog</p>
            <ParsedToolTip tooltipClassName="testRadioTooltip" text={helpText.homologTest}/>
            </div>}/>
        <FormControlLabel value='random' control={<Radio />}  label={
            <div className={classes.flexBox}>
            <p>Random</p>
            <ParsedToolTip tooltipClassName="testRadioTooltip" text={helpText.randomTest}/>
            </div>}/>
        <FormControlLabel value='list' control={<Radio />}  label={
            <div className={classes.flexBox}>
            <p>List</p>
            <ParsedToolTip tooltipClassName="testRadioTooltip" text={helpText.listTest}/>
            </div>}/>
      </RadioGroup>
      {values.type === 'list' ?
        <ChipWithIcon
          value={values.testPdbIds}
          nameVal='testPdbIds'
          handleChange={handleChange}
        /> : null
      }
      {values.type === 'random' ?
        <TextField
          required
          type='number'
          name='randomCount'
          label='Amount'
          value={values.randomCount}
          onChange={(e) => handleChange(e, 0)}
        /> : null
      }
    </FormControl>
  );
}

// TODO test proptypes

export default withStyles(styles)(TestOptions);
