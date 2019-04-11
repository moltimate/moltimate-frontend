import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';

import ChipWithIcon from '../../search/form/ChipWithIcon';
import UploadFile from  '../../search/form/UploadFile';

function TestOptions(props) {
  const {classes, handleChange, values} = props;

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
        <FormControlLabel value='self' control={<Radio />} label='Self' />
        <FormControlLabel value='homolog' control={<Radio />} label='Homolog' />
        <FormControlLabel value='random' control={<Radio />} label='Random' />
        <FormControlLabel value='list' control={<Radio />} label='List'/>
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
      <UploadFile
        handleChange={handleChange}
        label='Custom Structures'
        inputName='customStructures'
        buttonText='Upload'
        files={values.customStructures}
      />
    </FormControl>
  );
}

// TODO test proptypes

export default TestOptions;
