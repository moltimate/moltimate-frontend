import React from 'react';
import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Slider(props) {
  return (
    <FormControlLabel
      control={
        <Switch
          id={this.props.label.toLowerCase()}
          value={this.props.label.toLowerCase()}
          color="primary"
          onChange={this.props.handleChange}
        />
      }
      label={this.props.label}
    />
  );
}

Slider.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Slider;
