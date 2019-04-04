import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import styles from '../styles.js';
import { withStyles } from '@material-ui/core/styles';

const labels = [
  {
    id: 'residue',
    label: 'Residue',
  },
  {
    id: 'chain',
    label: 'Chain',
  },
  {
    id: 'id',
    label: 'Id',
  }
]

function ResidueInputs(props) {
  const { classes, handleChange } = props;

  return (
    <span>
      {labels.map((i, key) => {
        return (<TextField
          key={key}
          id={`${key} ${i.id}`}
          name='activeSiteResidues'
          className={classes.narrowInput}
          onChange={handleChange}
          placeholder={i.label}
        />)
      })}
    </span>

  );
}

ResidueInputs.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  values: PropTypes.array
};

export default withStyles(styles)(ResidueInputs);
