import React from 'react';
import PropTypes from 'prop-types';
import { init } from './ngl-temp-util';

class ProteinView extends React.Component {

  componentDidUpdate(prevProps) {
    const {base, compare} = this.props;
    if (compare && prevProps.compare && compare.motifPdbId !== prevProps.compare.motifPdbId) {
      console.log(compare.motifPdbId);

      init(base, compare);
    }
  }
  render() {
    return (
      <div id="viewport" style={{width: '100%', height: '90vh'}} />
    );
  }
}

ProteinView.propTypes = {
  base: PropTypes.string.isRequired,
  compare: PropTypes.object.isRequired,
};

export default ProteinView;
