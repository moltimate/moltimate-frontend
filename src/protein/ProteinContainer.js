import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-util';

export default function ProteinContainer(props) {
  const {activeSites, motifPdbId, compare} = props;
  const key = `${motifPdbId}${!!compare ? compare.queryPdbId : ''}`;

  useEffect(() => {
    init(motifPdbId, activeSites, compare);
  });

  return (
    <div key={key} id="viewport" style={{width: '100%', height: '100vh'}} />
  );
}

ProteinContainer.propTypes = {
  motifPdbId: PropTypes.string.isRequired,
  compare: PropTypes.object.isRequired,
  activeSites: PropTypes.array
};
