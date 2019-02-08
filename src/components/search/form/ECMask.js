import React from 'react';
import PropTypes from 'prop-types';

import MaskedInput from 'react-text-mask';

function ECMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, '.', /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      guide={false}
    />
  );
}

ECMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default ECMask;
