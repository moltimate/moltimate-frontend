import React from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-util';

export default class ProteinContainer extends React.Component {

  componentDidUpdate(prevProps) {
    const {activeSites, motifPdbId, compare} = this.props;

    if (compare && prevProps.compare) {
      if (compare.queryPdbId !== prevProps.compare.queryPdbId || motifPdbId !== prevProps.motifPdbId) {
        init(motifPdbId, activeSites, compare);
      }
    }

  }

  render() {
    const key = `${this.props.motifPdbId}${!!this.props.compare ? this.props.compare.queryPdbId : ''}`;
    return (
      <div key={key} id="viewport" style={{width: '100%', height: '100vh'}} />
    );
  }
}

ProteinContainer.propTypes = {
  motifPdbId: PropTypes.string.isRequired,
  compare: PropTypes.object.isRequired,
  activeSites: PropTypes.array
};
