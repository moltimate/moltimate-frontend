import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  inline: {
    display: 'inline',
  },
  narrowInput: {
    width: '100px',
    margin: '20px'
  }
});

export default function FilterInputs(props) {
  const classes = useStyles();
  const { handleFilters, inputs, filters } = props;

  return (
    <div className={classes.inline}>
      {inputs.map((input, k) => {
        return (
          <TextField
            key={k}
            name={input.name}
            label={input.label}
            value={filters ? filters[input.name] : ''}
            onChange={(e) => handleFilters(e)}
            className={classes.narrowInput}
          />
        )
      })}
    </div>
  );
}

FilterInputs.propTypes = {
  classes: PropTypes.object,
  inputs: PropTypes.array,
};
