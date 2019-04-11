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
  const { classes, handleChange, id, residues } = props;

  return (
    <span>
      {labels.map((i, key) => {
        return (<TextField
          key={key}
          id={id}
          name={i.id}
          className={classes.narrowInput}
          onChange={(e) => handleChange(e, 2)}
          placeholder={i.label}
          value={residues[i.id] || ''}
        />)
      })}
    </span>

  );
}

ResidueInputs.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
  id: PropTypes.string
};

ResidueInputs.defaultProps = {
  residues: [
    {
      residueName: '',
      residueChainName: '',
      residueId: ''
    }
  ]
}

export default withStyles(styles)(ResidueInputs);
