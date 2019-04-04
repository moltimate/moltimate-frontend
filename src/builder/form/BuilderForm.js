import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../util/request';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import UploadFile from  '../../search/form/UploadFile';
import Tooltip from '@material-ui/core/Tooltip';

import Mask from '../../search/form/Mask';
import ResidueInputs from './ResidueInputs';
import TestOptions from './TestOptions';
import ProteinOptions from './ProteinOptions';

import classNames from 'classnames';
import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

// TODO THESE ARE GLOBAL CAPS
const MAX_RESIDUE = 10;
const MIN_RESIDUE = 3;

function renderResidueInputs(num) {
  const { handleChange } = useForm();
  const inputs = [];

  num = num > MAX_RESIDUE ? MAX_RESIDUE : num;
  num = num < MIN_RESIDUE ? MIN_RESIDUE : num;

  for(let i=0; i < num ; i++ ){
    inputs.push(<ResidueInputs key={i} handleChange={handleChange}/>)
  }
  return inputs;
}

function BuilderForm(props) {
  const { classes } = props;
  const { values, handleChange, handleSubmit } = useForm();
  const [ numberInputs, setNumberInputs ] = useState(3);

  return (
    <div className={classes.container}>
      <ProteinOptions handleChange={handleChange}/>
      <Divider className={classes.padded}/>
      <FormLabel component="legend">Active Sites</FormLabel>
      <div>
        { renderResidueInputs(numberInputs) }
        <div className={classes.buttonContainer}>
          <Button onClick={() => setNumberInputs(numberInputs + 1)}>
            <AddIcon className={classes.grey}/>
          </Button>
          {numberInputs > 3 ?
            <Button onClick={() => setNumberInputs(numberInputs - 1)}>
              <RemoveIcon className={classes.grey}/>
            </Button>
             : null}
        </div>
      </div>
      <Divider className={classes.padded}/>
      <div>
        <TestOptions handleChange={handleChange}/>
      </div>
      <div className={classes.floatButton}>
        <Button className={classes.cancelButton}>Clear</Button>
        <Button className={classes.rounded} onClick={handleSubmit}>Run Test</Button>
      </div>
  </div>
  );
}

/* Test Options
Self
Homolog
Random test needs number of proteins to test against
List needs list of PDB ids to be tested against

Require EC#

*/

BuilderForm.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(BuilderForm);
