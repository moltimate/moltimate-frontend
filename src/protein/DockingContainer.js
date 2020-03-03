import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadPDBQT } from './ngl-util';

export default function ProteinContainer(props) {
  const { file } = props;
  const key = `${file.name}`;

  useEffect(() => {
    loadPDBQT(file);
  });

  return (
    <div key={key} id="viewport" style={{width: '100%', height: '100vh'}} />
  );
}

ProteinContainer.propTypes = {
  file: PropTypes.instanceOf(File),
};