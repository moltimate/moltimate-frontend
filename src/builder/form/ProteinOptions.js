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
    <>
      <FormControlLabel
        control={
          <Radio
            checked={value === 'standard'}
            onChange={(e) => setValue(e.target.name)}
            name='standard'
          />
        }
        label='Standard'
      />
      <FormControlLabel
        control={
          <Radio
            checked={value === 'custom'}
            onChange={(e) => setValue(e.target.name)}
            name='custom'
          />
        }
        label='Custom'
      />
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
    </>
  );
}

export default withStyles(styles)(ProteinOptions);
