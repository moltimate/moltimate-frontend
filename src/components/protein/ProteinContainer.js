import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProteinView from './ProteinView';

import { withStyles } from '@material-ui/core/styles';
import styles from '../search/styles';

class ProteinContainer extends React.Component {

  handleResultClick = (event, motif, base) => {
    this.setState({
      base: base,
      compare: motif,
    });
  }

  handleClick = (event, motif, base) => {
    this.setState({
      selected: motif.motifPdbId,
      result: base,
    });
    // this.props.handleResultClick(event, motif, base);
  };

  render() {
    return (
      <div>
        <ProteinView base='8gch' compare='1rtf' />
        This is the protein
      </div>
    );
  }
}

ProteinContainer.propTypes = {
  results: PropTypes.object.results
};

const mapToProps = state => {
  return {
    results: state.search.results
  };
};

const withState = connect(mapToProps)(ProteinContainer);

export default withStyles(styles, { withTheme: true })(withState);
