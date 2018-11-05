import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Step3 extends React.Component {

  render() {
    return (
      <FormControlLabel
        control={
          <Switch
            id="rmsd"
            value="rmsd"
            color="primary"
            onChange={this.props.handleChange}
          />
        }
        label="RMSD"
      />
    );
  }
}

Step3.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Step3;
