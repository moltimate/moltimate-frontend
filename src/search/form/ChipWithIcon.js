import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import ChipInput from 'material-ui-chip-input';
import DoneIcon from '@material-ui/icons/Done';

// TODO needing to press enter doesnt make sense
export default function ChipWithIcon(props) {
  const { handleChange, nameVal, value } = props;
  return (
    <ChipInput
      id='pdbIds'
      name={nameVal}
      fullWidth
      label='PDB Ids'
      placeholder='Press enter to add'
      onChange={(e) => handleChange(e, 1, nameVal)}
    />
  );
}

ChipWithIcon.defaultProps = {
  value: []
}

ChipWithIcon.propTypes = {
  handleChange: PropTypes.func,
  nameVal: PropTypes.string,
  value: PropTypes.array
};
