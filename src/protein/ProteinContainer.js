import React from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-util';

export default class ProteinContainer extends React.Component {

  componentDidUpdate(prevProps) {
    const {base, compare} = this.props;

    if (compare && prevProps.compare) {
      if (compare.motifPdbId !== prevProps.compare.motifPdbId || base !== prevProps.base) {
        init(base, compare);
      }
    }
  }

  render() {
    const key = `${this.props.base}${!!this.props.compare ? this.props.compare.motifPdbId : ''}`;
    return (
      <div key={key} id="viewport" style={{width: '100%', height: '90vh'}} />
    );
  }
}

ProteinContainer.propTypes = {
  base: PropTypes.string.isRequired,
  compare: PropTypes.object.isRequired,
};
