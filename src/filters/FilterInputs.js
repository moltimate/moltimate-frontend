import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
  const { handleChange, inputs } = props;

  return (
    <div className={classes.inline}>
      {inputs.map((input, k) => {
        return (
          <TextField
            key={k}
            name={input.name}
            label={input.label}
            onChange={(e) => handleChange(e)}
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
  handleChange: PropTypes.func
};
