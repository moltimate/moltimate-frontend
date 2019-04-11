import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import UploadFile from  '../../search/form/UploadFile';

const useStyles = makeStyles({
  narrowInput: {
    width: '75px',
    margin: '10px'
  },
});

export default function ProteinOptions(props) {
  const classes = useStyles();
  const { handleChange, values } = props;
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
      {value === 'standard' ?
        <div>
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
        </div> : <></>
      }
      {value === 'custom' ?
        <UploadFile
          handleChange={handleChange}
          label=''
          inputName='customMotifStructure'
          buttonText='Custom Structure'
          files={values.customMotifStructure}
        />: <></>}
    </>
  );
}

ProteinOptions.propTypes = {
  classes: PropTypes.object,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool,
};

ProteinOptions.defaultProps = {
  open: false
};
