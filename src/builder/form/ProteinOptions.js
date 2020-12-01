import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import styles from '../styles.js'
import UploadFile from  '../../search/form/UploadFile';
import ParsedToolTip from '../../common/ParsedToolTip';


function ProteinOptions(props) {
  const { handleChange, values, helpText, classes} = props;
  const [value, setValue] = useState('standard');

  return (
    <>
    <div className={classes.flexBox}>
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
      <ParsedToolTip tooltipClassName="makerRadioTooltip" text={helpText.motifStructure}/>
      </div>
      {value === 'standard' ?
        <div>
          <TextField
            name='pdbId'
            className={classes.narrowInput}
            onChange={e => handleChange(e, 0)}
            value={values.pdbId || ''}
            label='PDB Id'
          /><ParsedToolTip tooltipClassName="labelTooltip" text={helpText.pdbIdText}/>
          <TextField
            name='ecNumber'
            value={values.ecNumber || ''}
            onChange={e => handleChange(e, 0)}
            className={classes.narrowInput}
            label='EC Class'
          /><ParsedToolTip tooltipClassName="labelTooltip" text={helpText.ecClassText}/>
        </div> : <></>
      }
      {value === 'custom' ?
        <div className={classes.flexBox}>
        <UploadFile
          handleChange={handleChange}
          label=''
          inputName='customMotifStructure'
          buttonText='Custom Structure'
          files={values.customMotifStructure}
        />
        <ParsedToolTip tooltipClassName="buttonTooltip" text={helpText.customStructure}/>
        </div>: <></>}
    </>
  );
}

ProteinOptions.propTypes = {
  classes: PropTypes.object,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool
};

ProteinOptions.defaultProps = {
  open: false
};


export default withStyles(styles)(ProteinOptions);
