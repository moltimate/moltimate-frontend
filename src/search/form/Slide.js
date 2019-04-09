import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Slide(props) {
  return (
    <FormControlLabel
      control={
        <Switch
          id="options"
          checked={true}
          value="rmsd"
          color="primary"
          onChange={props.handleChange}
        />
      }
      label="RMSD"
    />
  )
}

Slide.propTypes = {
  handleChange: PropTypes.func
};
