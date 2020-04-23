import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadDocked } from './ngl-util';

export default function DockingProteinContainer(props) {
  const { file, ligand_model, active_sites, proteinMode, activeSitesMode, ligandMode } = props;
  const key = `${file.name}`;

  useEffect(() => {
    loadDocked(file, ligand_model, active_sites, proteinMode, activeSitesMode, ligandMode);
  });

  return (
    <div key={key} id="viewport" style={{width: '100%', height: '100vh'}} />
  );
}

DockingProteinContainer.propTypes = {
  file: PropTypes.instanceOf(File),
  ligand_model: PropTypes.number,
  active_sites: PropTypes.array
};