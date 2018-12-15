import React from 'react';
import PropTypes from 'prop-types';
import { init, exampleInit } from './ngl-util';

class ProteinView extends React.Component {
  componentDidMount() {
    this.props.isExample ? exampleInit() : init();
  }
  
  render() {
    return (
      <div id="viewport" style={{width: '100%', height: '100vh'}} />
    );
  }
}

ProteinView.propTypes = {
  isExample: PropTypes.bool.isRequired,
};



export default ProteinView;
