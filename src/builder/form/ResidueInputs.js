import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

const labels = [
  {
    id: 'residueName',
    label: 'Residue',
  },
  {
    id: 'residueChainName',
    label: 'Chain',
  },
  {
    id: 'residueId',
    label: 'Id',
  }
]

function ResidueInputs(props) {
  const { classes, handleResidues, id } = props;

  return (
    <span>
      {labels.map((i, key) => {
        return (<TextField
          key={key}
          id={id}
          className={classes.narrowInput}
          onChange={handleResidues}
          placeholder={i.label}
        />)
      })}
    </span>

  );
}

ResidueInputs.propTypes = {
  classes: PropTypes.object,
  handleResidues: PropTypes.func,
  id: PropTypes.string
};

export default withStyles(styles)(ResidueInputs);
