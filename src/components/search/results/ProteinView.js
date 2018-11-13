import React from 'react';
import { init } from './ngl-temp-util';

class ProteinView extends React.Component {
  componentDidMount() {
    init();
  }
  render() {
    return (
      <div id="viewport" style={{width: '100%', height: '90vh'}} />
    );
  }
}

export default ProteinView;
