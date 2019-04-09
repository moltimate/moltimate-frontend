import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProteinView from './ProteinView';

import { withStyles } from '@material-ui/core/styles';
import styles from '../search/styles';

class ProteinContainer extends React.Component {

  render() {
    return (
      <div style={{marginLeft: '350px'}}>
        <ProteinView base={this.props.base} compare={this.props.compare} />
      </div>
    );
  }
}

ProteinContainer.propTypes = {
  base: PropTypes.string,
  compare: PropTypes.object
};

export default withStyles(styles)(ProteinContainer);
