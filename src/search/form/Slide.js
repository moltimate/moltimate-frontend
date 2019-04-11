import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Slide(props) {
  const { handleChange, value } = props;
  return (
    <FormControlLabel
      control={
        <Switch
          id="rmsd"
          name='rmsd'
          value={value}
          color="secondary"
          onChange={(e) => handleChange(e, 0)}
        />
      }
      label="RMSD"
    />
  )
}

Slide.defaultProps = {
  value: false
}

Slide.propTypes = {
  handleChange: PropTypes.func
};
