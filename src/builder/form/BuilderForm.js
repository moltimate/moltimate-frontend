import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import RemoveIcon from '@material-ui/icons/Remove';

import ResidueInputs from './ResidueInputs';
import TestOptions from './TestOptions';
import ProteinOptions from './ProteinOptions';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

// TODO THESE ARE GLOBAL CAPS
const MAX_RESIDUE = 10;
const MIN_RESIDUE = 3;

function BuilderForm(props) {
  const { classes, values, handleChange } = props;
  const [ numberInputs, setNumberInputs ] = useState(3);

  function renderResidueInputs(num) {
    const inputs = [];

    num = num > MAX_RESIDUE ? MAX_RESIDUE : num;
    num = num < MIN_RESIDUE ? MIN_RESIDUE : num;

    for(let i=0; i < num ; i++ ){
      inputs.push(<ResidueInputs key={i} id={`${i}`} handleChange={handleChange} residues={values.activeSiteResidues[i] || []}/>)
    }
    return inputs;
  }

  return (
    <div className={classes.container}>
      <ProteinOptions handleChange={handleChange} values={values} />
      <Divider className={classes.padded}/>
      <FormLabel component='legend'>Active Sites</FormLabel>
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
        <TestOptions
          handleChange={handleChange}
          values={values}
        />
      </div>
      <div className={classes.floatButton}>
        <Button className={classes.cancelButton} onClick={(e) => handleChange(e, 5)}>Clear</Button>
        <Button className={classes.rounded} onClick={(e) => handleChange(e, 4)}>Run Test</Button>
      </div>
  </div>
  );
}

BuilderForm.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleClear: PropTypes.func,
  handleResidues: PropTypes.func,
  handleSubmit:PropTypes.func,
  handleChipInput:PropTypes.func,
};

export default withStyles(styles)(BuilderForm);
