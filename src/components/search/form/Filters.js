import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//TODO include value in this
const filters = [
  {
    label: 'P Set',
    id: 'pSet',
  },
  {
    label: 'A Set',
    id: 'aSet',
  },
  {
    label: 'Metal Amino',
    id: 'metalAmino',
  },
  {
    label: 'Metal Other',
    id: 'metalOther',
  }
];

function Filters(props) {
  return (
    <FormGroup>
      {filters.map((filter) =>
        <FormControlLabel
          key={filter.id}
          label={filter.label}
          control={
            <Checkbox
              checked={filter.value}
              id="filters"
              onChange={props.handleChange}
              value={filter.id}
            />
          }
        />
      )}
    </FormGroup>
  );
}

Filters.propTypes = {
  handleChange: PropTypes.func,
};

export default Filters;
