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

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

function ProteinOptions(props) {
  const { classes, handleChange } = props
  const [value, setValue] = useState('standard');

  return (
    <FormControl component='fieldset' >
      <FormLabel component='legend'>Protein Details</FormLabel>
      <RadioGroup
        aria-label='Test Options'
        name='details'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <FormControlLabel value='standard' control={<Radio />} label='Standard' />
        <FormControlLabel value='custom' control={<Radio />} label='Custom' />
      </RadioGroup>
      {value === 'standard' ? <div className={classes.inline}>
        <TextField
          name='pdbid'
          className={classes.narrowInput}
          onChange={handleChange}
          label='ID'
        />
        <TextField
          name='ecClass'
          onChange={handleChange}
          className={classes.narrowInput}
          label='EC Class'
        />
      </div> : <></>}
      {value === 'custom' ? <UploadFile handleUpload={() => console.log("Input changed")} label='' buttonText='Custom Upload'/>: <></>}
    </FormControl>
  );
}

export default withStyles(styles)(ProteinOptions);
