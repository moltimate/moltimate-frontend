import React from 'react';
import PropTypes from 'prop-types';

import MaskedInput from 'react-text-mask';

export default function ECMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
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
