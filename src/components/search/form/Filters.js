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

class Filters extends React.Component {

  render() {
    return (
      <FormGroup>
        {filters.map((filter) =>
          <FormControlLabel
            key={filter.id}
            label={filter.label}
            control={
              <Checkbox
                checked={filter.value}
                id={filter.id}
                onChange={(e) => this.props.handleChange('filters', e)}
              />
            }
          />
        )}
      </FormGroup>
    );
  }
}

Filters.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Filters;
