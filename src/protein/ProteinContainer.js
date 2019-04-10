import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-util';

export default function ProteinContainer(props) {
  const { parentId, childId, aligned, active } = props;
  const key = `${parentId} ${childId}`;

  useEffect(() => {
    init(parentId, childId, aligned, active);
  });

  return (
    <div key={key} id="viewport" style={{width: '100%', height: '100vh'}} />
  );
}

ProteinContainer.propTypes = {
  parentId: PropTypes.string,
  childId: PropTypes.string,
  aligned: PropTypes.array,
  active: PropTypes.array,
};
