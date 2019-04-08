import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import UploadFile from  '../../search/form/UploadFile';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

function ProteinOptions(props) {
  const { classes, handleChange, values } = props;
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
          name='pdbId'
          className={classes.narrowInput}
          onChange={e => handleChange(e, 0)}
          value={values.pdbId || ''}
          label='PDB Id'
        />
        <TextField
          name='ecNumber'
          value={values.ecNumber || ''}
          onChange={e => handleChange(e, 0)}
          className={classes.narrowInput}
          label='EC Class'
        />
      </div> : <></>}
      {value === 'custom' ? <UploadFile handleUpload={(e) => handleChange(e, 3)} label='' buttonText='Custom Structure'/>: <></>}
    </>
  );
}

// TODO proptype checking
export default withStyles(styles)(ProteinOptions);
