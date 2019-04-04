import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';
import DoneIcon from '@material-ui/icons/Done';

export default function ChipWithIcon(props) {
  return (
    <ChipInput
      id='pdbIds'
      defaultValue={[]}
      fullWidth
      label='PDB Names'
      placeholder='Press enter to add'
      onChange={props.handleChange}
    />
  );
}

ChipWithIcon.propTypes = {
  handleChange: PropTypes.func
};
