import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-util';

export default function ProteinContainer(props) {
  const { parentId, childId, aligned, active, queryProteinMode, motifProteinMode } = props;
  const key = `${parentId} ${childId}`;//${new Date().getTime()}

  useEffect(() => {
    init(parentId, childId, aligned, active, queryProteinMode, motifProteinMode);
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
  displayMode1: PropTypes.string,
  displayMode2: PropTypes.string
};
