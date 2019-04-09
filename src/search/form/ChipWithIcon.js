import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';
import DoneIcon from '@material-ui/icons/Done';

// TODO needing to press enter doesnt make sense
export default function ChipWithIcon(props) {
  return (
    <ChipInput
      id='pdbIds'
      defaultValue={[]}
      name={props.nameVal}
      fullWidth
      label='PDB Names'
      placeholder='Press enter to add'
      onChange={props.handleChipInput}
    />
  );
}

ChipWithIcon.propTypes = {
  handleChipInput: PropTypes.func,
  nameVal: PropTypes.string
};
