import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import UploadFile from  '../../search/form/UploadFile';
import ChipWithIcon from '../../search/form/ChipWithIcon';

function TestOptions(props) {
  const {classes, handleChange, handleChipInput, type} = props;

// TODO change Radio button color
  return (
    <FormControl component='fieldset' >
      <FormLabel component='legend'>Test Options</FormLabel>
      <RadioGroup
        aria-label='Test Options'
        name='type'
        value={type}
        onChange={handleChange}
      >
        <FormControlLabel value='self' control={<Radio />} label='Self' />
        <FormControlLabel value='homolog' control={<Radio />} label='Homolog' />
        <FormControlLabel value='random' control={<Radio />} label='Random' />
        <FormControlLabel value='list' control={<Radio />} label='List'/>
      </RadioGroup>
      {type === 'list' ? <ChipWithIcon nameVal='testPdbIds' handleChipInput={handleChipInput}/> : null}
      {type === 'random' ? <TextField required type='number' name='randomCount' label='Amount' onChange={handleChange}/> : null}
      <UploadFile handleUpload={() => console.log("Input changed")} label='Custom Structures' buttonText='Upload'/>
    </FormControl>
  );
}

export default TestOptions;
