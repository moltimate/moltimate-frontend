import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';

export default function NameChips(props) {
  const { elements, inputName, handleDelete } = props;

  return (
    <>
      {elements.map((el, i) => {
        return (
          <Chip
            key={i}
            label={el.name}
            name={inputName}
            id={el.name}
            onDelete={() => handleDelete(el.name, 6, inputName)}
          />
        )
      })}
    </>
  );
}

NameChips.defaultProps = {
  elements: []
}

NameChips.propTypes = {
  elements: PropTypes.array,
  handleDelete: PropTypes.func
};
