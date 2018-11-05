import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

class Step1 extends React.Component {

  render() {
    return (
      <ChipInput
        id='pdbs'
        defaultValue={[]}
        fullWidth
        label='PDB Names'
        placeholder='Press enter to add'
        onChange={this.props.handleChange}
      />
    );
  }
}

Step1.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Step1;
